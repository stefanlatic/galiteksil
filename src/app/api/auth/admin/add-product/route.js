import { NextResponse } from "next/server";
import { verifyAdmin } from "@/middleware/auth";
import Product from "@/app/models/Product";
import { connectDB } from "@/app/lib/connect";

export async function POST(req) {
  try {
    await connectDB();
    await verifyAdmin(req); // proveravamo admin pristup

    const data = await req.json();

    const newProduct = new Product(data);
    await newProduct.save();

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 401 });
  }
}
