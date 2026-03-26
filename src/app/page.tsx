'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [allPgs, setAllPgs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // 1. Initial Load: Get featured PGs
  useEffect(() => {
    const loadData = async () => {
      const { data } = await supabase.from('pgs').select('*').limit(3);
      if (data) setAllPgs(data);
    };
    loadData();
  }, []);

  // 2. FIXED SEARCH FUNCTION (Supports Colony, College, and City)
  const handleSearch = async (overrideQuery?: string) => {
    const query = overrideQuery || searchTerm;
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    if (overrideQuery) setSearchTerm(overrideQuery);

    try {
      // Step A: Search Supabase first (Fuzzy search for Area/Colony/College)
      const { data: localData } = await supabase
        .from('pgs')
        .select('*')
        .or(`location.ilike.%${query}%,name.ilike.%${query}%`);

      // Step B: If Database is empty, create the Google Fallback Card
      if (!localData || localData.length === 0) {
        // FIXED URL: Using 'q' parameter correctly
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("PG Hostels in " + query)}`;
        
        setAllPgs([{
          id: 'google-card',
          name: `Best PGs near ${query}`,
          location: `View 50+ verified ratings and listings on Google Maps`,
          price: "Live Rates",
          image_url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
          isGoogle: true,
          url: googleMapsUrl
        }]);
      } else {
        setAllPgs(localData);
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
      // Smooth scroll to results section
      setTimeout(() => {
        document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const cities = [
    { name: 'Bangalore', tag: 'Tech Hub', img: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600', color: 'bg-blue-600' },
    { name: 'Chennai', tag: 'Automobile Hub', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600', color: 'bg-orange-500' },
    { name: 'Hyderabad', tag: 'HITEC City', img: 'https://images.unsplash.com/photo-1510009489794-352fba39a0b8?w=600', color: 'bg-emerald-500' },
    { name: 'Pune', tag: 'Education Hub', img: 'https://images.unsplash.com/photo-1565214975484-3cfa9e56f914?w=600', color: 'bg-purple-600' }
  ];

  return (
    <main className="min-h-screen bg-white">
      <SEO title="StayLocal | Premium Search" description="Find PGs in Colonies & Colleges." location="India" />

      {/* RESTORED HERO SECTION WITH PHOTO */}
      <section className="relative h-[75vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1920" 
          className="absolute inset-0 w-full h-full object-cover opacity-40" 
          alt="Premium Living"
        />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter"
          >
            StayLocal<span className="text-blue-500">.</span>
          </motion.h1>
          
          <div className="flex flex-col md:flex-row gap-2 bg-white p-3 rounded-[2.5rem] shadow-2xl max-w-2xl mx-auto">
            <input 
              type="text" value={searchTerm}
              className="flex-1 px-8 py-4 text-slate-900 outline-none font-bold text-lg"
              placeholder="Search Colony, College or City..."
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={() => handleSearch()} 
              className="bg-blue-600 hover:bg-slate-900 text-white px-12 py-4 rounded-2xl font-black text-lg transition-all"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* RESTORED CITY CARDS WITH PHOTOS & CLICK FUNCTIONS */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <h2 className="text-4xl font-black text-slate-900 mb-12">Popular Student Hubs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cities.map((city, i) => (
            <motion.div
              key={city.name}
              whileHover={{ scale: 1.05, y: -12 }}
              className="relative h-96 rounded-[3rem] overflow-hidden group cursor-pointer shadow-xl shadow-slate-100"
              onClick={() => handleSearch(city.name)} // CLICK TO SEARCH FUNCTION
            >
              <img src={city.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10">
                <div className={`w-10 h-1.5 ${city.color} mb-4 rounded-full`} />
                <p className="text-white/60 font-black uppercase tracking-[0.3em] text-[10px] mb-2">{city.tag}</p>
                <h3 className="text-3xl font-black text-white">{city.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SEARCH RESULTS SECTION */}
      <section id="listings" className="py-24 px-6 bg-slate-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-slate-900 mb-12">
            {hasSearched ? `Results for "${searchTerm}"` : 'Featured Properties'}
          </h2>

          {loading ? (
            <div className="flex flex-col items-center py-20">
              <div className="animate-spin h-12 w-12 border-t-4 border-blue-600 rounded-full mb-4" />
              <p className="font-black text-slate-900">Searching Areas...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <AnimatePresence>
                {allPgs.map((pg, i) => (
                  <motion.div 
                    key={pg.id || i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 group relative"
                  >
                    <div className="h-72 overflow-hidden relative">
                       <div className={`absolute top-6 left-6 z-20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${pg.isGoogle ? 'bg-white text-slate-900' : 'bg-blue-600 text-white'}`}>
                        {pg.isGoogle ? 'Google Direct' : 'Verified Stay'}
                      </div>
                      <img src={pg.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    </div>
                    <div className="p-10">
                      <h3 className="text-2xl font-black text-slate-900 mb-2 truncate">{pg.name}</h3>
                      <p className="text-slate-400 font-bold mb-10 text-sm leading-relaxed">{pg.location}</p>
                      <div className="flex justify-between items-center border-t pt-8">
                        <span className="text-2xl font-black text-blue-600">{pg.price}</span>
                        {pg.isGoogle ? (
                          <a href={pg.url} target="_blank" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
                             View on Google
                          </a>
                        ) : (
                          <Link href={`/pg/${pg.id}`} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
                             View Details
                          </Link>
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