import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-dark-white px-6 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
        <SearchX size={26} />
      </div>
      <p className="font-josefin text-[40px] font-bold text-primary-dark">
        404
      </p>
      <h1 className="font-josefin text-[22px] font-semibold text-primary-dark">
        Page not found
      </h1>
      <p className="max-w-sm text-[14px] text-gray-500">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex h-11 items-center rounded-xl bg-primary px-6 text-[14px] font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5"
      >
        Back to home
      </Link>
    </div>
  );
}