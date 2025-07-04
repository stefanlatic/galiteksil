"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "male",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setSuccess("");
    } else {
      setSuccess("Registracija uspešna!");
      setError("");
      router.push("/login"); 
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Registracija</h2>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Ime i prezime"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Lozinka"
          value={formData.password}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="male">Muško</option>
          <option value="female">Žensko</option>
        </select>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Registruj se
        </button>
      </form>
    </div>
  );
}
