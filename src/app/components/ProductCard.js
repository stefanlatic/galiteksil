import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
     <Link href={`/product/${product._id}`} className="block">
      <div className="border rounded-lg p-4 hover:shadow-lg transition">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="object-cover w-full h-64 rounded"
        />
      <h3 className="mt-2 font-semibold">{product.title}</h3>
      <p className="font-bold">{product.price} дин.</p>
      {product.discount > 0 && (
        <p className="text-red-600 text-sm">Попуст: {product.discount}%</p>
      )}
      <p className="text-gray-700">{product.description}</p>
    </div>
    </Link>
  );
};

export default ProductCard;
