import ProductDetail from "@/app/components/ProductDetail";
import { getProductBySlug } from "@/app/lib/data";

export default async function ProductPage({ params }) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) return <div>Производ није пронађен.</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <ProductDetail product={product} />
    </div>
  );
}
