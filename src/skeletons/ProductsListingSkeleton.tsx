import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductsListingSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductsListingSkeleton;