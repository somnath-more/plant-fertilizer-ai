import { useState } from "react";
import { Alert, MenuItem, TextField } from "@mui/material";
import { CheckCircle, Shield, ShoppingCart } from "lucide-react";
import { Button } from "../components/atoms/Button";
import { CartItem } from "../components/molecules/CardItem";
import { useCartStore } from "../store/useCartStore";
import { sizes } from "../theme/themeStyles";
import { useUserStore } from "../store/useUserStore";

const CartPage = () => {
  const cart = useCartStore((state) => state.cart);
  const onRemove = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const submitOrder = useCartStore((state) => state.placeOrder);
  const placingOrder = useCartStore((state) => state.placingOrder);
  const orderError = useCartStore((state) => state.orderError);
  const user = useUserStore((state) => state.user);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH_ON_DELIVERY");
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const handleUpdateQuantity = (item, quantityChange) => {
    if (quantityChange > 0) {
      addToCart(item);
    } else if (item.quantity <= 1) {
      onRemove(item.id);
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    setCheckoutMessage("");
    let storedUser = user;
    if (!storedUser) {
      try {
        storedUser = JSON.parse(localStorage.getItem("user") || "null");
      } catch {
        storedUser = null;
      }
    }
    if (!storedUser?.userId) {
      setCheckoutMessage("Please sign in before placing your order.");
      return;
    }
    if (!shippingAddress.trim()) {
      setCheckoutMessage("Please enter a shipping address.");
      return;
    }

    const response = await submitOrder({
      userId: storedUser.userId,
      shippingAddress,
      billingAddress: shippingAddress,
      paymentMethod,
    });
    if (response.status) {
      setCheckoutMessage(`Order ${response.data.orderNumber} placed successfully.`);
    } else {
      setCheckoutMessage(response.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-gray-900 mb-12 font-poppins">
          Shopping Cart
        </h2>

        {(checkoutMessage || orderError) && (
          <Alert className="mb-6" severity={cart.length === 0 ? "success" : "error"}>
            {checkoutMessage || orderError}
          </Alert>
        )}

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

                  <TextField
                    label="Shipping address"
                    value={shippingAddress}
                    onChange={(event) => setShippingAddress(event.target.value)}
                    multiline
                    minRows={2}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Payment method"
                    value={paymentMethod}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                    select
                    fullWidth
                  >
                    <MenuItem value="CASH_ON_DELIVERY">Cash on delivery</MenuItem>
                    <MenuItem value="ONLINE">Online payment</MenuItem>
                  </TextField>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={placingOrder}
                  size="small"
                  variant="contained"
                  className={`${sizes.md} w-full mt-4 gap-1 flex items-center justify-center font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 font-poppins border-r-4`}
                >
                  <CheckCircle size={20} />
                  {placingOrder ? "Placing Order..." : "Place Order"}
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
