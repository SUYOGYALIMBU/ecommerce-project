import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetailsSkeleton = () => {
  return (
    <section className="container py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top */}
        <div className="bg-white rounded-xl p-10 grid lg:grid-cols-2 gap-14">
          {/* Images */}
          <div className="flex gap-5">
            {/* Thumbnails */}
            <div className="flex flex-col gap-4">
              <Skeleton height={96} width={96} borderRadius={8} />
              <Skeleton height={96} width={96} borderRadius={8} />
              <Skeleton height={96} width={96} borderRadius={8} />
            </div>

            {/* Main Image */}
            <div className="flex-1">
              <Skeleton height={500} borderRadius={12} />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col justify-center">
            <Skeleton width={90} height={18} />

            <div className="mt-5">
              <Skeleton height={40} width="70%" />
            </div>

            <div className="mt-5">
              <Skeleton height={32} width={180} />
            </div>

            <div className="mt-6 space-y-2">
              <Skeleton count={3} height={18} />
            </div>

            <div className="mt-8">
              <Skeleton width={170} height={48} borderRadius={6} />
            </div>

            <div className="mt-10 space-y-4">
              <Skeleton height={20} width="60%" />
              <Skeleton height={20} width="55%" />
              <Skeleton height={20} width="50%" />
              <Skeleton height={20} width="45%" />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="bg-white mt-16 rounded-xl shadow-sm p-10">
          {/* Tabs */}
          <div className="flex gap-10 border-b pb-5">
            <Skeleton width={110} height={24} />
            <Skeleton width={130} height={24} />
            <Skeleton width={90} height={24} />
          </div>

          {/* Description */}
          <div className="mt-10">
            <Skeleton width={220} height={34} />

            <div className="mt-6 space-y-3">
              <Skeleton count={4} height={18} />
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-5 mt-10">
              {[1, 2, 3, 4].map((item) => (
                <Skeleton key={item} height={20} width="80%" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsSkeleton;