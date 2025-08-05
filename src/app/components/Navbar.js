"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiUser } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";

export default function Navbar({ userRole }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query)}`);
    }
  };

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/;";
    router.push("/login");
    router.refresh();
  };

  const navItems = [
    { label: "Продавнице ГАЛИ у Србији", href: "/shop", className: "w-[60px]" },
    { label: "Контакт", href: "/contact" },
  ];

  const iconColorClass =
    userRole === "admin"
      ? "text-red-500"
      : userRole === "user"
      ? "text-yellow-500"
      : "text-gray-700";

  return (
    <nav className="w-full bg-white shadow-md sticky px-4 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <Image src="/gali__logo.png" alt="Gali logo" width={120} height={60} priority />
        </Link>

        <SearchBar />

        <div className="flex items-center space-x-[40px]">
          <ul className="flex gap-6">
            {navItems.map((item) => (
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

          <Link href="/moj-nalog" className={`${iconColorClass} relative group`}>
            <FiUser size={24} className="hover:opacity-80" />
            {userRole && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                {userRole === "admin" ? "Добродошли, Админ" : "Добродошли"}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
}
