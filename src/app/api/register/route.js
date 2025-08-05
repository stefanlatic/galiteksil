import { NextResponse } from "next/server";
import connectDB from "@/app/lib/connect";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    const { firstName, lastName, email, password, gender } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Korisnik već postoji" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      role: "user",
    });

    // ✅ Ovde pravimo token
    const token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      process.env.JWT_SECRET || "tajna_lozinka",
      { expiresIn: "7d" }
    );

    // ✅ Ovde postavljamo cookie
    const response = NextResponse.json(
      { message: "Korisnik uspešno registrovan", user: newUser },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dana
    });

    return response;

  } catch (error) {
    console.error("Greška:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
