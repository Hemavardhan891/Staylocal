'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ListPG() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    category: 'Boys',
    description: '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create local preview
    }
  };

  const handleUpload = async () => {
    if (!imageFile) return 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800';
    const filePath = `${Math.random()}.${imageFile.name.split('.').pop()}`;
    const { error } = await supabase.storage.from('pg-images').upload(filePath, imageFile);
    if (error) return 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800';
    const { data } = supabase.storage.from('pg-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const publicUrl = await handleUpload();
      const { error } = await supabase.from('pgs').insert([
        { ...formData, price: parseInt(formData.price), image_url: publicUrl, rating: 4.5 }
      ]);
      if (error) throw error;
      alert("🎉 Property Listed Successfully!");
      router.push('/');
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-20 px-6 flex justify-center items-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl w-full bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border border-slate-100">
        <h1 className="text-5xl font-black text-slate-900 mb-2 tracking-tighter italic text-center">List Your PG.</h1>
        <p className="text-blue-600 font-black text-center uppercase tracking-widest text-[10px] mb-12">All fields must be bold and visible</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* HIGH VISIBILITY IMAGE SELECTOR */}
          <div className="relative group h-64 bg-slate-100 rounded-[3rem] overflow-hidden border-4 border-dashed border-slate-200 flex flex-col items-center justify-center hover:border-blue-400 transition-all cursor-pointer">
            {previewUrl ? (
              <img src={previewUrl} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
            ) : (
              <div className="text-center">
                <span className="text-5xl block mb-2">📸</span>
                <p className="text-slate-900 font-black uppercase tracking-widest text-xs">Tap to Upload Photo</p>
              </div>
            )}
            <input required type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] ml-4 mb-2 block">PG Name</label>
              <input required className="w-full p-6 bg-slate-100 rounded-[2rem] font-black text-slate-900 outline-none border-2 border-transparent focus:border-blue-600 transition-all" placeholder="Enter Property Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] ml-4 mb-2 block">Location</label>
                <input required className="w-full p-6 bg-slate-100 rounded-[2rem] font-black text-slate-900 outline-none border-2 border-transparent focus:border-blue-600 transition-all" placeholder="City or Colony" onChange={(e) => setFormData({...formData, location: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] ml-4 mb-2 block">Monthly Rent</label>
                <input required type="number" className="w-full p-6 bg-slate-100 rounded-[2rem] font-black text-slate-900 outline-none border-2 border-transparent focus:border-blue-600 transition-all" placeholder="Amount in ₹" onChange={(e) => setFormData({...formData, price: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] ml-4 mb-2 block">Category</label>
              <select className="w-full p-6 bg-slate-100 rounded-[2rem] font-black text-slate-900 outline-none border-2 border-transparent focus:border-blue-600 transition-all appearance-none" onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option>Boys PG</option>
                <option>Girls PG</option>
                <option>Co-living</option>
              </select>
            </div>
          </div>

          <button disabled={loading} className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-xl hover:bg-blue-600 transition-all shadow-xl shadow-blue-100 uppercase tracking-widest">
            {loading ? 'Processing Upload...' : 'Publish Listing'}
          </button>
        </form>
      </motion.div>
    </main>
  );
}