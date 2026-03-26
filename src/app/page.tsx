'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const cities = [
    { name: 'Bangalore', img: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600', tag: 'Tech Hub' },
    { name: 'Chennai', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600', tag: 'Automobile' },
    { name: 'Hyderabad', img: 'https://images.unsplash.com/photo-1510009489794-352fba39a0b8?w=600', tag: 'HITEC City' },
    { name: 'Pune', img: 'https://images.unsplash.com/photo-1565214975484-3cfa9e56f914?w=600', tag: 'Education' },
    { name: 'Mumbai', img: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600', tag: 'Financial' },
    { name: 'Delhi', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600', tag: 'NCR' },
    { name: 'Kolkata', img: 'https://images.unsplash.com/photo-1558431382-bb7b38c49051?w=600', tag: 'Cultural' },
    { name: 'Ahmedabad', img: 'https://images.unsplash.com/photo-1623150502742-6a849aa94be4?w=600', tag: 'Business' }
  ];

  const handleSearch = async (city?: string) => {
    const query = city || searchTerm;
    setLoading(true);
    const { data } = await supabase.from('pgs').select('*').ilike('location', `%${query}%`);
    
    // Fallback if empty
    if (!data || data.length === 0) {
      setResults([{ 
        name: `Best PGs in ${query}`, 
        location: 'Verified on Google', 
        isGoogle: true, 
        url: `https://www.google.com/maps/search/PG+hostels+in+${query}` 
      }]);
    } else { setResults(data); }
    setLoading(false);
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white selection:bg-blue-200">
      {/* Animated Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 0.4 }} transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1920" className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="relative z-10 text-center px-6">
          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter">
            Stay<span className="text-blue-500">Local.</span>
          </motion.h1>
          <div className="flex bg-white/10 backdrop-blur-md p-3 rounded-[3rem] border border-white/20 max-w-3xl mx-auto shadow-2xl">
            <input 
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-8 py-4 bg-white rounded-[2.5rem] text-slate-900 outline-none font-bold text-lg" 
              placeholder="Search Area, Colony or College..." 
            />
            <button onClick={() => handleSearch()} className="bg-blue-600 text-white px-12 rounded-[2.5rem] font-black text-lg hover:scale-105 transition-all">Search</button>
          </div>
        </div>
      </section>

      {/* 8-City Interactive Grid */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <h2 className="text-4xl font-black mb-12 text-slate-900">Explore Top Hubs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cities.map((city, i) => (
            <motion.div
              key={city.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -15, scale: 1.02 }}
              onClick={() => handleSearch(city.name)}
              className="relative h-96 rounded-[3rem] overflow-hidden cursor-pointer shadow-xl group"
            >
              <img src={city.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-8 left-8">
                <p className="text-blue-400 font-black uppercase text-[10px] tracking-widest mb-2">{city.tag}</p>
                <h3 className="text-3xl font-black text-white">{city.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Search Results Display */}
      <section id="results" className="py-24 bg-slate-50 min-h-[50vh] px-6">
        <div className="max-w-7xl mx-auto">
          {results.length > 0 && <h2 className="text-4xl font-black mb-12">Results for {searchTerm}</h2>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {results.map((pg, i) => (
              <motion.div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <h3 className="text-2xl font-black mb-2">{pg.name}</h3>
                <p className="text-slate-400 font-bold mb-6 italic">{pg.location}</p>
                {pg.isGoogle ? (
                  <a href={pg.url} target="_blank" className="inline-block bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs">Explore Google</a>
                ) : (
                  <p className="text-blue-600 font-black text-xl">₹{pg.price}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}