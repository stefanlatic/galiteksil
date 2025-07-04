import { NextResponse } from "next/server";
import { verifyAdmin } from "@/middleware/auth";
import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/models/Order";

export async function GET(req) {
  try {
    await connectDB();
    await verifyAdmin(req); // Osiguraj da je admin

    const orders = await Order.find().populate("user").sort({ createdAt: -1 });

    return NextResponse.json({ success: true, orders });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 401 });
  }
}
