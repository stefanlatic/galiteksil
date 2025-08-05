import Navbar from "./Navbar";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "tajna_lozinka";
export const dynamic = "force-dynamic";

export default async function NavbarServerWrapper() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let userRole = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      userRole = decoded.role;
    } catch (err) {
      console.error("Neispravan token:", err);
    }
  }

  return <Navbar userRole={userRole} />;
}
