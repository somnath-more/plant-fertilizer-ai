import { Heart, Leaf, Package, ShieldCheck, ShoppingCart, Star } from "lucide-react";
import { Button } from "../../atoms/Button";
import { Badge } from "../../atoms/Badge";
import { baseStyles, sizes, variants } from "../../../theme/themeStyles";

const DetailItem = ({ label, value }) => {
  if (value === null || value === undefined || value === "") return null;

  return (
    <div className="rounded-xl border border-green-100 bg-green-50/60 p-4">
      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className="mt-1 font-semibold text-gray-900">{value}</dd>
    </div>
  );
};

const ProductDetails = ({ product, isWishlisted, onToggleWishlist, onBuyNow, onAddToCart }) => {
  const inStock = product.stock > 0;

  return (
    <article className="grid overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl lg:grid-cols-2">
      <div className="relative min-h-80 bg-gradient-to-br from-green-50 to-emerald-100 lg:min-h-full">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="h-full min-h-80 w-full object-cover" />
        ) : (
          <div className="flex h-full min-h-80 items-center justify-center">
            <Package size={96} className="text-green-500" aria-hidden="true" />
          </div>
        )}
        <button
          type="button"
          onClick={onToggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
          className="absolute right-5 top-5 rounded-full bg-white p-3 text-red-500 shadow-lg transition hover:scale-105"
        >
          <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-7 md:p-10">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Badge variant={inStock ? "success" : "danger"}>{inStock ? "In Stock" : "Out of Stock"}</Badge>
          {product.organic && (
            <span className="flex items-center gap-1 text-sm font-semibold text-green-700"><Leaf size={16} /> Organic</span>
          )}
          <span className="text-sm text-gray-500">Product ID: {product.id}</span>
        </div>

        <h1 className="font-poppins text-3xl font-bold text-gray-900 md:text-4xl">{product.name}</h1>
        <p className="mt-5 font-inter leading-7 text-gray-600">{product.description}</p>

        <div className="mt-6 flex items-end gap-3">
          <span className="font-poppins text-4xl font-bold text-green-600">₹{product.price}</span>
          {product.rating > 0 && (
            <span className="mb-1 flex items-center gap-1 text-sm font-semibold text-amber-600">
              <Star size={17} fill="currentColor" /> {product.rating} ({product.reviewCount || 0} reviews)
            </span>
          )}
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-3">
          <DetailItem label="Category" value={product.category} />
          <DetailItem label="Weight" value={product.weight} />
          <DetailItem label="NPK ratio" value={product.npkRatio} />
          <DetailItem label="Available stock" value={`${product.stock || 0} units`} />
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={onBuyNow}
            disabled={!inStock}
            variant="contained"
            className={`${baseStyles} ${variants.primary} ${sizes.md} flex-1`}
            startIcon={<ShoppingCart size={18} />}
          >
            Buy now
          </Button>
          <Button onClick={onAddToCart} disabled={!inStock} variant="outlined" className="flex-1 border-green-600 text-green-700">
            Add to cart
          </Button>
        </div>

        <p className="mt-5 flex items-center gap-2 text-sm text-gray-500"><ShieldCheck size={17} className="text-green-600" /> Secure purchase and quality assured</p>
      </div>
    </article>
  );
};

export default ProductDetails;
