import { CheckCircle, Search, Shield, ShoppingCart } from "lucide-react";
import { Button } from "../components/atoms/Button";
import { CartItem } from "../components/molecules/CardItem";
import { useCartStore } from "../store/useCartStore";
import { baseStyles, sizes, variants } from "../theme/themeStyles";
import { fontFamily } from "../theme/customStyles";

const CartPage = ({ onCheckout }) => {
  const cart = useCartStore((state) => state.cart);
  //  onRemove
  const onRemove = useCartStore((state) => state.removeFromCart);
  const onUpdateQuantity = useCartStore((state) => state.updateQuantity);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.clearCart);
  console.log("cart", cart);
  const handleUpdateQuantity = (item, quantityChange) => {
    if (quantityChange > 0) {
      addToCart(item);
    } else {
      removeFromCart(item.id);
    }
  };
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-gray-900 mb-12 font-poppins">
          Shopping Cart
        </h2>

        {cart.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-lg">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={64} className="text-gray-400" />
            </div>
            <p className="text-2xl text-gray-600 font-inter mb-6">
              Your cart is empty
            </p>
            {/* <Button variant="primary" size="lg">
              <Search size={20} />
               Start Shopping
            </Button> */}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">
                  Cart Items ({cart.length})
                </h3>
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-inter">Subtotal</span>
                    <span className="text-gray-900 font-semibold font-poppins">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-inter">Shipping</span>
                    <span className="text-gray-900 font-semibold font-poppins">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3">
                      <p className="text-xs text-green-700 font-inter">
                        Add ₹{(500 - subtotal).toFixed(2)} more for FREE
                        shipping! 🎉
                      </p>
                    </div>
                  )}

                  <div className="border-t-2 border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900 font-poppins">
                        Total
                      </span>
                      <span className="text-3xl font-bold text-green-600 font-poppins">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={onCheckout}
                  size="small"
                  variant="contained"
                  className={`${sizes.md} w-full mt-4 gap-1 flex items-center justify-center font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 font-poppins border-r-4`}
                >
                  <CheckCircle size={20} />
                  Proceed to Checkout
                </Button>

                <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-inter">
                  <Shield size={16} />
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartPage;
