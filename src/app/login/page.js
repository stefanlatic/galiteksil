"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/moj-nalog");
    } else {
      setError(data.error || "Грешка при пријављивању");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Пријавите се</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Имејл адреса"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-yellow-500"
          required
        />

        <input
          type="password"
          placeholder="Лозинка"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-yellow-500"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
        >
          Пријави се
        </button>
      </form>

      <div className="text-center mt-4">
        <p>
          Немате налог?{" "}
          <Link href="/register" className="text-yellow-600 underline">
            Креирајте га сада!
          </Link>
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <button className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-md bg-white hover:bg-gray-50 transition">
          <FaGoogle className="text-red-500 mr-3" />
          <span className="text-sm font-medium text-gray-700">
            Пријавите се путем Google-а
          </span>
        </button>

        <button className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-md bg-white hover:bg-gray-50 transition">
          <FaFacebookF className="text-blue-600 mr-3" />
          <span className="text-sm font-medium text-gray-700">
            Пријавите се путем Facebook-а
          </span>
        </button>
      </div>
    </div>
  );
}
