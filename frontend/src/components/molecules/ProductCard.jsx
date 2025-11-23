import {
  Camera,
  ShoppingCart,
  MessageSquare,
  User,
  LogIn,
  LogOut,
  Package,
  BookOpen,
  Search,
  Upload,
  Send,
  Plus,
  Minus,
  X,
  ChevronRight,
  Leaf,
  Sparkles,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Award,
  Shield,
  Zap,
} from "lucide-react";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";
import { fontFamily } from "../../theme/customStyles";
import { baseStyles, sizes, variants } from "../../theme/themeStyles";

export const ProductCard = ({ product, onAddToCart }) => (
  <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2">
    <div className="relative h-52 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 group-hover:scale-110 transition-transform duration-700"></div>
      {/* <Package size={72} className="text-green-500 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />*/}
      {/* <Camera size={72} className="text-green-500 relative z-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500" /> product.image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover"
      />
      {product.stock > 0 && product.stock < 10 && (
        <div className="absolute top-4 right-4">
          <Badge variant="warning">Only {product.stock} left</Badge>
        </div>
      )}
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-poppins font-bold text-xl text-gray-900 group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>
        <Badge variant={product.stock > 0 ? "success" : "danger"}>
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>
      <p className="text-gray-600 text-sm mb-4 font-inter leading-relaxed line-clamp-2">
        {product.description}
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <span className="text-3xl font-bold text-green-600 font-poppins">
            ₹{product.price}
          </span>
          <span className="text-gray-500 text-sm ml-2 line-through">
            ₹{Math.round(product.price * 1.2)}
          </span>
        </div>
        <Button
          onClick={() => onAddToCart(product)}
          variant="contained"
          style={{ fontFamily: fontFamily.poppins }}
          className={`${baseStyles} ${variants.primary} ${sizes.md} mt-4`}
          size="small"
          disabled={product.stock === 0}
        >
          <Plus size={16} />
          Add
        </Button>
      </div>
    </div>
  </div>
);
