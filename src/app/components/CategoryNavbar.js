"use client";

import categories from "@/app/data/categories";
import Link from "next/link";

export default function CategoryNavbar() {
  return (
     <nav className="flex justify-between py-4 px-5 gap-4 overflow-x-auto bg-white shadow-md">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/kategorije/${cat.slug}`}
          className="text-sm hover:underline"
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  );
}
