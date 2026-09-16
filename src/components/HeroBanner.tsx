import { useState } from "react";
 
// Replace YOUR_IMAGE_URL below with the path/URL to your own product photo.
// e.g. import productImg from "./your-photo.jpg"; then use {productImg}
const YOUR_IMAGE_URL = "https://placehold.co/700x600/f4c9d8/9a3a5e?text=Your+Product+Photo";
 
const slides = [0, 1, 2, 3];
 
export default function HeroBanner() {
  const [active, setActive] = useState(0);
 
  return (
    <section className="relative w-full overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-12 lg:py-24">
        {/* Left: copy */}
        <div className="relative z-10 order-2 md:order-1">
          <p className="mb-3 font-lato text-[16px] font-bold tracking-wide text-secondary">
            Best furniture for your castle....
          </p>
 
          <h1 className="font-josefin text-4xl font-bold leading-tight text-black sm:text-5xl lg:text-6xl">
            New furniture
            <br />
            collection trends
            <br />
            in 2026
          </h1>
 
          <p className="mt-6 max-w-md text-[15px] font-bold leading-relaxed text-[#8A8FB9]">
            Lorem ipsum sit amet, consectetur adipiscing elit. Magna in
            est adipiscing in phasellus non in justo.
          </p>
 
          <button className="mt-8 bg-[#e91e8c] px-8 py-3 text-sm font-josefin font-bold text-[17px] text-white shadow-sm transition hover:bg-[#d4127b]">
            Shop now
          </button>
 
          {/* dot pagination (decorative, mirrors reference) */}
          <div className="mt-16 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e91e8c]" />
          </div>
        </div>
 
        {/* Right: product image */}
        <div className="relative order-1 flex items-center justify-center md:order-2">
          {/* soft background blob, mirrors reference */}
          <div className="absolute h-[420px] w-[420px] rounded-full bg-[#e9ddf5] sm:h-[480px] sm:w-[480px] lg:h-[520px] lg:w-[520px]" />
 
          {/* your product image goes here */}
          {/* <img
            src={YOUR_IMAGE_URL}
            alt="Featured product"
            className="relative z-10 max-h-[420px] w-auto object-contain sm:max-h-[480px] lg:max-h-[560px]"
          /> */}
 
          {/* discount badge */}
          <div className="absolute right-2 top-6 z-20 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#3fc4f0] text-center text-white shadow-md sm:right-6 sm:top-8 sm:h-28 sm:w-28">
            <span className="text-lg font-bold leading-none sm:text-xl">50%</span>
            <span className="text-sm font-semibold sm:text-base">off</span>
          </div>
        </div>
      </div>
 
      {/* slide indicator dots bottom-right, mirrors reference */}
      <div className="absolute bottom-6 right-8 z-20 flex items-center gap-2 sm:bottom-10 sm:right-16">
        {slides.map((i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 w-2.5 rotate-45 border transition ${
              active === i
                ? "border-[#e91e8c] bg-[#e91e8c]"
                : "border-[#e91e8c] bg-transparent"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
 