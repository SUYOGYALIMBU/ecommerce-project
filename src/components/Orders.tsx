import { useEffect, useState } from "react";
import axios from "axios";
import {
  CalendarDays,
  ChevronDown,
  CreditCard,
  MapPin,
  Package,
  Phone,
} from "lucide-react";
import BreadCrumb from "./BreadCrumb";
import OrdersSkeleton from "../skeletons/OrdersSkeleton";

type Order = {
  id: number;
  orderNo: string;
  userId: number;
  status: string;
  paymentStatus: string;
  address: string;
  phone: string;
  paymentMode: string;
  createdAt: string;
  updatedAt: string;
};

const statusStyles: Record<string, string> = {
  pending: "bg-primary/10 text-primary border-primary/20",
  accepted: "bg-blue-50 text-blue-700 border-blue-200",
  shipping: "bg-amber-50 text-amber-700 border-amber-200",
  completed: "bg-secondary/10 text-secondary border-secondary/20",
  rejected: "bg-red-50 text-red-600 border-red-200",
};

const statusBar: Record<string, string> = {
  pending: "bg-primary",
  accepted: "bg-blue-500",
  shipping: "bg-amber-500",
  completed: "bg-secondary",
  rejected: "bg-red-500",
};

const paymentStyles: Record<string, string> = {
  paid: "bg-secondary/10 text-secondary border-secondary/20",
  unpaid: "bg-red-50 text-red-600 border-red-200",
  conflict: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [filter, setFilter] = useState("all");

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:4000/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders(res.data?.data || []);
    } catch (err: any) {
      console.error("Failed to load orders:", err);
      setError(
        err?.response?.data?.msg ||
          err?.message ||
          "Failed to load your orders.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const stats = {
    all: orders.length,
    pending: orders.filter((order) => order.status === "pending").length,
    shipping: orders.filter((order) => order.status === "shipping").length,
    completed: orders.filter((order) => order.status === "completed").length,
  };

  const visibleOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  if (loading) {
    return <OrdersSkeleton />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-red-50 text-red-500">
          <Package size={22} />
        </div>

        <p className="font-josefin text-[16px] font-semibold text-primary-dark">
          Could not load your orders
        </p>

        <p className="max-w-md text-[13.5px] text-gray-500">
          {error}
        </p>

        <button
          onClick={fetchOrders}
          className="mt-2 h-10 rounded-xl bg-primary px-5 text-[13.5px] font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Try Again
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
                <p className="mb-1 font-lato text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Furnew
                </p>

                <h1 className="font-josefin text-[26px] font-bold text-primary-dark sm:text-[30px]">
                  My Orders
                </h1>

                <p className="mt-1.5 text-[14px] text-gray-500">
                  Track and review your furniture orders.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  {
                    key: "all",
                    label: "All",
                    value: stats.all,
                  },
                  {
                    key: "pending",
                    label: "Pending",
                    value: stats.pending,
                  },
                  {
                    key: "shipping",
                    label: "Shipping",
                    value: stats.shipping,
                  },
                  {
                    key: "completed",
                    label: "Completed",
                    value: stats.completed,
                  },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setFilter(item.key)}
                    className={`min-w-[80px] rounded-xl border px-3.5 py-2.5 text-left transition-all ${
                      filter === item.key
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-primary-dark/10 bg-white hover:border-primary/40"
                    }`}
                  >
                    <p className="font-josefin text-[18px] font-bold text-primary-dark">
                      {item.value}
                    </p>

                    <p className="text-[11px] uppercase tracking-wide text-gray-400">
                      {item.label}
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
                  : "Try another filter to see your other orders."}
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {visibleOrders.map((order) => {
                const isOpen = !!expanded[order.id];

                const accent =
                  statusBar[order.status] || "bg-gray-400";

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

                      <div className="grid flex-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                            Order Number
                          </p>

                          <p className="mt-0.5 break-all font-josefin text-[14px] font-semibold text-primary-dark">
                            #{order.orderNo}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                            Placed
                          </p>

                          <p className="mt-0.5 text-[14px] text-gray-700">
                            {new Date(
                              order.createdAt,
                            ).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                            Payment
                          </p>

                          <p className="mt-0.5 text-[14px] font-medium capitalize text-primary-dark">
                            {order.paymentMode === "cod"
                              ? "Cash on Delivery"
                              : order.paymentMode}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                            Status
                          </p>

                          <div className="mt-1">
                            <span
                              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
                                statusStyles[order.status] ||
                                "border-gray-200 bg-gray-50 text-gray-600"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
                            paymentStyles[order.paymentStatus] ||
                            "border-gray-200 bg-gray-50 text-gray-600"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>

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
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          <div className="rounded-xl border border-primary-dark/10 bg-white p-4">
                            <div className="flex items-center gap-2 text-primary">
                              <CalendarDays size={15} />

                              <p className="text-[11px] font-semibold uppercase tracking-wide text-primary-dark">
                                Order Date
                              </p>
                            </div>

                            <p className="mt-2 text-[13.5px] text-gray-600">
                              {new Date(
                                order.createdAt,
                              ).toLocaleString(undefined, {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </p>
                          </div>

                          <div className="rounded-xl border border-primary-dark/10 bg-white p-4">
                            <div className="flex items-center gap-2 text-primary">
                              <Phone size={15} />

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
                              <CreditCard size={15} />

                              <p className="text-[11px] font-semibold uppercase tracking-wide text-primary-dark">
                                Payment Method
                              </p>
                            </div>

                            <p className="mt-2 text-[13.5px] capitalize text-gray-600">
                              {order.paymentMode === "cod"
                                ? "Cash on Delivery"
                                : "eSewa"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 rounded-xl border border-primary-dark/10 bg-white p-4">
                          <div className="flex items-center gap-2 text-primary">
                            <MapPin size={15} />

                            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary-dark">
                              Delivery Address
                            </p>
                          </div>

                          <p className="mt-2 text-[13.5px] leading-relaxed text-gray-600">
                            {order.address}
                          </p>
                        </div>

                        <div className="mt-6 flex flex-col gap-3 rounded-xl bg-primary-dark px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-[11px] uppercase tracking-wider text-white/60">
                              Order Reference
                            </p>

                            <p className="mt-0.5 break-all font-josefin text-[13.5px] text-white/80">
                              {order.orderNo}
                            </p>
                          </div>

                          <div className="text-left sm:text-right">
                            <p className="text-[11px] uppercase tracking-wider text-white/60">
                              Order Status
                            </p>

                            <p className="mt-0.5 font-josefin text-[16px] font-bold capitalize text-white">
                              {order.status}
                            </p>
                          </div>
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