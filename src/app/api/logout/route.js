import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Odjavljen" });
  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // odmah ističe
  });
  return response;
}
