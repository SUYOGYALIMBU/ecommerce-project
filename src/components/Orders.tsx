import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ChevronDown, Package, MapPin, Phone, CreditCard } from "lucide-react";
import BreadCrumb from "./BreadCrumb";
import OrdersSkeleton from "../skeletons/OrdersSkeleton";

const statusStyles: Record<string, string> = {
  pending: "bg-primary/10 text-primary border-primary/20",
  processing: "bg-amber-50 text-amber-700 border-amber-200",
  shipped: "bg-blue-50 text-blue-700 border-blue-200",
  delivered: "bg-secondary/10 text-secondary border-secondary/20",
  cancelled: "bg-red-50 text-red-600 border-red-200",
};

const paymentStyles: Record<string, string> = {
  paid: "bg-secondary/10 text-secondary border-secondary/20",
  unpaid: "bg-red-50 text-red-600 border-red-200",
};

const statusBar: Record<string, string> = {
  pending: "bg-primary",
  processing: "bg-amber-500",
  shipped: "bg-blue-500",
  delivered: "bg-secondary",
  cancelled: "bg-red-500",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [filter, setFilter] = useState<string>("all");

  const fetchOrders = () => {
    setLoading(true);
    axios
      .get("https://ecom-zb9o.vercel.app/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setOrders(res.data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const orderTotal = (order: any) =>
    order.subOrders.reduce(
      (sum: number, sub: any) =>
        sum + parseFloat(sub.subTotal) + parseFloat(sub.deliveryCharge),
      0,
    );

  const orderItemCount = (order: any) =>
    order.subOrders.reduce(
      (sum: number, sub: any) => sum + sub.orderItems.length,
      0,
    );

  const stats = useMemo(() => {
    return {
      all: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      shipped: orders.filter((o) => o.status === "shipped").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
    };
  }, [orders]);

  const visibleOrders = useMemo(() => {
    if (filter === "all") return orders;
    return orders.filter((o) => o.status === filter);
  }, [orders, filter]);

  if (loading) return <OrdersSkeleton />;

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-red-50 text-red-500">
          <Package size={22} />
        </div>
        <p className="font-josefin text-[16px] font-semibold text-primary-dark">
          Could not load your orders
        </p>
        <p className="max-w-xs text-[13.5px] text-gray-500">{error}</p>
        <button
          onClick={fetchOrders}
          className="mt-2 h-10 rounded-xl bg-primary px-5 text-[13.5px] font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <>
      <BreadCrumb
        title="My Orders"
        paths={[{ title: "Orders", link: "/orders" }]}
      />

      <section className="bg-dark-white pb-16">
        <div className="container">
          <div className="-mt-6 rounded-2xl border border-primary-dark/10 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="font-josefin text-[26px] font-bold text-primary-dark sm:text-[30px]">
                  My Orders
                </h1>
                <p className="mt-1.5 text-[14px] text-gray-500">
                  Track and review everything you've ordered from Furnew.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { key: "all", label: "All", value: stats.all },
                  { key: "pending", label: "Pending", value: stats.pending },
                  { key: "shipped", label: "Shipped", value: stats.shipped },
                  {
                    key: "delivered",
                    label: "Delivered",
                    value: stats.delivered,
                  },
                ].map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setFilter(s.key)}
                    className={`rounded-xl border px-3.5 py-2.5 text-left transition-colors ${
                      filter === s.key
                        ? "border-primary bg-primary/5"
                        : "border-primary-dark/10 bg-white hover:border-primary/40"
                    }`}
                  >
                    <p className="font-josefin text-[18px] font-bold text-primary-dark">
                      {s.value}
                    </p>
                    <p className="text-[11.5px] uppercase tracking-wide text-gray-400">
                      {s.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {visibleOrders.length === 0 ? (
            <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-primary-dark/15 bg-white py-24">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                <Package size={22} />
              </div>
              <p className="font-josefin text-[16px] font-semibold text-primary-dark">
                {orders.length === 0
                  ? "You haven't placed any orders yet"
                  : `No ${filter} orders`}
              </p>
              <p className="max-w-xs text-center text-[13.5px] text-gray-500">
                {orders.length === 0
                  ? "When you place an order, it will appear here."
                  : "Try a different filter to see other orders."}
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {visibleOrders.map((order) => {
                const isOpen = !!expanded[order.id];
                const accent = statusBar[order.status] || "bg-gray-400";

                return (
                  <div
                    key={order.id}
                    className="relative overflow-hidden rounded-2xl border border-primary-dark/10 bg-white transition-shadow duration-200 hover:shadow-md"
                  >
                    <span
                      className={`absolute inset-y-0 left-0 w-1.5 ${accent}`}
                    />

                    <button
                      onClick={() => toggleExpand(order.id)}
                      className="flex w-full items-start gap-5 px-6 py-5 text-left"
                    >
                      <div className="hidden h-12 w-12 shrink-0 place-items-center rounded-xl bg-dark-white text-primary sm:grid">
                        <Package size={20} />
                      </div>

                      <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                            Reference
                          </p>
                          <p className="mt-0.5 font-josefin text-[14.5px] font-semibold text-primary-dark">
                            #{order.reference || order.id}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                            Placed
                          </p>
                          <p className="mt-0.5 text-[14px] text-gray-700">
                            {new Date(order.createdAt).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                            Items
                          </p>
                          <p className="mt-0.5 text-[14px] text-gray-700">
                            {orderItemCount(order)} item
                            {orderItemCount(order) === 1 ? "" : "s"}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                            Total
                          </p>
                          <p className="mt-0.5 font-josefin text-[15px] font-bold text-primary">
                            Rs. {orderTotal(order).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <div className="flex flex-wrap items-center justify-end gap-1.5">
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
                              statusStyles[order.status] ||
                              "border-gray-200 bg-gray-50 text-gray-600"
                            }`}
                          >
                            {order.status}
                          </span>
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
                              paymentStyles[order.paymentStatus] ||
                              "border-gray-200 bg-gray-50 text-gray-600"
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </div>

                        <span
                          className={`grid h-7 w-7 place-items-center rounded-full bg-dark-white text-primary-dark transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        >
                          <ChevronDown size={15} />
                        </span>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-primary-dark/10 bg-dark-white/40 px-6 py-6">
                        <div className="grid gap-4 sm:grid-cols-3">
                          <div className="rounded-xl border border-primary-dark/10 bg-white p-4">
                            <div className="flex items-center gap-2 text-primary">
                              <Phone size={14} />
                              <p className="text-[11px] font-semibold uppercase tracking-wide text-primary-dark">
                                Phone
                              </p>
                            </div>
                            <p className="mt-2 text-[13.5px] text-gray-600">
                              {order.phone}
                            </p>
                          </div>

                          <div className="rounded-xl border border-primary-dark/10 bg-white p-4">
                            <div className="flex items-center gap-2 text-primary">
                              <MapPin size={14} />
                              <p className="text-[11px] font-semibold uppercase tracking-wide text-primary-dark">
                                Address
                              </p>
                            </div>
                            <p className="mt-2 text-[13.5px] leading-relaxed text-gray-600">
                              {order.address}
                              {order.secondaryAddress
                                ? `, ${order.secondaryAddress}`
                                : ""}
                            </p>
                          </div>

                          <div className="rounded-xl border border-primary-dark/10 bg-white p-4">
                            <div className="flex items-center gap-2 text-primary">
                              <CreditCard size={14} />
                              <p className="text-[11px] font-semibold uppercase tracking-wide text-primary-dark">
                                Payment
                              </p>
                            </div>
                            <p className="mt-2 text-[13.5px] capitalize text-gray-600">
                              {order.paymentMode}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 space-y-4">
                          {order.subOrders.map((sub: any) => (
                            <div
                              key={sub.id}
                              className="rounded-xl border border-primary-dark/10 bg-white p-5"
                            >
                              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                <p className="text-[13.5px] text-gray-500">
                                  Sold by{" "}
                                  <span className="font-semibold text-primary-dark">
                                    {sub.seller.firstName}{" "}
                                    {sub.seller.lastName}
                                  </span>
                                </p>
                                <span
                                  className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
                                    statusStyles[sub.status] ||
                                    "border-gray-200 bg-gray-50 text-gray-600"
                                  }`}
                                >
                                  {sub.status}
                                </span>
                              </div>

                              <div className="divide-y divide-primary-dark/10">
                                {sub.orderItems.map((item: any) => (
                                  <div
                                    key={item.id}
                                    className="flex items-center justify-between py-2.5 text-[13.5px]"
                                  >
                                    <span className="text-gray-700">
                                      {item.productTitle}
                                      <span className="ml-2 rounded-full bg-dark-white px-2 py-0.5 text-[11.5px] text-gray-500">
                                        x{item.quantity}
                                      </span>
                                    </span>
                                    <span className="font-semibold text-primary-dark">
                                      Rs.{" "}
                                      {(item.price * item.quantity).toFixed(2)}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-3 flex justify-between border-t border-primary-dark/10 pt-3 text-[13px]">
                                <span className="text-gray-500">
                                  Delivery charge
                                </span>
                                <span className="font-semibold text-primary-dark">
                                  Rs.{" "}
                                  {parseFloat(sub.deliveryCharge).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 flex items-center justify-between rounded-xl bg-primary-dark px-5 py-4">
                          <div>
                            <p className="text-[11px] uppercase tracking-wider text-white/60">
                              Order total
                            </p>
                            <p className="mt-0.5 font-josefin text-[13.5px] text-white/80">
                              {orderItemCount(order)} item
                              {orderItemCount(order) === 1 ? "" : "s"} ·{" "}
                              {order.subOrders.length} shipment
                              {order.subOrders.length === 1 ? "" : "s"}
                            </p>
                          </div>
                          <p className="font-josefin text-[22px] font-bold text-white">
                            Rs. {orderTotal(order).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}