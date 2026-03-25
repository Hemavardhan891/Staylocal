// src/app/list-your-pg/page.tsx
'use client';

import { useState } from 'react';
import SEO from '@/components/SEO';

export default function ListYourPG() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this is where you'd send data to your database (Supabase/Firebase)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl text-center border">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Sent!</h2>
          <p className="text-gray-500 mb-8">
            Thank you for choosing Gharpayy. Our team will visit your property within 24 hours for verification.
          </p>
          <a href="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <SEO 
        title="List Your PG | Partner with Gharpayy" 
        description="Are you a PG owner? List your property on Gharpayy and get verified leads with zero commission." 
        location="India"
      />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Grow Your PG Business</h1>
          <p className="text-gray-500">Fill in the details below to start your verification process.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border p-8 md:p-12 space-y-8">
          {/* Section 1: Basic Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Property Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">PG Name</label>
                <input required type="text" placeholder="e.g. Zolo Stays" className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Locality</label>
                <input required type="text" placeholder="e.g. HSR Layout" className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Gender */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Pricing & Category
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Monthly Rent (Starts at)</label>
                <input required type="number" placeholder="₹" className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">PG Category</label>
                <select className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-blue-500">
                  <option>Boys Only</option>
                  <option>Girls Only</option>
                  <option>Unisex</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Amenities */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
              Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['WiFi', 'Food', 'AC', 'Laundry', 'Parking', 'CCTV'].map((item) => (
                <label key={item} className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" className="w-5 h-5 accent-blue-600" />
                  <span className="font-medium text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100">
            Submit Property for Verification
          </button>
        </form>
      </div>
    </main>
  );
}