import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "tajna_lozinka";

export async function POST(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Недостаје токен" }, { status: 401 });

    const user = jwt.verify(token, JWT_SECRET);
    const body = await req.json();

    const savedAddress = {
      street: body.street,
      city: body.city,
      postalCode: body.postalCode,
    };

    return NextResponse.json(savedAddress);
  } catch (err) {
    return NextResponse.json({ message: "Грешка при додавању адресе" }, { status: 500 });
  }
}
