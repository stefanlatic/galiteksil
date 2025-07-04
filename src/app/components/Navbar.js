"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiUser } from "react-icons/fi"; // 👤 ikonica korisnika
import { HiMagnifyingGlass } from "react-icons/hi2";

import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const [query, setQuery] = useState("");
    const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query)}`);
    }
  };

  const navItems = [
    { label: "Продавнице ГАЛИ у Србији", href: "/shop", className: "w-[60px]" },
    { label: "Контакт", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-white shadow-xl sticky px-4  z-50">
     <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
  {/* Logo */}
  <Link href="/">
    <Image
      src="/gali__logo.png"
      alt="Gali logo"
      width={120}
      height={60}
      priority
    />
  </Link>

  {/* Search */}
  <form onSubmit={handleSearch} className="relative mt-[12px] ml-4">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Претражи..."
      className="border rounded-3xl px-6 py-2 text-[18px] focus:outline-none w-[400px] focus:ring-2 focus:ring-yellow-500"
    />
    <button
      type="submit"
      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 px-3 cursor-pointer"
    >
     <HiMagnifyingGlass size={24} />
    </button>
  </form>

  {/* Nav Links + User Icon */}
  <div className="flex items-center space-x-[40px]">
    <ul className="flex gap-6">
      {navItems
        .filter((item) => item.label !== "Login")
        .map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "text-yellow-500"
                  : "text-gray-700 hover:text-yellow-500"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
    </ul>

    {/* Profile icon */}
    <Link href="/login" className="text-gray-700 hover:text-yellow-500">
      <FiUser size={24} />
    </Link>
  </div>
</div>

    </nav>
  );
}
