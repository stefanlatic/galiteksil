import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL slike
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    sizes: {
      type: [String], // Primer: ["S", "M", "L"]
      default: [],
    },
    colors: {
      type: [String], // Primer: ["crna", "bela"]
      default: [],
    },
    discount: {
        type: Number, // Procenat, npr. 10 za 10%
        default: 0,
    },
  },
  { timestamps: true } // Dodaje createdAt i updatedAt automatski
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
