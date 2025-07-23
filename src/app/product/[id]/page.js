import ProductDetail from "@/app/components/ProductDetail";
import { getProductById } from "@/app/lib/data";

export default async function ProductPage({ params }) {
  const { id } = params;  

  const product = await getProductById(id);

  if (!product) return <div>Производ није пронађен.</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <ProductDetail product={product} />
    </div>
  );
}
