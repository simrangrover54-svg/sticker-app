"use client";

import { useState } from "react";

export default function Builder() {
  const [step, setStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [selection, setSelection] = useState({
    category: "",
    type: "",
    cutting: "",
    file: null as File | null,
    email: "",
    phone: "",
  });

  const [currentBg, setCurrentBg] = useState("");

  const categories = [
    {
      name: "Paper Sticker",
      description:
        "Affordable and eco-friendly. Perfect for packaging, labels, gifting, and indoor use.",
      image: "/paper.jpg",
    },
    {
      name: "PP Non-Tearable Sticker",
      description:
        "Durable, tear-resistant stickers for outdoor use like cars, laptops, helmets, and gear.",
      image: "/pp.jpg",
    },
    {
      name: "Clear Film Screen Printed Sticker",
      description:
        "Premium transparent stickers with long-lasting ink protection. Clean and minimal look.",
      image: "/clear.jpg",
    },
  ];

  const types = [
    {
      name: "Square/Rectangle",
      description:
        "Simple machine-cut shapes. Clean, fast, and cost-effective.",
      image: "/square.jpg",
    },
    {
      name: "Shape Cut",
      description:
        "Custom cut around your design. Choose between kiss cut or full cut.",
      image: "/shape.jpg",
    },
  ];

  const cuttingOptions = [
    {
      name: "Soft Cutting",
      description:
        "Multiple stickers on a sheet. Easy peel, ideal for bulk designs.",
      image: "/soft.jpg",
    },
    {
      name: "Full Cutting (Die Cut)",
      description:
        "Individually cut stickers with precise edges. Premium finish.",
      image: "/diecut.jpg",
    },
  ];

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setError("");

    if (!selection.email || !selection.phone) {
      setError("Please fill in all details");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("category", selection.category);
      formData.append("type", selection.type);
      formData.append("cutting", selection.cutting);
      formData.append("email", selection.email);
      formData.append("phone", selection.phone);

      if (selection.file) {
        formData.append("file", selection.file);
      }

      // ✅ CORRECT FOR VERCEL
      const res = await fetch("/api/send", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();

      setShowPopup(true);
    } catch {
      setError("Something went wrong. Try again.");
    }

    setSubmitting(false);
  };

  const renderOption = (item: any, value: string, keyName: string) => {
    const isSelected = value === item.name;

    return (
      <div key={item.name} className="group">
        <button
          onClick={() => {
            setSelection({ ...selection, [keyName]: item.name });
            setCurrentBg(item.image);
          }}
          className={`w-full py-2.5 px-3 rounded-2xl transition-all duration-300 transform
            ${
              isSelected
                ? "bg-[#d2b48c] text-white shadow-md scale-[1.02]"
                : "bg-white/60 text-neutral-700 border border-white/50 hover:bg-white/80 hover:shadow-sm"
            }
          `}
        >
          {item.name}
        </button>

        {/* ❌ IMAGE REMOVED */}

        {/* TEXT */}
        <p
          className={`
            text-xs text-neutral-600 mt-1 overflow-hidden transition-all duration-500 ease-in-out
            ${isSelected ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}
            md:max-h-0 md:opacity-0 md:group-hover:max-h-20 md:group-hover:opacity-100
          `}
        >
          {item.description}
        </p>
      </div>
    );
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
        style={{ backgroundImage: "url('/bg.png')" }}
      />

      {currentBg && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url('${currentBg}')` }}
        />
      )}

      <div
        className={`absolute inset-0 transition-all duration-500 ${
          currentBg ? "bg-black/20" : "bg-white/40"
        }`}
      />

      <div className="relative bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl px-6 py-5 w-full max-w-md md:max-w-lg text-center shadow-xl shadow-black/10 transition-all duration-500">

        <h1 className="text-xl md:text-2xl text-neutral-800 mb-2 font-medium tracking-tight">
          Build Your Sticker
        </h1>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <p className="text-neutral-500 mb-3">Choose Category</p>
            <div className="space-y-2 mb-4">
              {categories.map((item) =>
                renderOption(item, selection.category, "category")
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={!selection.category}
              className="px-6 py-2 bg-[#d2b48c] text-white rounded-full shadow-md hover:shadow-lg transition disabled:opacity-40"
            >
              Next
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <p className="text-neutral-500 mb-3">Choose Type</p>

            <div className="space-y-2 mb-4">
              {types.map((item) =>
                renderOption(item, selection.type, "type")
              )}
            </div>

            <div className="flex justify-between">
              <button onClick={handleBack} className="px-4 py-2 border border-white/40 text-neutral-700 rounded">
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={!selection.type}
                className="px-4 py-2 bg-[#d2b48c] text-white rounded shadow-sm hover:shadow-md transition disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <p className="text-neutral-500 mb-3">Choose Cutting</p>

            <div className="space-y-2 mb-4">
              {cuttingOptions.map((item) =>
                renderOption(item, selection.cutting, "cutting")
              )}
            </div>

            <div className="flex justify-between">
              <button onClick={handleBack} className="px-4 py-2 border border-white/40 text-neutral-700 rounded">
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={!selection.cutting}
                className="px-4 py-2 bg-[#d2b48c] text-white rounded shadow-sm hover:shadow-md transition disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <p className="text-neutral-500 mb-3">Upload Design</p>

            {/* ✅ BUTTON STYLE FILE INPUT */}
            <label className="block w-full mb-3">
            <span className="block w-full py-3 px-4 text-center bg-[#e6b98a] text-black border border-[#d9a977] rounded-xl cursor-pointer hover:bg-[#d9a977] shadow-sm font-medium">
                {selection.file ? selection.file.name : "Browse File"}
              </span>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) =>
                  setSelection({
                    ...selection,
                    file: e.target.files?.[0] || null,
                  })
                }
                className="hidden"
              />
            </label>

            <div className="flex justify-between">
              <button onClick={handleBack} className="px-4 py-2 border border-white/40 text-neutral-700 rounded">
                Back
              </button>

              <button onClick={handleNext} className="px-4 py-2 bg-[#d2b48c] text-white rounded shadow-sm">
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <>
            <p className="text-neutral-500 mb-3">Summary</p>

            <div className="text-neutral-700 mb-4 space-y-1 text-sm">
              <p>Category: {selection.category}</p>
              <p>Type: {selection.type}</p>
              <p>Cutting: {selection.cutting}</p>
              <p>File: {selection.file ? selection.file.name : "None"}</p>
            </div>

            <div className="flex justify-between">
              <button onClick={handleBack}>Back</button>
              <button onClick={handleNext}>Next</button>
            </div>
          </>
        )}

        {/* STEP 6 */}
        {step === 6 && (
          <>
            <p className="text-neutral-500 mb-3">Your Details</p>

            {error && <p className="text-red-400 mb-2">{error}</p>}

            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setSelection({ ...selection, email: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-white/80 text-neutral-800 mb-3 border border-white/60"
            />

            <input
              type="text"
              placeholder="Phone"
              onChange={(e) =>
                setSelection({ ...selection, phone: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-white/80 text-neutral-800 mb-4 border border-white/60"
            />

            <div className="flex justify-between">
              <button onClick={handleBack}>Back</button>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-4 py-2 bg-[#d2b48c] text-white rounded"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl text-center shadow-lg">
            <p className="text-neutral-700 mb-4">
              Order submitted successfully!
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-[#d2b48c] text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}