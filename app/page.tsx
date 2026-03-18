import Link from "next/link";

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.png')" }}
    >

      <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-10 w-full max-w-xl text-center">

        <h1 className="text-4xl font-semibold text-white mb-4">
          Sticker Studio
        </h1>

        <p className="text-gray-300 mb-8">
       

        Custom stickers that match your vibe.
        Built for brands, creators, and everything in between.

        </p>

        <Link href="/builder">
          <button className="px-6 py-3 bg-white text-black rounded-full font-medium hover:scale-105 transition-all duration-200 shadow-lg">
            Build Your Sticker
          </button>
        </Link>

      </div>

    </main>
  );
}