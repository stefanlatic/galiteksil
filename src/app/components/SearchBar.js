"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";


export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ categories: [], products: [] });
  const wrapperRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length > 1) {
        fetch(`/api/search?q=${encodeURIComponent(query)}`)
          .then(res => res.json())
          .then(data => setResults(data))
          .catch(() => setResults({ categories: [], products: [] }));
      } else {
        setResults({ categories: [], products: [] });
      }
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
  function handleClickOutside(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setResults({ categories: [], products: [] }); // zatvori dropdown
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto">
      <input
        type="text"
        className="border rounded-md px-6 py-2 text-[18px] focus:outline-none w-[400px] focus:ring-2 focus:ring-yellow-500"
        placeholder="Претражите производе или категорије..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {(results.categories.length > 0 || results.products.length > 0) && (
        <div className="absolute z-10 w-full bg-white shadow mt-2 rounded p-2 max-h-96 overflow-y-auto">
          {results.categories.length > 0 && (
            <>
              <h4 className="text-xs font-bold text-gray-500 mb-1">Категорије</h4>
              {results.categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/kategorije/${cat.slug}`}
                  className="block px-2 py-1 hover:bg-gray-100 rounded"
                  onClick={() => setResults({ categories: [], products: [] })}
                >
                  {cat.name}
                </Link>

              ))}
              <hr className="my-2" />
            </>
          )}

          {results.products.length > 0 && (
            <>
              <h4 className="text-xs font-bold text-gray-500 mb-1">Производи</h4>
              {results.products.map((p) => (
                <Link href={`/proizvod/${p.slug}`} className="block px-2 py-2 hover:bg-gray-100 rounded" 
                onClick={() => setResults({ categories: [], products: [] })}>
                  <div className="flex justify-between">
                    <div className="pr-2">
                      <p className="font-semibold">{p.title}</p>
                      <p className="text-xs text-gray-600">{p.description}</p>
                    </div>
                    <p className="font-bold whitespace-nowrap">{p.price} дин.</p>
                  </div>
                </Link>
              ))}
            </>
          )}

          {results.categories.length === 0 && results.products.length === 0 && (
            <p className="text-sm text-gray-600">Нема резултата.</p>
          )}
        </div>
      )}
    </div>
  );
}
