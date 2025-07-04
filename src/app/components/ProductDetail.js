
export default function ProductDetail({ product }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-full max-w-md mb-4" />
      <p className="text-lg">{product.description}</p>
      <p className="text-xl font-semibold mt-4">{product.price} дин.</p>
    </div>
  );
}
 