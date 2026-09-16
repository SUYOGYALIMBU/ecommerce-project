import { useEffect, useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCount } from "../redux/features/cartSlice";
import CartSkeleton from "../skeletons/CartSkeleton";

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=200&h=200&fit=crop";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    secondaryAddress: "",
    paymentMode: "",
  });

  const fetchCarts = () => {
    axios
      .get("https://ecom-zb9o.vercel.app/api/carts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const mapped = res.data.data.map((cartItem) => ({
          id: cartItem.id, // cart row id, used for update/remove
          productId: cartItem.productId,
          name: cartItem.product.title,
          price: parseFloat(cartItem.product.price),
          qty: cartItem.quantity,
          stock: cartItem.product.stock,
          img: cartItem.product.images?.[0] || PLACEHOLDER_IMG,
          sellerId: cartItem.product.user.id,
          sellerName: cartItem.product.user.firstName,
          shippingCharge: parseFloat(
            cartItem.product.user.shipping_charge || 0,
          ),
        }));
        console.log("length cartt: ", res.data.data);
        const cartLength = res.data.data.length;
        dispatch(setCount(cartLength));
        setItems(mapped);
        // console.log("item length: ",items.length)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const updateQty = (productId: number, id: number, quantity: number) => {
    console.log({ quantity });
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? { ...it, qty: Math.min(it.stock, Math.max(1, quantity)) }
          : it,
      ),
    );

    axios
      .post(
        `https://ecom-zb9o.vercel.app/api/carts`,
        {
          productId,
          quantity: quantity,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      )
      .then((res) => {
        // fetchCarts()
      });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    // TODO: persist to backend, e.g.
    // axios.delete(`https://ecom-zb9o.vercel.app/api/carts/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  // Shipping: one flat charge per distinct seller in the cart

  // const shipping = Array.from(
  //   new Map(items.map((it) => [it.sellerName, it.shippingCharge])).values(),
  // ).reduce((sum, charge) => sum + charge, 0);

  let distinctSellers = [
    // {sellerId:1,shippingCarge:100},
    // {sellerId:2,shippingCarge:50}
  ];

  items.forEach((el) => {
    let exists = distinctSellers.find((seller) => {
      return seller.sellerId == el.sellerId;
    });
    if (!exists) {
      distinctSellers.push({
        sellerId: el.sellerId,
        shippingCharge: el.shippingCharge,
      });
    }
  });

  console.log({ distinctSellers });

  let shipping = 0;
  distinctSellers.forEach((el) => {
    shipping += el.shippingCharge;
  });

  const total = subtotal + shipping;

  const placeOrder = (e) => {
    e.preventDefault();
    setSubmitting(true);
    axios
      .post(
        "https://ecom-zb9o.vercel.app/api/orders",
        {
          phone: formData.phone,
          paymentMode: formData.paymentMode,
          address: formData.address,
          secondaryAddress: formData.secondaryAddress || "",
          // products: [
          //   {
          //     productId: 1,
          //     quantity: 1,
          //   },
          // ],
          products: items.map((el) => {
            return {
              productId: el.productId,
              quantity: el.qty,
            };
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((res) => {
        // axios.post(
        //   "https://dev.khalti.com/api/v2/epayment/initiate/",
        //   {
        //     return_url: "http://example.com/",
        //     website_url: "https://example.com/",
        //     amount: "1000",
        //     purchase_order_id: "Order01",
        //     purchase_order_name: "test",
        //     customer_info: {
        //       name: "Ram Bahadur",
        //       email: "test@khalti.com",
        //       phone: "9800000001",
        //     },
        //   },
        //   {
        //     headers: {
        //       Authorization: "key a2d75bcf2a724cf6868a143deb6b8c2c",
        //       "Content-Type": "application/json",
        //     },
        //   },
        // );
        // similar to eswa: create form and append fiels for khalit

        // return;

        setSubmitting(true);
        const esewaData = res.data.data.esewa;
        const esewaForm = document.createElement("form");
        esewaForm.setAttribute(
          "action",
          "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
        );
        esewaForm.setAttribute("method", "POST");

        Object.entries(esewaData).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.setAttribute("type", "hidden");
          input.setAttribute("name", key);
          input.setAttribute("value", value as string);
          esewaForm.appendChild(input);
        });

        document.body.appendChild(esewaForm);
        esewaForm.submit();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {});
  };

  if (loading) {
    return <CartSkeleton />;
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load cart: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        {/* Product table */}
        <div>
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] pb-4 text-lg font-bold text-blue-900">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span className="text-right">Total</span>
          </div>

          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center py-5"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white hover:bg-gray-700"
                      aria-label={`Remove ${item.name}`}
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-400">
                      Sold by: {item.sellerName}
                    </p>
                  </div>
                </div>

                <span className="font-semibold text-blue-900">
                  ${item.price.toFixed(2)}
                </span>

                <div className="flex w-fit items-center gap-3 rounded bg-gray-100 px-3 py-1.5 text-gray-400">
                  <button
                    onClick={() =>
                      updateQty(item.productId, item.id, item.qty - 1)
                    }
                    className="hover:text-gray-700"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-4 text-center text-gray-700">
                    {item.qty}
                  </span>
                  <button
                    onClick={() =>
                      updateQty(item.productId, item.id, item.qty + 1)
                    }
                    className="hover:text-gray-700 disabled:opacity-30"
                    aria-label="Increase quantity"
                    disabled={item.qty >= item.stock}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <span className="text-right font-semibold text-blue-900">
                  £{(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}

            {items.length === 0 && (
              <p className="py-10 text-center text-gray-400">
                Your cart is empty.
              </p>
            )}
          </div>

          <div className="mt-6 flex justify-between">
            <button className="rounded bg-pink-500 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-pink-600">
              Update Cart
            </button>
            <button
              onClick={clearCart}
              className="rounded bg-pink-500 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-pink-600"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div>
            <h2 className="mb-4 text-center text-lg font-bold text-blue-900 lg:text-left">
              Cart Totals
            </h2>
            <div className="space-y-4 rounded-lg bg-indigo-50 p-6">
              <div className="flex justify-between font-semibold text-blue-900">
                <span>Subtotals:</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-indigo-100 pt-4 font-semibold text-blue-900">
                <span>shipping charge:</span>
                <span>£{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-indigo-100 pt-4 font-semibold text-blue-900">
                <span>Totals:</span>
                <span>£{total.toFixed(2)}</span>
              </div>
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                Shipping & taxes calculated at checkout
              </p>
              {/* <button className="w-full rounded bg-green-500 py-3 font-semibold text-white transition-colors hover:bg-green-600">
                Proceed To Checkout
              </button> */}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-center text-lg font-bold text-blue-900 lg:text-left">
              Delivery Details
            </h2>
            <form
              onSubmit={placeOrder}
              className="space-y-5 rounded-lg bg-indigo-50 p-6"
            >
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full border-b border-gray-300 bg-transparent pb-2 text-gray-700 placeholder-gray-400 focus:border-blue-900 focus:outline-none"
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full border-b border-gray-300 bg-transparent pb-2 text-gray-700 placeholder-gray-400 focus:border-blue-900 focus:outline-none"
              />

              <input
                type="text"
                name="secondaryAddress"
                placeholder="Secondary Address (optional)"
                value={formData.secondaryAddress}
                onChange={(e) =>
                  setFormData({ ...formData, secondaryAddress: e.target.value })
                }
                className="w-full border-b border-gray-300 bg-transparent pb-2 text-gray-700 placeholder-gray-400 focus:border-blue-900 focus:outline-none"
              />

              <div className="space-y-2">
                <p className="text-sm font-semibold text-blue-900">
                  Payment Mode
                </p>
                <div className="flex gap-6">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="cash"
                      checked={formData.paymentMode === "cash"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paymentMode: e.target.value,
                        })
                      }
                      className="accent-pink-500"
                    />
                    <span className="text-gray-700">Cash</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="esewa"
                      checked={formData.paymentMode === "esewa"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paymentMode: e.target.value,
                        })
                      }
                      className="accent-pink-500"
                    />
                    <span className="text-gray-700">eSewa</span>
                  </label>
                </div>
              </div>

              <button
                className={`rounded ${submitting ? "disabled" : ""} bg-pink-500 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-pink-600`}
              >
                {submitting ? "Placing Order" : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
