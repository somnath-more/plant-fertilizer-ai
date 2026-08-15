import { useCallback, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetails from "../components/organisms/ProductDetails";
import CustomLoader from "../components/atoms/CustomLoader";
import useFetch from "../hooks/useFetch";
import { getProductById } from "../services/api/productService";
import { useCartStore } from "../store/useCartStore";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const fetchProduct = useCallback(() => getProductById(productId), [productId]);
  const { data: product, loading, error, refetch } = useFetch(fetchProduct, [fetchProduct]);

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <button type="button" onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 font-semibold text-green-700 hover:text-green-900">
          <ArrowLeft size={19} /> Back to products
        </button>

        {loading && <div className="py-24"><CustomLoader color="success" /></div>}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-white p-10 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">Product unavailable</h1>
            <p className="mt-2 text-gray-600">{error.message}</p>
            <button type="button" onClick={refetch} className="mt-5 font-semibold text-green-700 hover:underline">Try again</button>
          </div>
        )}

        {!loading && product && (
          <ProductDetails
            product={product}
            isWishlisted={isWishlisted}
            onToggleWishlist={() => setIsWishlisted((current) => !current)}
            onAddToCart={() => addToCart(product)}
            onBuyNow={handleBuyNow}
          />
        )}
      </div>
    </main>
  );
};

export default ProductDetailsPage;
