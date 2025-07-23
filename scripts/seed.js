import mongoose from "mongoose";
import dotenv from "dotenv";
import products from "../src/app/data/products.js";
import Product from "../src/app/models/Product.js";

dotenv.config({ path: ".env.local" });

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Povezano sa bazom");

    await Product.deleteMany(); // Očisti kolekciju (opcionalno)
    await Product.insertMany(products);
    console.log("✅ Proizvodi ubačeni u bazu!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Greška pri punjenju baze:", error);
    process.exit(1);
  }
}

seed();
