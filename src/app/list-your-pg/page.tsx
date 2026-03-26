'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ListPG() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    category: 'Boys',
    description: '',
  });

  const handleUpload = async () => {
    if (!imageFile) return 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800';

    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload to Supabase Storage Bucket 'pg-images'
    const { error: uploadError } = await supabase.storage
      .from('pg-images')
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error(uploadError);
      return 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800';
    }

    // Get the Public URL
    const { data } = supabase.storage.from('pg-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const publicImageUrl = await handleUpload();

      const { error } = await supabase
        .from('pgs')
        .insert([
          { 
            name: formData.name, 
            location: formData.location, 
            price: parseInt(formData.price), 
            category: formData.category,
            description: formData.description,
            image_url: publicImageUrl
          }
        ]);

      if (error) throw error;

      alert("🎉 Property & Image Uploaded Successfully!");
      router.push('/');
      
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-20 px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto bg-white p-12 rounded-[3rem] shadow-2xl">
        <h1 className="text-4xl font-black text-slate-900 mb-10 text-center">List Your <span className="text-blue-600">PG.</span></h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Picker */}
          <div className="p-10 border-4 border-dashed border-slate-100 rounded-[2rem] text-center hover:border-blue-200 transition-all cursor-pointer relative">
            <input 
              type="file" accept="image/*" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
            />
            <p className="font-black text-slate-400">
              {imageFile ? `📸 ${imageFile.name}` : "Click to Upload PG Photo"}
            </p>
          </div>

          <input required className="w-full p-5 bg-slate-50 rounded-2xl font-bold" placeholder="PG Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          
          <div className="grid grid-cols-2 gap-4">
            <input required className="w-full p-5 bg-slate-50 rounded-2xl font-bold" placeholder="Area / Locality" onChange={(e) => setFormData({...formData, location: e.target.value})} />
            <input required type="number" className="w-full p-5 bg-slate-50 rounded-2xl font-bold" placeholder="Rent (₹)" onChange={(e) => setFormData({...formData, price: e.target.value})} />
          </div>

          <select className="w-full p-5 bg-slate-50 rounded-2xl font-bold" onChange={(e) => setFormData({...formData, category: e.target.value})}>
            <option>Boys</option>
            <option>Girls</option>
            <option>Co-living</option>
          </select>

          <textarea rows={3} className="w-full p-5 bg-slate-50 rounded-2xl font-bold" placeholder="Amenities..." onChange={(e) => setFormData({...formData, description: e.target.value})} />

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black text-lg hover:bg-slate-900 transition-all">
            {loading ? 'Uploading Data...' : 'Submit Listing'}
          </button>
        </form>
      </motion.div>
    </main>
  );
}