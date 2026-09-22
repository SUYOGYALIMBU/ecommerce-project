import { useEffect, useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Lock,
} from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCount } from "../redux/features/cartSlice";
import CartSkeleton from "../skeletons/CartSkeleton";

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=200&h=200&fit=crop";

const FREE_SHIPPING_THRESHOLD = 50000;

type CartRow = {
  id: number;
  productId: number;
  name: string;
  price: number;
  qty: number;
  stock: number;
  img: string;
  sellerId: number;
  sellerName: string;
  shippingCharge: number;
};

type DeliveryForm = {
  phone: string;
  address: string;
  secondaryAddress: string;
  paymentMode: string;
};

export default function CartPage() {
  const [items, setItems] = useState<CartRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState<DeliveryForm>({
    phone: "",
    address: "",
    secondaryAddress: "",
    paymentMode: "",
  });

  // =========================
  // FETCH CART
  // =========================

  const fetchCarts = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:4000/api/carts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("My cart:", res.data);

      const mapped: CartRow[] = res.data.data.map(
        (cartItem: any) => ({
          id: cartItem.id,
          productId: cartItem.productId,
          name: cartItem.product.title,
          price: Number(cartItem.product.price),
          qty: cartItem.quantity,
          stock: cartItem.product.stock,
          img:
            cartItem.product.images?.[0]?.path ||
            PLACEHOLDER_IMG,
          sellerId: cartItem.product.userId,
          sellerName: "Furnew Seller",
          shippingCharge: 0,
        }),
      );

      setItems(mapped);
      dispatch(setCount(mapped.length));
    } catch (err: any) {
      console.error("Failed to load cart:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.msg ||
          err.message ||
          "Failed to load your cart",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  // =========================
  // UPDATE QUANTITY
  // =========================

  const updateQty = async (
    productId: number,
    id: number,
    quantity: number,
  ) => {
    const item = items.find((it) => it.id === id);

    if (!item) return;

    const newQuantity = Math.min(
      item.stock,
      Math.max(1, quantity),
    );

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:4000/api/carts/${id}`,
        {
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setItems((prev) =>
        prev.map((it) =>
          it.id === id
            ? {
                ...it,
                qty: newQuantity,
              }
            : it,
        ),
      );
    } catch (err) {
      console.error("Failed to update cart:", err);
    }
  };

  // =========================
  // REMOVE ITEM
  // =========================

  const removeItem = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:4000/api/carts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setItems((prev) => {
        const updated = prev.filter(
          (it) => it.id !== id,
        );

        dispatch(setCount(updated.length));

        return updated;
      });
    } catch (err: any) {
      console.error("Failed to remove item:", err);

      alert(
        err.response?.data?.msg ||
          err.response?.data?.message ||
          "Failed to remove item.",
      );
    }
  };

  // =========================
  // CLEAR CART
  // =========================

  const clearCart = async () => {
    if (items.length === 0) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        "http://localhost:4000/api/carts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setItems([]);
      dispatch(setCount(0));
    } catch (err: any) {
      console.error("Failed to clear cart:", err);

      alert(
        err.response?.data?.msg ||
          err.response?.data?.message ||
          "Failed to clear cart.",
      );
    }
  };

  // =========================
  // PRICE CALCULATIONS
  // =========================

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  const distinctSellers: {
    sellerId: number;
    shippingCharge: number;
  }[] = [];

  items.forEach((item) => {
    const exists = distinctSellers.find(
      (seller) =>
        seller.sellerId === item.sellerId,
    );

    if (!exists) {
      distinctSellers.push({
        sellerId: item.sellerId,
        shippingCharge: item.shippingCharge,
      });
    }
  });

  let shipping = 0;

  distinctSellers.forEach((seller) => {
    shipping += seller.shippingCharge;
  });

  const total = subtotal + shipping;

  const amountToFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal,
  );

  const shippingProgress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
  );

  // =========================
  // PLACE ORDER
  // =========================

  const placeOrder = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (items.length === 0) {
      return;
    }

    if (!formData.paymentMode) {
      alert("Please select a payment method.");
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:4000/api/orders",
        {
          phone: formData.phone,
          paymentMode: formData.paymentMode,
          address: formData.address,
          secondaryAddress:
            formData.secondaryAddress || "",

          products: items.map((item) => ({
            productId: item.productId,
            quantity: item.qty,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Order response:", res.data);

      // =========================
      // COD SUCCESS
      // =========================

      if (formData.paymentMode === "cod") {
        alert("Order placed successfully!");

        await clearCart();

        setFormData({
          phone: "",
          address: "",
          secondaryAddress: "",
          paymentMode: "",
        });

        return;
      }

      // =========================
      // ESEWA
      // =========================

      if (
        formData.paymentMode === "esewa" &&
        res.data?.esewaPayload
      ) {
        console.log(
          "eSewa payload:",
          res.data.esewaPayload,
        );

        const payload = res.data.esewaPayload;

        const form = document.createElement("form");

        form.method = "POST";

        form.action =
          "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

        Object.keys(payload).forEach((key) => {
          const input =
            document.createElement("input");

          input.type = "hidden";
          input.name = key;
          input.value = String(payload[key]);

          form.appendChild(input);
        });

        document.body.appendChild(form);

        form.submit();

        return;
      }

      alert("Order placed successfully!");

      await clearCart();
    } catch (err: any) {
      console.error("Order error:", err);

      alert(
        err.response?.data?.error ||
          err.response?.data?.msg ||
          err.response?.data?.message ||
          err.message ||
          "Failed to place order.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-primary-dark/10 bg-white px-4 py-3 text-[14.5px] text-primary-dark outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20";

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return <CartSkeleton />;
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-red-50 text-red-500">
          <ShoppingBag size={22} />
        </div>

        <p className="font-josefin text-[16px] font-semibold text-primary-dark">
          Could not load your cart
        </p>

        <p className="max-w-xs text-[13.5px] text-gray-500">
          {error}
        </p>

        <button
          onClick={fetchCarts}
          className="mt-2 h-10 rounded-xl bg-primary px-5 text-[13.5px] font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Try again
        </button>
      </div>
    );
  }

  // =========================
  // MAIN UI
  // =========================

  return (
    <section className="bg-dark-white pb-16">
      <div className="container">

        {/* Cart Header */}

        <div className="-mt-6 rounded-2xl border border-primary-dark/10 bg-white p-6 sm:p-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <ShoppingBag size={22} />
              </span>

              <div>

                <h1 className="font-josefin text-[24px] font-bold text-primary-dark sm:text-[28px]">
                  Shopping Cart
                </h1>

                <p className="mt-0.5 text-[13.5px] text-gray-500">
                  {items.length === 0
                    ? "Your cart is empty"
                    : `${items.length} item${
                        items.length === 1
                          ? ""
                          : "s"
                      } ready for checkout`}
                </p>

              </div>
            </div>

            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="inline-flex h-10 items-center gap-2 self-start rounded-xl border border-primary-dark/15 bg-white px-4 text-[13px] font-medium text-primary-dark transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 sm:self-auto"
              >
                <Trash2 size={14} />
                Clear cart
              </button>
            )}

          </div>
        </div>

        {/* Empty Cart */}

        {items.length === 0 ? (

          <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-primary-dark/15 bg-white px-6 py-24 text-center">

            <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
              <ShoppingBag size={26} />
            </div>

            <p className="font-josefin text-[18px] font-semibold text-primary-dark">
              Your cart is empty
            </p>

            <p className="max-w-sm text-[13.5px] text-gray-500">
              Browse our collection and add pieces you love.
              Your cart will appear here.
            </p>

            <Link
              to="/products"
              className="mt-2 inline-flex h-11 items-center rounded-xl bg-primary px-6 py-3 text-[14px] font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
            >
              Browse products
            </Link>

          </div>

        ) : (

          /* Cart Content */

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">

            {/* Cart Items */}

            <div className="space-y-4">

              {items.map((item) => (

                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-primary-dark/10 bg-white p-4 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:gap-5 sm:p-5"
                >

                  {/* Product Image */}

                  <Link
                    to={`/products/${item.productId}`}
                    className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-dark-white sm:h-28 sm:w-28"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  {/* Product Info */}

                  <div className="min-w-0 flex-1">

                    <Link
                      to={`/products/${item.productId}`}
                    >
                      <h3 className="line-clamp-2 font-josefin text-[15px] font-semibold leading-snug text-primary-dark transition-colors hover:text-primary">
                        {item.name}
                      </h3>
                    </Link>

                    <p className="mt-1 text-[12.5px] text-gray-400">
                      Sold by{" "}
                      <span className="font-medium text-primary-dark">
                        {item.sellerName}
                      </span>
                    </p>

                    <p className="mt-1.5 text-[14px] font-semibold text-primary">
                      Rs.{" "}
                      {item.price.toLocaleString(
                        "en-IN",
                      )}
                    </p>

                    {item.stock < 5 &&
                      item.stock > 0 && (
                        <p className="mt-1 text-[12px] font-medium text-amber-600">
                          Only {item.stock} left in stock
                        </p>
                      )}

                  </div>

                  {/* Quantity + Price */}

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">

                    {/* Quantity */}

                    <div className="flex items-center rounded-lg border border-primary-dark/10 bg-white">

                      <button
                        onClick={() =>
                          updateQty(
                            item.productId,
                            item.id,
                            item.qty - 1,
                          )
                        }
                        disabled={item.qty <= 1}
                        className="grid h-9 w-9 place-items-center text-primary-dark transition-colors hover:text-primary disabled:opacity-30"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="w-8 text-center text-[14px] font-semibold text-primary-dark">
                        {item.qty}
                      </span>

                      <button
                        onClick={() =>
                          updateQty(
                            item.productId,
                            item.id,
                            item.qty + 1,
                          )
                        }
                        disabled={
                          item.qty >= item.stock
                        }
                        className="grid h-9 w-9 place-items-center text-primary-dark transition-colors hover:text-primary disabled:opacity-30"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>

                    </div>

                    {/* Item Total */}

                    <div className="text-right">

                      <p className="text-[15px] font-bold text-primary-dark">
                        Rs.{" "}
                        {(
                          item.price * item.qty
                        ).toLocaleString("en-IN")}
                      </p>

                      <button
                        onClick={() =>
                          removeItem(item.id)
                        }
                        className="mt-1 inline-flex items-center gap-1 text-[12px] text-gray-400 transition-colors hover:text-red-500"
                      >
                        <Trash2 size={12} />
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* Right Side */}

            <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">

              {/* Shipping Progress */}

              <div className="rounded-2xl border border-primary-dark/10 bg-white p-5">

                <div className="flex items-center gap-2 text-[13px] text-primary-dark">

                  <Truck
                    size={15}
                    className="text-primary"
                  />

                  {amountToFreeShipping > 0 ? (
                    <span>
                      Add{" "}
                      <span className="font-semibold text-primary">
                        Rs.{" "}
                        {amountToFreeShipping.toLocaleString(
                          "en-IN",
                        )}
                      </span>{" "}
                      more for free shipping
                    </span>
                  ) : (
                    <span className="font-semibold text-secondary">
                      You've unlocked free shipping!
                    </span>
                  )}

                </div>

                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-dark-white">

                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{
                      width: `${shippingProgress}%`,
                    }}
                  />

                </div>

              </div>

              {/* Order Summary */}

              <div className="rounded-2xl border border-primary-dark/10 bg-white p-5">

                <h2 className="font-josefin text-[16px] font-bold text-primary-dark">
                  Order Summary
                </h2>

                <dl className="mt-4 space-y-3 text-[14px]">

                  <div className="flex justify-between">
                    <dt className="text-gray-500">
                      Subtotal
                    </dt>

                    <dd className="font-medium text-primary-dark">
                      Rs.{" "}
                      {subtotal.toLocaleString(
                        "en-IN",
                      )}
                    </dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="text-gray-500">
                      Shipping
                    </dt>

                    <dd className="font-medium text-primary-dark">
                      Rs.{" "}
                      {shipping.toLocaleString(
                        "en-IN",
                      )}
                    </dd>
                  </div>

                  <div className="h-px bg-primary-dark/10" />

                  <div className="flex justify-between text-[15.5px]">

                    <dt className="font-bold text-primary-dark">
                      Total
                    </dt>

                    <dd className="font-bold text-primary">
                      Rs.{" "}
                      {total.toLocaleString(
                        "en-IN",
                      )}
                    </dd>

                  </div>

                </dl>

                <p className="mt-4 flex items-center gap-2 text-[12px] text-gray-500">
                  <ShieldCheck
                    size={13}
                    className="text-secondary"
                  />
                  Secure checkout · 7-day returns
                </p>

              </div>

              {/* Delivery Form */}

              <form
                onSubmit={placeOrder}
                className="rounded-2xl border border-primary-dark/10 bg-white p-5"
              >

                <h2 className="font-josefin text-[16px] font-bold text-primary-dark">
                  Delivery Details
                </h2>

                <div className="mt-4 space-y-3">

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className={inputClass}
                    required
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Delivery address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: e.target.value,
                      })
                    }
                    className={inputClass}
                    required
                  />

                  <input
                    type="text"
                    name="secondaryAddress"
                    placeholder="Secondary address (optional)"
                    value={formData.secondaryAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        secondaryAddress: e.target.value,
                      })
                    }
                    className={inputClass}
                  />

                </div>

                {/* Payment */}

                <div className="mt-5">

                  <p className="mb-2.5 text-[12.5px] font-semibold uppercase tracking-wide text-primary-dark">
                    Payment method
                  </p>

                  <div className="grid grid-cols-2 gap-2">

                    {/* COD */}

                    <label
                      className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-[13.5px] font-medium transition-colors ${
                        formData.paymentMode ===
                        "cod"
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-primary-dark/10 bg-white text-primary-dark hover:border-primary/40"
                      }`}
                    >

                      <input
                        type="radio"
                        name="paymentMode"
                        value="cod"
                        checked={
                          formData.paymentMode ===
                          "cod"
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentMode:
                              e.target.value,
                          })
                        }
                        className="sr-only"
                      />

                      Cash on delivery

                    </label>

                    {/* eSewa */}

                    <label
                      className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-[13.5px] font-medium transition-colors ${
                        formData.paymentMode ===
                        "esewa"
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-primary-dark/10 bg-white text-primary-dark hover:border-primary/40"
                      }`}
                    >

                      <input
                        type="radio"
                        name="paymentMode"
                        value="esewa"
                        checked={
                          formData.paymentMode ===
                          "esewa"
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentMode:
                              e.target.value,
                          })
                        }
                        className="sr-only"
                      />

                      eSewa

                    </label>

                  </div>

                </div>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={
                    submitting ||
                    items.length === 0 ||
                    !formData.paymentMode ||
                    !formData.phone ||
                    !formData.address
                  }
                  className={`mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[14.5px] font-semibold text-white transition-all duration-200 ${
                    submitting ||
                    items.length === 0 ||
                    !formData.paymentMode ||
                    !formData.phone ||
                    !formData.address
                      ? "cursor-not-allowed bg-primary/40"
                      : "cursor-pointer bg-primary shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
                  }`}
                >

                  {submitting ? (
                    "Placing order..."
                  ) : (
                    <>
                      <Lock size={14} />
                      {formData.paymentMode ===
                      "esewa"
                        ? "Continue to eSewa"
                        : "Place order"}
                    </>
                  )}

                </button>

                <p className="mt-3 text-center text-[11.5px] text-gray-400">
                  By placing your order you agree to our
                  terms of service.
                </p>

              </form>

            </div>

          </div>
        )}
      </div>
    </section>
  );
}