import Link from "next/link";

export default function Home() {
  return (
    <main
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      {/* SOFT OVERLAY (matches builder) */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />

      {/* CARD */}
      <div className="relative bg-white/50 backdrop-blur-2xl border border-white/60 shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-3xl p-6 sm:p-10 w-full max-w-md sm:max-w-xl text-center transition-all duration-300">

        <h1 className="text-2xl sm:text-4xl font-medium text-neutral-700 mb-3 sm:mb-4">
          Sticker Studio
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 mb-6 sm:mb-8 leading-relaxed">
          Stickers for streetwear brands, cloud-kitchen hustlers, indie tattooers,
          farm-to-table crews and bedroom entrepreneurs. If it needs to stick and
          look good, we're your people.
        </p>

        <Link href="/builder">
          <button className="px-6 py-2.5 sm:py-3 bg-[#c6a27e] text-white rounded-full font-medium shadow-md hover:scale-[1.03] hover:shadow-lg transition-all duration-200">
            Build Your Sticker
          </button>
        </Link>

      </div>
    </main>
  );
}