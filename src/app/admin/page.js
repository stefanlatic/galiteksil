
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/lib/auth";

export default function AdminPage() {
  const user = getCurrentUser();

  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <p>Ovde ide forma za dodavanje proizvoda...</p>
    </div>
  );
}
