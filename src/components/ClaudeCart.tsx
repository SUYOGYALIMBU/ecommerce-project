// import { useState } from "react";

// import { X, Minus, Plus, ShieldCheck } from "lucide-react";

// const initialItems = [
//   {
//     id: 1,
//     name: "Ut diam consequat",
//     color: "Brown",
//     size: "XL",
//     price: 32.0,
//     qty: 1,
//     unitTotal: 219.0,
//     image:
//       "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop",
//   },
//   {
//     id: 2,
//     name: "Vel faucibus posuere",
//     color: "Brown",
//     size: "XL",
//     price: 32.0,
//     qty: 1,
//     unitTotal: 219.0,
//     image:
//       "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop",
//   },
//   {
//     id: 3,
//     name: "Ac vitae vestibulum",
//     color: "Brown",
//     size: "XL",
//     price: 32.0,
//     qty: 1,
//     unitTotal: 219.0,
//     image:
//       "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop",
//   },
//   {
//     id: 4,
//     name: "Elit massa diam",
//     color: "Brown",
//     size: "XL",
//     price: 32.0,
//     qty: 1,
//     unitTotal: 219.0,
//     image:
//       "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop",
//   },
//   {
//     id: 5,
//     name: "Proin pharetra elementum",
//     color: "Brown",
//     size: "XL",
//     price: 32.0,
//     qty: 1,
//     unitTotal: 219.0,
//     image:
//       "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop",
//   },
// ];

// function QuantityStepper({ qty, onChange }) {
//   return (
//     <div className="inline-flex items-center gap-3 rounded bg-slate-100 px-2 py-1.5">
//       <button
//         type="button"
//         onClick={() => onChange(Math.max(1, qty - 1))}
//         className="text-slate-500 hover:text-slate-800 transition-colors"
//         aria-label="Decrease quantity"
//       >
//         <Minus size={14} />
//       </button>
//       <span className="w-4 text-center text-sm text-slate-700">{qty}</span>
//       <button
//         type="button"
//         onClick={() => onChange(qty + 1)}
//         className="text-slate-500 hover:text-slate-800 transition-colors"
//         aria-label="Increase quantity"
//       >
//         <Plus size={14} />
//       </button>
//     </div>
//   );
// }

// export default function ShoppingCart() {
//   const [items, setItems] = useState(initialItems);
//   const [country] = useState("Bangladesh");
//   const [city] = useState("Mirpur Dhaka - 1200");
//   const [postal, setPostal] = useState("");

//   const updateQty = (id, qty) =>
//     setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));

//   const removeItem = (id) =>
//     setItems((prev) => prev.filter((i) => i.id !== id));

//   const clearCart = () => setItems([]);

//   const subtotal = items.reduce((sum, i) => sum + i.unitTotal, 0);
//   const shippingEstimate = items.length ? 106.0 : 0;
//   const total = subtotal + shippingEstimate;

//   const currency = (n) =>
//     `£${n.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

//   return (
//     <div className="min-h-screen bg-white px-6 py-10 sm:px-10">
//       <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
//         {/* Cart items */}
//         <div>
//           <div className="hidden grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b border-slate-200 pb-4 text-sm font-semibold uppercase tracking-wide text-slate-900 sm:grid">
//             <span>Product</span>
//             <span>Price</span>
//             <span>Quantity</span>
//             <span className="text-right">Total</span>
//           </div>

//           <div>
//             {items.map((item) => (
//               <div
//                 key={item.id}
//                 className="grid grid-cols-1 gap-4 border-b border-slate-100 py-6 sm:grid-cols-[2fr_1fr_1fr_1fr] sm:items-center"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-slate-100">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="h-full w-full object-cover"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeItem(item.id)}
//                       className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-700"
//                       aria-label={`Remove ${item.name}`}
//                     >
//                       <X size={12} />
//                     </button>
//                   </div>
//                   <div>
//                     <p className="font-medium text-slate-900">{item.name}</p>
//                     <p className="text-sm text-slate-400">
//                       Color: {item.color}
//                     </p>
//                     <p className="text-sm text-slate-400">Size: {item.size}</p>
//                   </div>
//                 </div>

//                 <div className="text-sm text-slate-700 sm:text-base">
//                   ${item.price.toFixed(2)}
//                 </div>

//                 <div>
//                   <QuantityStepper
//                     qty={item.qty}
//                     onChange={(qty) => updateQty(item.id, qty)}
//                   />
//                 </div>

//                 <div className="text-sm font-medium text-slate-900 sm:text-right sm:text-base">
//                   {currency(item.unitTotal)}
//                 </div>
//               </div>
//             ))}

//             {items.length === 0 && (
//               <p className="py-10 text-center text-slate-400">
//                 Your cart is empty.
//               </p>
//             )}
//           </div>

//           <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
//             <button
//               type="button"
//               className="rounded bg-pink-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pink-700"
//             >
//               Update Cart
//             </button>
//             <button
//               type="button"
//               onClick={clearCart}
//               className="rounded bg-pink-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pink-700"
//             >
//               Clear Cart
//             </button>
//           </div>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-8">
//           <div className="rounded-lg bg-indigo-50/70 p-6">
//             <h2 className="mb-5 text-center text-lg font-bold text-slate-900">
//               Cart Totals
//             </h2>

//             <div className="space-y-4">
//               <div className="flex items-center justify-between border-b border-slate-200 pb-3">
//                 <span className="text-slate-700">Subtotals:</span>
//                 <span className="font-medium text-slate-900">
//                   {currency(subtotal)}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between border-b border-slate-200 pb-3">
//                 <span className="text-slate-700">Totals:</span>
//                 <span className="font-medium text-slate-900">
//                   {currency(total)}
//                 </span>
//               </div>
//             </div>

//             <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
//               <ShieldCheck size={16} className="text-green-500" />
//               Shipping & taxes calculated at checkout
//             </p>

//             <button
//               type="button"
//               disabled={items.length === 0}
//               className="mt-5 w-full rounded bg-green-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               Proceed To Checkout
//             </button>
//           </div>

//           <div className="rounded-lg bg-indigo-50/70 p-6">
//             <h2 className="mb-5 text-center text-lg font-bold text-slate-900">
//               Calculate Shipping
//             </h2>

//             <div className="space-y-1">
//               <input
//                 type="text"
//                 readOnly
//                 value={country}
//                 className="w-full border-b border-slate-200 bg-transparent py-2 text-sm text-slate-400 outline-none"
//               />
//               <input
//                 type="text"
//                 readOnly
//                 value={city}
//                 className="w-full border-b border-slate-200 bg-transparent py-2 text-sm text-slate-400 outline-none"
//               />
//               <input
//                 type="text"
//                 placeholder="Postal Code"
//                 value={postal}
//                 onChange={(e) => setPostal(e.target.value)}
//                 className="w-full border-b border-slate-200 bg-transparent py-2 text-sm text-slate-500 outline-none placeholder:text-slate-400"
//               />
//             </div>

//             <button
//               type="button"
//               className="mt-5 rounded bg-pink-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pink-700"
//             >
//               Calculate Shiping
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }