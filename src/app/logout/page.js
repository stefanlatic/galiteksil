"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await fetch("/api/logout", {
        method: "POST",
      });
      router.push("/moj-nalog"); // preusmeri na stranicu za login
    };

    logout();
  }, [router]);

  return (
    <div className="text-center mt-10 text-lg">
      Одјављујемо вас...
    </div>
  );
}
