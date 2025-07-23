import jwt from "jsonwebtoken";
import User from "@/app/models/User";
import { connectDB } from "@/app/lib/connect";

export const verifyAdmin = async (req) => {
  await connectDB();

  const token = req.cookies.token;
  if (!token) throw new Error("Niste ulogovani");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user || !user.isAdmin) {
    throw new Error("Niste autorizovani kao admin");
  }

  return user; 
};
