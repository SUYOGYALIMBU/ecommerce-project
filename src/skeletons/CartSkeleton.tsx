import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CartSkeleton = () => {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] pb-6">
            <Skeleton width={120} height={24} />
            <Skeleton width={70} height={24} />
            <Skeleton width={90} height={24} />
            <div className="flex justify-end">
              <Skeleton width={70} height={24} />
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center py-6"
              >
                <div className="flex items-center gap-4">
                  <Skeleton width={64} height={64} borderRadius={8} />

                  <div>
                    <Skeleton width={160} height={20} />
                    <Skeleton width={110} height={16} className="mt-2" />
                  </div>
                </div>

                <Skeleton width={60} height={20} />

                <Skeleton width={90} height={36} borderRadius={6} />

                <div className="flex justify-end">
                  <Skeleton width={60} height={20} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <Skeleton width={130} height={42} borderRadius={6} />
            <Skeleton width={130} height={42} borderRadius={6} />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <Skeleton width={120} height={28} className="mb-4" />

            <div className="rounded-lg bg-indigo-50 p-6 space-y-5">
              <div className="flex justify-between">
                <Skeleton width={80} />
                <Skeleton width={60} />
              </div>

              <div className="flex justify-between">
                <Skeleton width={120} />
                <Skeleton width={60} />
              </div>

              <div className="flex justify-between">
                <Skeleton width={70} />
                <Skeleton width={60} />
              </div>

              <Skeleton height={16} />
            </div>
          </div>

          <div>
            <Skeleton width={140} height={28} className="mb-4" />

            <div className="rounded-lg bg-indigo-50 p-6 space-y-5">
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />

              <Skeleton width={120} height={20} />

              <div className="flex gap-6">
                <Skeleton width={80} height={24} />
                <Skeleton width={90} height={24} />
              </div>

              <Skeleton
                width={150}
                height={44}
                borderRadius={6}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;