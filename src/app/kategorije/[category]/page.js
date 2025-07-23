import { getProductsByCategory } from "@/app/lib/data";
import  categories  from "@/app/data/categories";
import ProductCard from "@/app/components/ProductCard"; 

export default async function CategoryPage({ params }) {
  const { category } = params;

 const categoryObj = categories.find((cat) => cat.slug === category);
  if (!categoryObj) return <div>Категорија није пронађена.</div>;

  const products = await getProductsByCategory(categoryObj.name);

  return (
     <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{categoryObj.name}</h1>

      {products.length === 0 ? (
        <p>Нема производа у овој категорији.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
