import mongoose from "mongoose";
import Product from "@/app/models/Product";
import connectDB from "./connect";

export async function getProductById(id) {
  try {
    await connectDB();
    const product = await Product.findById(id).lean();
    return JSON.parse(JSON.stringify(product));
  } catch (err) {
    console.error("Greška kod dobavljanja proizvoda:", err);
    return null;
  }
}
export async function getProductsByCategory(category) {
  await connectDB();
  return await Product.find({ category }).lean();
}

export async function getProductBySlug(slug) {
  await connectDB();
  const product = await Product.findOne({ slug }).lean();
  return JSON.parse(JSON.stringify(product));
}
