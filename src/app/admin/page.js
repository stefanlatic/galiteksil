import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return <p>Pristup zabranjen</p>;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return <p>Niste administrator</p>;
    }

    // Ako je sve ok, prikaži admin panel:
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <p>Ovde ide forma za dodavanje proizvoda...</p>
      </div>
    );
  } catch (error) {
    return <p>Neispravan token</p>;
  }
}
