import React from 'react'

interface Category {
    id: number;
    title: string;
    parentId: string | number;
}

export interface Product {
    id: number;
    title: string;
    categoryId?: number;   // Added to match your API 'categoryId'
    price: string;
    description: string;
    stock?: number;        // Made optional to match your API response
    category?: Category;   // Made optional to prevent runtime crashes
    images?: string[];     // Made optional
}

interface ProductCardProps {
    products: any; // Accept the full API wrapper object coming from your parent
}

function ProductCard({ products }: ProductCardProps) {
    console.log(products);
    
    // 1. Unpack the real array from the nested API wrapper structure
    const actualProductsArray = products?.data?.products;

    // 2. Add a fallback guard condition while the API is loading data
    if (!Array.isArray(actualProductsArray)) {
        return <div style={{ padding: '20px', color: '#666' }}>Loading items...</div>;
    }
    
    return (
        <>
            <ul style={{ listStyleType: 'none', padding: 0, display: 'grid', gap: '16px' }}>
                {/* 3. Loop over the extracted array */}
                {actualProductsArray.map((product: Product) => (
                    <li key={product.id} style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', maxWidth: '400px' }}>
                        <article>
                            {/* Category Tag (Safely checks for category object or falls back to categoryId) */}
                            <small style={{ textTransform: 'uppercase', color: '#666', fontSize: '11px', fontWeight: 'bold' }}>
                                {product.category?.title || `Category ID: ${product.categoryId}`}
                            </small>

                            {/* Product Title */}
                            <h3 style={{ margin: '4px 0 8px 0', fontSize: '18px' }}>{product.title}</h3>

                            {/* Description Snippet */}
                            <p style={{ color: '#444', fontSize: '14px', margin: '0 0 12px 0' }}>{product.description}</p>

                            {/* Price & Stock Row */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <strong style={{ fontSize: '16px', color: '#111' }}>${product.price}</strong>

                                {/* Stock Badging (Uses fallback if stock is missing from API) */}
                                <span style={{ fontSize: '12px', color: (product.stock ?? 1) > 0 ? '#2e7d32' : '#d32f2f', fontWeight: '500' }}>
                                    {product.stock !== undefined 
                                        ? (product.stock > 0 ? `${product.stock} in stock` : 'Out of stock')
                                        : 'In Stock'}
                                </span>
                            </div>
                        </article>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ProductCard
