import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import MojNalogClient from "./MojNalogClient";

const JWT_SECRET = process.env.JWT_SECRET || "tajna_lozinka";

export default async function MojNalog() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    return <MojNalogClient user={user} />;
  } catch (err) {
    redirect("/login");
  }
}
