'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [allPgs, setAllPgs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await supabase.from('pgs').select('*').limit(3);
      if (data) setAllPgs(data);
    };
    loadData();
  }, []);

  const handleSearch = async (overrideValue?: string) => {
    const query = overrideValue || searchTerm;
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    if (overrideValue) setSearchTerm(overrideValue);

    try {
      const { data: localData } = await supabase
        .from('pgs')
        .select('*')
        .or(`location.ilike.%${query}%,name.ilike.%${query}%`);

      if (!localData || localData.length === 0) {
        const googleLink = `http://googleusercontent.com/maps.google.com/search?q=${encodeURIComponent("PG Hostels in " + query)}`;
        setAllPgs([{
          id: 'google-result',
          name: `Top Rated PGs in ${query}`,
          location: `Verified maps and 50+ listings for ${query}`,
          price: "Inquiry",
          rating: 4.8,
          isGoogle: true,
          url: googleLink
        }]);
      } else {
        setAllPgs(localData);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
      setTimeout(() => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' }), 300);
    }
  };

  const cities = [
    { name: 'Bangalore', tag: 'Tech Hub', img: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600', color: 'bg-blue-600' },
    { name: 'Chennai', tag: 'Automobile', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600', color: 'bg-orange-500' },
    { name: 'Hyderabad', tag: 'HITEC City', img: 'https://images.unsplash.com/photo-1510009489794-352fba39a0b8?w=600', color: 'bg-emerald-500' },
    { name: 'Pune', tag: 'Education', img: 'https://images.unsplash.com/photo-1565214975484-3cfa9e56f914?w=600', color: 'bg-purple-600' },
    { name: 'Mumbai', tag: 'Financial', img: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600', color: 'bg-pink-600' },
    { name: 'Delhi', tag: 'NCR Region', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600', color: 'bg-red-600' },
    { name: 'Kolkata', tag: 'Cultural', img: 'https://s3.india.com/wp-content/uploads/2025/07/kolkata-DIY.jpg', color: 'bg-yellow-600' },
    { name: 'Ahmedabad', tag: 'Business', img: 'https://www.fabhotels.com/blog/wp-content/uploads/2019/05/Historical-Places-in-Ahmedabad_600.jpg', color: 'bg-teal-600' }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Support Chat Bubble */}
      <motion.div whileHover={{ scale: 1.1 }} className="fixed bottom-10 right-10 z-[100] cursor-pointer bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl animate-pulse text-2xl">💬</motion.div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-10 py-6 flex justify-between items-center">
        <div className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Stay<span className="text-blue-600">Local.</span></div>
        <div className="hidden md:flex gap-10 items-center">
          {['Find PG', 'About Us', 'Support'].map(i => <button key={i} className="text-xs font-black text-slate-900 uppercase tracking-widest">{i}</button>)}
          <Link href="/list-your-pg" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase shadow-lg">List Property</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[75vh] flex items-center justify-center bg-slate-900">
        <motion.img initial={{ scale: 1.1 }} animate={{ scale: 1 }} src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1920" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter italic">Find Your Hub.</h1>
          <div className="flex bg-white p-2 rounded-[2.5rem] shadow-2xl max-w-2xl mx-auto border-4 border-white/10">
            <input className="flex-1 px-8 py-4 text-slate-900 outline-none font-black text-lg placeholder:text-slate-400" placeholder="Area, Colony or College..." onChange={e => setSearchTerm(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} />
            <button onClick={() => handleSearch()} className="bg-blue-600 text-white px-10 rounded-[2rem] font-black hover:bg-slate-900 transition-all">Search</button>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[{l:'Verified PGs',v:'1,200+'}, {l:'Happy Students',v:'5,000+'}, {l:'Smart Cities',v:'8'}, {l:'Support',v:'24/7'}].map(s => (
            <div key={s.l} className="text-center">
              <p className="text-3xl font-black text-slate-900">{s.v}</p>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8-City Grid */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <h2 className="text-4xl font-black text-slate-900 mb-12 tracking-tighter italic">Top Student Hubs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cities.map((city, i) => (
            <motion.div key={city.name} whileHover={{ scale: 1.05, y: -10 }} onClick={() => handleSearch(city.name)} className="relative h-80 rounded-[3rem] overflow-hidden cursor-pointer shadow-xl group">
              <img src={city.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent text-white p-8 flex flex-col justify-end">
                <div className={`w-10 h-1.5 ${city.color} mb-3 rounded-full`} />
                <h3 className="text-2xl font-black uppercase italic">{city.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section id="listings" className="py-20 bg-slate-50 px-6 min-h-[40vh]">
        <div className="max-w-6xl mx-auto space-y-8">
          {allPgs.map((pg, i) => (
            <motion.div key={i} className="bg-white rounded-[3.5rem] overflow-hidden shadow-sm flex flex-col md:flex-row group border border-slate-100">
              <div className="md:w-96 h-64 overflow-hidden"><img src={pg.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" /></div>
              <div className="p-10 flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-6">
                  <div><h3 className="text-3xl font-black text-slate-900 tracking-tight">{pg.name}</h3><p className="text-slate-400 font-bold italic">📍 {pg.location}</p></div>
                  <div className="text-right"><p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Starts At</p><p className="text-3xl font-black text-blue-600">₹{pg.price}</p></div>
                </div>
                <div className="flex justify-between items-center border-t border-slate-50 pt-8 mt-2">
                  <div className="flex flex-col"><span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Status</span><span className="font-black text-green-600 text-lg uppercase">Verified Available ✅</span></div>
                  <Link href={pg.isGoogle ? pg.url : `/pg/${pg.id}`} target="_blank" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs hover:bg-blue-600 transition-all shadow-xl">VIEW ON MAPS</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}