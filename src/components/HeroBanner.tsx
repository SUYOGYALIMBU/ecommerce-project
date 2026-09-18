import { Link } from "react-router-dom";
import { ArrowRight, Star, Sparkles } from "lucide-react";

const MAIN_IMG ="/images/hero-main.jpg";
const SMALL_IMG ="/images/hero-small.jpg";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden border-b border-primary-dark/10 bg-dark-white">

      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-3xl"
      />

      <div className="container relative grid grid-cols-1 items-center gap-12 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
   
        <div className="lg:col-span-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/70 px-3 py-1 text-[12.5px] font-medium text-primary-dark backdrop-blur">
            <Sparkles size={13} className="text-primary" />
            Spring Collection · 2026
          </span>

          <h1 className="mt-6 font-josefin text-[42px] font-bold leading-[1.05] tracking-tight text-primary-dark sm:text-[52px] lg:text-[58px]">
            Pieces that
            <br />
            live with <span className="text-primary">you</span>.
          </h1>

          <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-gray-500">
            Solid walnut, hand-stitched linen, honest joinery. Furniture built
            to be used every day — and loved for years.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/products"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-[15px] font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
            >
              Explore collection
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/shop"
              className="inline-flex h-12 items-center rounded-xl border border-primary-dark/15 bg-white px-6 text-[15px] font-semibold text-primary-dark transition-colors hover:border-primary/40 hover:text-primary"
            >
              Visit showroom
            </Link>
          </div>

     
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2">
              <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-dark-white bg-primary/25 text-[11px] font-bold text-primary-dark">
                A
              </span>
              <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-dark-white bg-secondary/25 text-[11px] font-bold text-primary-dark">
                R
              </span>
              <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-dark-white bg-primary-dark/20 text-[11px] font-bold text-primary-dark">
                P
              </span>
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-primary">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </div>
              <p className="mt-0.5 text-[12.5px] text-gray-500">
                <span className="font-semibold text-primary-dark">2,400+</span>{" "}
                happy homes
              </p>
            </div>
          </div>
        </div>

  
        <div className="relative lg:col-span-7">
          <div className="grid grid-cols-12 gap-4">
     
            <div className="col-span-12 overflow-hidden rounded-3xl border border-primary-dark/10 bg-white shadow-[0_30px_80px_-40px_rgba(62,44,35,0.45)] sm:col-span-8">
              <img
                src={MAIN_IMG}
                alt="Featured Furnew furniture"
                className="h-[380px] w-full object-cover sm:h-[480px] lg:h-[560px]"
              />
            </div>

            {/* Small image + dark info card */}
            <div className="col-span-12 flex flex-col gap-4 sm:col-span-4">
              <div className="hidden overflow-hidden rounded-3xl border border-primary-dark/10 bg-white sm:block">
                <img
                  src={SMALL_IMG}
                  alt="Furnew chair detail"
                  className="h-[180px] w-full object-cover"
                />
              </div>

              <div className="flex-1 rounded-3xl bg-primary-dark p-5 text-white">
                <p className="font-josefin text-[15.5px] font-semibold">
                  Handcrafted
                </p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/60">
                  Made in our Kathmandu workshop, one piece at a time.
                </p>
                <div className="mt-4 h-px bg-white/10" />
                <p className="mt-4 text-[10.5px] uppercase tracking-[0.18em] text-white/40">
                  Est. 2026
                </p>
              </div>
            </div>
          </div>

          {/* Floating status tag */}
          <div className="absolute -bottom-4 left-6 hidden items-center gap-2 rounded-2xl border border-primary-dark/10 bg-white px-4 py-2.5 shadow-lg sm:flex">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            <span className="text-[12.5px] font-medium text-primary-dark">
              In stock · Ships in 3 days
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}