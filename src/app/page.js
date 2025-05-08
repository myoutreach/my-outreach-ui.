"use client";
import { useState } from "react";

export default function HomePage() {
  const [industry, setIndustry] = useState("");
  const [position, setPosition] = useState("");
  const [offer, setOffer] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry, position, offer }),
      });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const { message: raw } = await res.json();
      setMessage(raw);
    } catch (err) {
      setError(`Chyba pri generovaní: ${err.message}`);
    }
  };

  return (
    <main className="max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">My Outreach Generator</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Industry</label>
          <input
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label>Position</label>
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label>Offer</label>
          <input
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
          />
        </div>
        <button type="submit">Generate</button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {message && <pre>{message}</pre>}
    </main>
  );
}
