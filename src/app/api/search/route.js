// src/app/api/search/route.js
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/connect";
import Product from "@/app/models/Product";
import categories from "@/app/data/categories";
import { toCyrillic } from "@/app/utils/transliterate";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  const query = q.trim().toLowerCase();
  const queryCyr = toCyrillic(query);

  await connectDB();

  // Pretraga proizvoda u bazi (po naslovu i opisu, ćirilica)
  const productRegex = new RegExp(queryCyr, "i");
  const matchedProducts = await Product.find({
    $or: [
      { title: { $regex: productRegex } },
      { description: { $regex: productRegex } },
    ],
  }).lean();

  // Pretraga lokalnih kategorija (možeš ih izvući i iz baze ako želiš kasnije)
  const matchedCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(queryCyr)
  );

  return NextResponse.json({
    categories: matchedCategories,
    products: matchedProducts,
  });
}
