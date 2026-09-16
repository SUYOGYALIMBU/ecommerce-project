// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import ProductCard, { type Product } from '../../components/ProductCard';

// // Define the shape of your API's outer JSON envelope
// interface ApiResponse {
//     data: {
//         limit: number;
//         page: number;
//         products: Product[]; // The clean array we want
//         total: number;
//     };
// }

// function ProductsListing() {
//     // State is correctly typed as an array of Products
//     const [products, setProducts] = useState<Product[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 setLoading(true);
                
//                 // 1. Pass the ApiResponse envelope interface to axios.get
//                 const response = await axios.get<ApiResponse>(
//                     'https://ecom-zb9o.vercel.app/api/products?q=&limit=15&page=1&sort=createdAt&categoryIds='
//                 );
//                 console.log(response.data.data.products);
                
//                 // 2. Drill down to the exact array: response.data.data.products
//                 setProducts(response.data.data.products);
//             } catch (err) {
//                 setError('Failed to fetch products. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []); 

//     if (loading) return <div>Loading products...</div>;
//     if (error) return <div style={{ color: 'red' }}>{error}</div>;

//     return (
//         <div>
//             <h2>Products Listing</h2>
//             {/* 3. This now safely receives a real, clean array */}
//             <ProductCard products={products} />
//         </div>
//     );
// }

// export default ProductsListing;
