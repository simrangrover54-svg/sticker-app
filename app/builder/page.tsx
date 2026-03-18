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

  // DATA
  const categories = [
    {
      name: "Paper Sticker",
      description:
        "Affordable and eco-friendly. Perfect for packaging, labels, gifting, and indoor use.",
    },
    {
      name: "PP Non-Tearable Sticker",
      description:
        "Durable, tear-resistant stickers for outdoor use like cars, laptops, helmets, and gear.",
    },
    {
      name: "Clear Film Screen Printed Sticker",
      description:
        "Premium transparent stickers with long-lasting ink protection. Clean and minimal look.",
    },
  ];

  const types = [
    {
      name: "Square/Rectangle",
      description:
        "Simple machine-cut shapes. Clean, fast, and cost-effective.",
    },
    {
      name: "Shape Cut",
      description:
        "Custom cut around your design. Choose between kiss cut or full cut.",
    },
  ];

  const cuttingOptions = [
    {
      name: "Soft Cutting",
      description:
        "Multiple stickers on a sheet. Easy peel, ideal for bulk designs.",
    },
    {
      name: "Full Cutting (Die Cut)",
      description:
        "Individually cut stickers with precise edges. Premium finish.",
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
          onClick={() =>
            setSelection({ ...selection, [keyName]: item.name })
          }
          className={`w-full p-3 rounded-xl transition transform hover:scale-105 ${
            isSelected
              ? "bg-white text-black"
              : "bg-neutral-800 text-white"
          }`}
        >
          {item.name}
        </button>

        <p
          className={`text-xs text-gray-400 mt-1 transition ${
            isSelected
              ? "block"
              : "hidden md:block md:opacity-0 md:group-hover:opacity-100"
          }`}
        >
          {item.description}
        </p>
      </div>
    );
  };

  return (
    <main
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative bg-neutral-900/80 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md text-center shadow-2xl">
        <h1 className="text-2xl text-white mb-6">
          Build Your Sticker
        </h1>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <p className="text-gray-300 mb-4">Choose Category</p>

            <div className="space-y-3 mb-6">
              {categories.map((item) =>
                renderOption(item, selection.category, "category")
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={!selection.category}
              className="px-6 py-2 bg-white text-black rounded-full disabled:opacity-40"
            >
              Next
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <p className="text-gray-300 mb-4">Choose Type</p>

            <div className="space-y-3 mb-6">
              {types.map((item) =>
                renderOption(item, selection.type, "type")
              )}
            </div>

            <div className="flex justify-between">
              <button onClick={handleBack} className="px-4 py-2 border text-white rounded">
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={!selection.type}
                className="px-4 py-2 bg-white text-black rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <p className="text-gray-300 mb-4">Choose Cutting</p>

            <div className="space-y-3 mb-6">
              {cuttingOptions.map((item) =>
                renderOption(item, selection.cutting, "cutting")
              )}
            </div>

            <div className="flex justify-between">
              <button onClick={handleBack} className="px-4 py-2 border text-white rounded">
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={!selection.cutting}
                className="px-4 py-2 bg-white text-black rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <p className="text-gray-300 mb-4">Upload Design</p>

            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) =>
                setSelection({
                  ...selection,
                  file: e.target.files?.[0] || null,
                })
              }
              className="w-full text-white mb-4"
            />

            {selection.file && (
              <p className="text-sm text-gray-400 mb-4">
                {selection.file.name}
              </p>
            )}

            <div className="flex justify-between">
              <button onClick={handleBack} className="px-4 py-2 border text-white rounded">
                Back
              </button>

              <button onClick={handleNext} className="px-4 py-2 bg-white text-black rounded">
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <>
            <p className="text-gray-300 mb-4">Summary</p>

            <div className="text-white mb-6 space-y-2">
              <p>Category: {selection.category}</p>
              <p>Type: {selection.type}</p>
              <p>Cutting: {selection.cutting}</p>
              <p>File: {selection.file ? selection.file.name : "None"}</p>
            </div>

            <div className="flex justify-between">
              <button onClick={handleBack} className="px-4 py-2 border text-white rounded">
                Back
              </button>

              <button onClick={handleNext} className="px-4 py-2 bg-white text-black rounded">
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 6 */}
        {step === 6 && (
          <>
            <p className="text-gray-300 mb-4">Your Details</p>

            {error && <p className="text-red-400 mb-2">{error}</p>}

            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setSelection({ ...selection, email: e.target.value })
              }
              className="w-full p-3 rounded bg-neutral-800 text-white mb-3"
            />

            <input
              type="text"
              placeholder="Phone"
              onChange={(e) =>
                setSelection({ ...selection, phone: e.target.value })
              }
              className="w-full p-3 rounded bg-neutral-800 text-white mb-4"
            />

            <div className="flex justify-between">
              <button onClick={handleBack} className="px-4 py-2 border text-white rounded">
                Back
              </button>

              <button
                onClick={handleSubmit}
                disabled={submitting || !selection.email || !selection.phone}
                className={`px-4 py-2 rounded ${
                  submitting || !selection.email || !selection.phone
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-white text-black"
                }`}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
          <div className="bg-white p-6 rounded-xl text-center shadow-xl">
            <p className="text-black mb-4 font-medium">
              Order submitted successfully!
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Close
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="px-4 py-2 border border-black rounded"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}