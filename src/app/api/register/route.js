import { NextResponse } from "next/server";
import connectDB from "@/app/lib/connect";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password, gender } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Korisnik već postoji" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      gender,
      role: "user", // dodeljujemo rolu "user"
    });

    return NextResponse.json({ message: "Korisnik uspešno registrovan", user: newUser }, { status: 201 });

  } catch (error) {
    console.error("Greška:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
