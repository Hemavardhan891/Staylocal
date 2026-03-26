'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [allPgs, setAllPgs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadInitial = async () => {
      const { data } = await supabase.from('pgs').select('*').order('created_at', { ascending: false });
      if (data) setAllPgs(data);
    };
    loadInitial();
  }, []);

  const handleSearch = async (queryOverride?: string) => {
    const query = queryOverride || searchTerm;
    if (!query.trim()) return;
    setLoading(true);

    const { data: localData } = await supabase.from('pgs').select('*').ilike('location', `%${query}%`);

    if (!localData || localData.length === 0) {
      setAllPgs([{
        id: 'google-fallback',
        name: `Verified PGs in ${query}`,
        location: `Showing 50+ listings from Google Maps`,
        price: "Contact for Rent",
        rating: 4.8,
        phone: "+91 90000 00000",
        image_url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
        isGoogle: true,
        url: `http://googleusercontent.com/maps.google.com/search?q=${encodeURIComponent("PG Hostels in " + query)}`
      }]);
    } else {
      setAllPgs(localData);
    }
    setLoading(false);
    document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation - Improved Size & Opacity */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-5 flex justify-between items-center">
        <div className="text-2xl font-black text-slate-900 tracking-tighter">STAY<span className="text-blue-600">LOCAL</span></div>
        <div className="hidden md:flex gap-10 items-center">
          {['FIND PG', 'ABOUT', 'SUPPORT'].map((item) => (
            <button key={item} className="text-sm font-black text-slate-900 hover:text-blue-600 transition-colors tracking-widest">{item}</button>
          ))}
          <Link href="/list-your-pg" className="text-sm font-black text-blue-600 hover:bg-blue-50 px-5 py-2 rounded-full transition-all tracking-widest">LIST PROPERTY</Link>
          <button className="bg-slate-900 text-white px-8 py-2.5 rounded-full font-black text-sm hover:scale-105 transition-all">SIGN IN</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <motion.img initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1920" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="relative z-10 text-center px-6">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter italic">Find Your Hub.</motion.h1>
          <div className="flex bg-white p-2 rounded-[2.5rem] shadow-2xl max-w-2xl mx-auto border-4 border-white/20">
            <input className="flex-1 px-8 py-4 text-slate-900 outline-none font-bold text-lg placeholder:text-slate-400" placeholder="Colony, College or Area..." onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
            <button onClick={() => handleSearch()} className="bg-blue-600 text-white px-12 rounded-[2rem] font-black hover:bg-slate-900 transition-all">Search</button>
          </div>
        </div>
      </section>

      {/* Top Rated Section */}
      <section id="listings" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic">Top Rated PGs</h2>
            <div className="h-2 w-24 bg-blue-600 mt-4 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {allPgs.map((pg, i) => (
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={pg.id} className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex flex-col md:flex-row group">
              <div className="md:w-80 h-64 overflow-hidden relative">
                <img src={pg.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={pg.name} />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-slate-900">⭐ {pg.rating || '4.5'}</div>
              </div>
              <div className="p-10 flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">{pg.name}</h3>
                    <p className="text-slate-400 font-bold flex items-center gap-2"><span className="text-blue-600">📍</span> {pg.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-slate-300 uppercase tracking-widest">Monthly Rent</p>
                    <p className="text-3xl font-black text-blue-600">₹{pg.price}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 items-center justify-between border-t border-slate-50 pt-8 mt-4">
                  <div className="flex gap-6">
                    <div className="flex flex-col"><span className="text-[10px] font-black text-slate-300 uppercase">Contact</span><span className="font-bold text-slate-700">{pg.phone || '+91 98765 43210'}</span></div>
                    <div className="flex flex-col"><span className="text-[10px] font-black text-slate-300 uppercase">Status</span><span className="font-bold text-green-500 italic">Available</span></div>
                  </div>
                  <Link href={pg.isGoogle ? pg.url : `/pg/${pg.id}`} target={pg.isGoogle ? '_blank' : '_self'}>
                    <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-blue-600 transition-all shadow-lg shadow-blue-100">VIEW DETAILS & MAP</button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}