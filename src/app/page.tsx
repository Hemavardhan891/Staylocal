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

  // 1. Load Featured PGs on startup
  useEffect(() => {
    const loadInitial = async () => {
      const { data } = await supabase.from('pgs').select('*').limit(3);
      if (data) setAllPgs(data);
    };
    loadInitial();
  }, []);

  // 2. The Hybrid Search Function
  const handleSearch = async (overrideValue?: string) => {
    const query = overrideValue || searchTerm;
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    if (overrideValue) setSearchTerm(overrideValue);

    try {
      // Step A: Search your Database (Supabase)
      const { data: localData, error } = await supabase
        .from('pgs')
        .select('*')
        .ilike('location', `%${query}%`);

      if (error) throw error;

      // Step B: Logic to show Listed vs Non-Listed (Google)
      if (localData && localData.length > 0) {
        // Show your own database results
        setAllPgs(localData);
      } else {
        // FALLBACK: Show Google Maps search directly
        const googleLink = `https://www.google.com/maps/search/PG+hostels+in+${encodeURIComponent(query)}`;
        
        setAllPgs([{
          id: 'google-fallback',
          name: `Top PGs in ${query}`,
          location: `We are currently verifying local PGs here. Click to see 50+ listings on Google Maps.`,
          price: "Live Rates",
          image_url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
          isGoogle: true,
          url: googleLink
        }]);
      }
    } catch (err) {
      console.error("Search Error:", err);
    } finally {
      setLoading(false);
      setTimeout(() => {
        document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

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

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1920" 
          className="absolute inset-0 w-full h-full object-cover opacity-30" 
        />
        <div className="relative z-10 text-center px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter">
            Stay<span className="text-blue-600">Local.</span>
          </motion.h1>
          <div className="flex flex-col md:flex-row bg-white/10 backdrop-blur-xl p-2 rounded-[2.5rem] border border-white/20 shadow-2xl max-w-2xl mx-auto">
            <input 
              className="flex-1 px-8 py-5 bg-white rounded-[2rem] text-slate-900 outline-none font-bold text-lg" 
              placeholder="Search Area, Colony or College..."
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={() => handleSearch()} className="bg-blue-600 text-white px-10 rounded-[2rem] font-black hover:bg-white hover:text-blue-600 transition-all">Search</button>
          </div>
        </div>
      </section>

      {/* 8-City Interactive Grid */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <h2 className="text-4xl font-black text-slate-900 mb-12">Popular Student Hubs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cities.map((city, i) => (
            <motion.div
              key={city.name}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => handleSearch(city.name)}
              className="relative h-80 rounded-[3rem] overflow-hidden cursor-pointer shadow-xl group"
            >
              <img src={city.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
              <div className="absolute bottom-8 left-8">
                <p className="text-blue-400 font-black uppercase text-[10px] tracking-widest mb-1">{city.tag}</p>
                <h3 className="text-2xl font-black text-white">{city.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Results Section */}
      <section id="listings" className="py-24 bg-slate-50 min-h-[40vh] px-6">
        <div className="max-w-7xl mx-auto">
          {hasSearched && <h2 className="text-3xl font-black mb-12">Found in {searchTerm}</h2>}
          
          {loading ? (
            <div className="text-center py-20 animate-pulse font-black text-blue-600">AI Searching Database & Google...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <AnimatePresence>
                {allPgs.map((pg) => (
                  <motion.div key={pg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 group">
                    <div className="h-60 relative">
                      <img src={pg.image_url} className="w-full h-full object-cover" />
                      <div className={`absolute top-4 left-4 px-4 py-1 rounded-full text-[10px] font-black uppercase ${pg.isGoogle ? 'bg-white text-slate-900' : 'bg-blue-600 text-white'}`}>
                        {pg.isGoogle ? 'Google Search' : 'StayLocal Verified'}
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-black text-slate-900 mb-1">{pg.name}</h3>
                      <p className="text-slate-400 text-sm font-bold mb-6 truncate">{pg.location}</p>
                      <div className="flex justify-between items-center border-t pt-6">
                        <span className="text-xl font-black text-blue-600">{pg.isGoogle ? "Check Maps" : `₹${pg.price}`}</span>
                        {pg.isGoogle ? (
                          <a href={pg.url} target="_blank" className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-black">Explore Google</a>
                        ) : (
                          <Link href={`/pg/${pg.id}`} className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-black">Details</Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}