
import Product from "@/models/Product";
import connectDB from "./connect"; // napravi ovo ako već nisi

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
