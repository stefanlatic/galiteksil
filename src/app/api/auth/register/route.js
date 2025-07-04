import { connectDB } from "@/app/utils/mongodb";
import User from "@/app/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password, gender } = await req.json();

    // Provera da li postoji već korisnik sa tim email-om
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "Korisnik već postoji" }, { status: 400 });
    }

    // Hashovanje lozinke
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kreiranje korisnika
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      gender,
    });

    return Response.json({ message: "Korisnik uspešno registrovan", user: newUser }, { status: 201 });

  } catch (error) {
    console.error("Greška:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
