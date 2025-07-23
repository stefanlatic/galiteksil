"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiUser } from "react-icons/fi"; 
import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";

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
    <nav className="w-full bg-white shadow-md sticky px-4  z-50">
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
 
    <SearchBar />
   
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
