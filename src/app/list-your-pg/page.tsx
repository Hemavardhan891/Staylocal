// src/app/list-your-pg/page.tsx
'use client';

import { useState } from 'react';
import SEO from '@/components/SEO';
import { supabase } from '@/lib/supabase'; // Ensure this file exists in src/lib/supabase.ts

export default function ListYourPG() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    gender: 'Boys',
    image_url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=500'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Sending data to Supabase
    const { data, error } = await supabase
      .from('pgs')
      .insert([
        { 
          name: formData.name, 
          location: formData.location, 
          price: parseInt(formData.price), 
          gender: formData.gender,
          image_url: formData.image_url
        }
      ]);

    if (error) {
      console.error('Error inserting data:', error.message);
      alert('Error submitting form. Check console.');
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl text-center border">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">PG Listed!</h2>
          <p className="text-gray-500 mb-8">Your PG has been successfully added to our database.</p>
          <a href="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <SEO title="List Your PG | StayLocal" description="Add your PG to our network." location="India" />

      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border p-8 md:p-12 space-y-8">
          <h1 className="text-3xl font-black text-gray-900">List Your Property</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">PG Name</label>
              <input 
                required 
                type="text" 
                className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-blue-500 text-black" 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Locality</label>
              <input 
                required 
                type="text" 
                className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-blue-500 text-black" 
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Monthly Rent (₹)</label>
              <input 
                required 
                type="number" 
                className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-blue-500 text-black" 
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Category</label>
              <select 
                className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-blue-500 text-black"
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
              >
                <option value="Boys">Boys Only</option>
                <option value="Girls">Girls Only</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Submitting...' : 'Submit Property'}
          </button>
        </form>
      </div>
    </main>
  );
}