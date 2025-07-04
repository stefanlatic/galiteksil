"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Neuspešna prijava");
        setLoading(false);
        return;
      }

      // Ako je uspešno - preusmeravanje
      router.push("/");
    } catch (err) {
      setError("Greška na serveru");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-xl bg-white">
      <h1 className="text-2xl font-bold mb-4">Prijavi se</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Lozinka"
          value={data.password}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded"
        >
          {loading ? "Učitavanje..." : "Prijavi se"}
        </button>
      </form>
    </div>
  );
}
