import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OrdersSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <Skeleton width={180} height={35} className="mb-8" />

        <div className="space-y-5">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              {/* Header */}
              <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Skeleton width={90} height={12} />
                  <Skeleton width={140} height={22} className="mt-2" />
                </div>

                <div>
                  <Skeleton width={70} height={12} />
                  <Skeleton width={110} height={22} className="mt-2" />
                </div>

                <div>
                  <Skeleton width={50} height={12} />
                  <Skeleton width={40} height={22} className="mt-2" />
                </div>

                <div>
                  <Skeleton width={50} height={12} />
                  <Skeleton width={70} height={22} className="mt-2" />
                </div>

                <div className="flex items-center gap-3">
                  <Skeleton width={70} height={28} borderRadius={999} />
                  <Skeleton width={70} height={28} borderRadius={999} />
                  <Skeleton
                    circle
                    width={28}
                    height={28}
                  />
                </div>
              </div>

              {/* Expanded Preview */}
              <div className="border-t border-gray-100 bg-gray-50 p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item}>
                      <Skeleton width={70} height={12} />
                      <Skeleton width="90%" height={18} className="mt-2" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl bg-white p-4">
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="flex justify-between py-3"
                    >
                      <Skeleton width={180} height={18} />
                      <Skeleton width={70} height={18} />
                    </div>
                  ))}

                  <div className="border-t pt-3 mt-2 flex justify-between">
                    <Skeleton width={120} height={18} />
                    <Skeleton width={60} height={18} />
                  </div>
                </div>

                <div className="mt-5 flex justify-between">
                  <Skeleton width={120} height={24} />
                  <Skeleton width={80} height={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersSkeleton;