import axios from "axios";

export const USE_MOCK = true;
export const API_BASE = "https://ecom-zb9o.vercel.app/api";

const http = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const read = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key: string, value: unknown) =>
  localStorage.setItem(key, JSON.stringify(value));

export type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
};

export type CartItem = {
  _id: string;
  product: Product;
  quantity: number;
};

export type Order = {
  _id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "shipped" | "delivered";
  createdAt: string;
};

const MOCK_PRODUCTS: Product[] = [
  { _id: "p1", name: "Walnut Sofa", price: 45000, category: "Sofas", image: "/images/cat-sofa.jpg", description: "Solid walnut frame with hand-stitched linen upholstery — built to be lived on." },
  { _id: "p2", name: "Linen Armchair", price: 18000, category: "Chairs", image: "/images/cat-chair.jpg", description: "Comfortable armchair with a solid oak base and removable linen cover." },
  { _id: "p3", name: "Oak Coffee Table", price: 22000, category: "Tables", image: "/images/cat-table.jpg", description: "Solid oak top with a matte finish and hidden lower storage shelf." },
  { _id: "p4", name: "Teak Bed Frame", price: 62000, category: "Beds", image: "/images/cat-bed.jpg", description: "King-size teak bed frame with slatted base — no box spring needed." },
  { _id: "p5", name: "Velvet Lounge Chair", price: 26000, category: "Chairs", image: "/images/cat-chair.jpg", description: "Deep-seated lounge chair in forest-green velvet with brass feet." },
  { _id: "p6", name: "Round Side Table", price: 9500, category: "Tables", image: "/images/cat-table.jpg", description: "Compact round side table — perfect for small spaces and reading nooks." },
  { _id: "p7", name: "3-Seater Sofa", price: 58000, category: "Sofas", image: "/images/cat-sofa.jpg", description: "Spacious 3-seater in warm beige fabric with feather-filled cushions." },
  { _id: "p8", name: "Queen Bed Frame", price: 54000, category: "Beds", image: "/images/cat-bed.jpg", description: "Queen-size bed frame with a tall upholstered headboard." },
];

export const productApi = {
  list: async (): Promise<Product[]> => {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 250));
      return MOCK_PRODUCTS;
    }
    const res = await http.get("/products");
    return Array.isArray(res.data) ? res.data : res.data.products || [];
  },

  detail: async (slug: string): Promise<Product | undefined> => {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      return MOCK_PRODUCTS.find((p) => p._id === slug);
    }
    const res = await http.get(`/product/${slug}`);
    return res.data.product || res.data;
  },
};

const CART_KEY = "furnew_cart";

export const cartApi = {
  get: async (): Promise<CartItem[]> => {
    if (USE_MOCK) return read<CartItem[]>(CART_KEY, []);
    const res = await http.get("/cart");
    return res.data.cart || res.data || [];
  },

  add: async (product: Product, quantity = 1): Promise<CartItem[]> => {
    if (USE_MOCK) {
      const cart = read<CartItem[]>(CART_KEY, []);
      const existing = cart.find((c) => c.product._id === product._id);
      if (existing) existing.quantity += quantity;
      else cart.push({ _id: `c_${Date.now()}`, product, quantity });
      write(CART_KEY, cart);
      return cart;
    }
    await http.post("/cart", { productId: product._id, quantity });
    return cartApi.get();
  },

  update: async (id: string, quantity: number): Promise<CartItem[]> => {
    if (USE_MOCK) {
      const cart = read<CartItem[]>(CART_KEY, []);
      const item = cart.find((c) => c._id === id);
      if (item) item.quantity = Math.max(1, quantity);
      write(CART_KEY, cart);
      return cart;
    }
    await http.patch(`/cart/${id}`, { quantity });
    return cartApi.get();
  },

  remove: async (id: string): Promise<CartItem[]> => {
    if (USE_MOCK) {
      const cart = read<CartItem[]>(CART_KEY, []).filter((c) => c._id !== id);
      write(CART_KEY, cart);
      return cart;
    }
    await http.delete(`/cart/${id}`);
    return cartApi.get();
  },

  clear: async (): Promise<void> => {
    if (USE_MOCK) {
      write(CART_KEY, []);
      return;
    }
    await http.delete("/cart");
  },
};

const ORDER_KEY = "furnew_orders";

export const orderApi = {
  list: async (): Promise<Order[]> => {
    if (USE_MOCK) return read<Order[]>(ORDER_KEY, []);
    const res = await http.get("/orders");
    return res.data.orders || res.data || [];
  },

  place: async (items: CartItem[]): Promise<Order> => {
    const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
    const order: Order = {
      _id: `o_${Date.now()}`,
      items,
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    if (USE_MOCK) {
      const orders = read<Order[]>(ORDER_KEY, []);
      orders.unshift(order);
      write(ORDER_KEY, orders);
      await cartApi.clear();
      return order;
    }
    const res = await http.post("/orders", { items });
    return res.data.order || res.data;
  },
};