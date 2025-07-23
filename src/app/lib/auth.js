
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // { id, email, role, name }
  } catch (err) {
    return null;
  }
}
