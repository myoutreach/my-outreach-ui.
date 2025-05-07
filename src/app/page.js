"use client";
import { useState } from "react";

export default function HomePage() {
  const [industry, setIndustry] = useState("");
  const [position, setPosition] = useState("");
  const [offer, setOffer]     = useState("");
  const [message, setMessage] = useState("");
  const [error, setError]     = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry, position, offer }),
      });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setError("Chyba pri generovaní: " + err.message);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">My Outreach Generator</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Industry</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="finanční poradcovia"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Position</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="CEO"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Offer</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            placeholder="zvýšenie cashflow o 20 %"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Generate
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {message && (
        <div className="mt-6 p-4 bg-gray-100 rounded whitespace-pre-wrap">
          {message}
        </div>
      )}
    </main>
  );
}
