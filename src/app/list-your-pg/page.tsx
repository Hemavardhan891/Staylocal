'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ListPG() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({ name: '', location: '', price: '', category: 'Boys', description: '', phone: '' });

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
      const url = await handleUpload();
      const { error } = await supabase.from('pgs').insert([{ ...formData, price: parseInt(formData.price), image_url: url, rating: 4.5 }]);
      if (error) throw error;
      alert("Property Listed!");
      router.push('/');
    } catch (err: any) { alert(err.message); }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-32 px-6 flex justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl w-full bg-white p-12 rounded-[4rem] shadow-2xl border border-slate-100">
        <h1 className="text-5xl font-black text-slate-900 mb-2 tracking-tighter italic">List Property.</h1>
        <p className="text-blue-600 font-black tracking-widest uppercase text-xs mb-12">Submit your details to go live</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* High Visibility Image Dropzone */}
          <div className="relative group h-64 bg-slate-50 border-4 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center hover:border-blue-200 transition-all cursor-pointer">
            <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} />
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📸</div>
            <p className="text-slate-900 font-black text-lg tracking-tight">{imageFile ? imageFile.name : 'Upload PG Hero Photo'}</p>
            <p className="text-slate-400 font-bold text-sm">PNG, JPG or JPEG (Max 5MB)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input required className="w-full p-6 bg-slate-50 rounded-[2rem] font-black text-slate-900 outline-none focus:ring-4 ring-blue-50" placeholder="PG Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <input required className="w-full p-6 bg-slate-50 rounded-[2rem] font-black text-slate-900 outline-none focus:ring-4 ring-blue-50" placeholder="Locality (e.g. OMR, Chennai)" onChange={(e) => setFormData({...formData, location: e.target.value})} />
            <input required type="number" className="w-full p-6 bg-slate-50 rounded-[2rem] font-black text-slate-900 outline-none focus:ring-4 ring-blue-50" placeholder="Monthly Rent (₹)" onChange={(e) => setFormData({...formData, price: e.target.value})} />
            <input required type="tel" className="w-full p-6 bg-slate-50 rounded-[2rem] font-black text-slate-900 outline-none focus:ring-4 ring-blue-50" placeholder="Phone Number" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          </div>

          <button disabled={loading} className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-xl hover:bg-blue-600 transition-all shadow-2xl shadow-blue-100 uppercase tracking-widest">
            {loading ? 'Processing...' : 'Submit Listing'}
          </button>
        </form>
      </motion.div>
    </main>
  );
}