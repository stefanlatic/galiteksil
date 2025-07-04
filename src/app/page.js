import ProductCard from "@/app/components/ProductCard";
import products from "@/app/data/products";

export default function HomePage() {
  return (
    <>
     <main className="p-6">
      <h2 className="text-2xl font-bold mb-4">Издвојени производи</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
    </>
  );
}
