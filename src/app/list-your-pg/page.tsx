'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ListPG() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    category: 'Boys',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ensure the table name 'pgs' and column names match your Supabase exactly
      const { data, error } = await supabase
        .from('pgs')
        .insert([
          { 
            name: formData.name, 
            location: formData.location, 
            price: parseInt(formData.price), // Converting to number
            category: formData.category,
            description: formData.description,
            // Using a high-quality default image if user hasn't uploaded one
            image_url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'
          }
        ]);

      if (error) throw error;

      alert("🎉 Property listed successfully!");
      router.push('/'); // Redirect to dashboard
      
    } catch (error: any) {
      console.error("Submission Error:", error);
      alert("Error: " + error.message + ". Check if RLS policies are enabled in Supabase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100"
      >
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">List Your <span className="text-blue-600">Property.</span></h1>
          <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">Join the 3x Growth Network</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2 ml-2">PG Name</label>
            <input 
              required
              className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold text-slate-900"
              placeholder="e.g. Royal Executive PG"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2 ml-2">Locality / Area</label>
              <input 
                required
                className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold"
                placeholder="e.g. OMR, Chennai"
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2 ml-2">Monthly Rent (₹)</label>
              <input 
                required type="number"
                className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold"
                placeholder="8500"
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2 ml-2">Category</label>
            <select 
              className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold appearance-none"
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option>Boys</option>
              <option>Girls</option>
              <option>Co-living</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2 ml-2">Description</label>
            <textarea 
              rows={4}
              className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold"
              placeholder="Tell us about the amenities (WiFi, Food, AC...)"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-lg hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
          >
            {loading ? 'Processing...' : 'Submit Listing'}
          </button>
        </form>
      </motion.div>
    </main>
  );
}