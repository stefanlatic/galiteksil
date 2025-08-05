"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "male",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setSuccess("");
    } else {
      setSuccess("Успешна регистрација!");
      setError("");
      router.push("/moj-nalog");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-bold text-center mb-6">Креирај налог</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            name="firstName"
            type="text"
            placeholder="Име"
            value={formData.firstName}
            onChange={handleChange}
            className="w-1/2 border px-4 py-2 rounded"
            required
          />
          <input
            name="lastName"
            type="text"
            placeholder="Презиме"
            value={formData.lastName}
            onChange={handleChange}
            className="w-1/2 border px-4 py-2 rounded"
            required
          />
        </div>
        <input
          name="email"
          type="email"
          placeholder="Емаил"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Лозинка"
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
          <option value="male">Мушко</option>
          <option value="female">Женско</option>
        </select>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Региструј се
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Већ имате налог?{" "}
        <span
          className="text-yellow-600 hover:underline cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Пријавите се
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button className="flex items-center justify-center gap-3 border py-2 rounded hover:bg-gray-50 transition">
          <FcGoogle size={22} />
          <span className="text-sm">Пријавите се преко Google-а</span>
        </button>
        <button className="flex items-center justify-center gap-3 border py-2 rounded hover:bg-gray-50 transition">
          <FaFacebookF size={20} color="#1877F2" />
          <span className="text-sm">Пријавите се преко Facebook-а</span>
        </button>
      </div>
    </div>
  );
}
