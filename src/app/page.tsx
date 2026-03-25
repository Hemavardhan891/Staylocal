'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import SEO from '../components/SEO';
import { supabase } from '@/lib/supabase';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
  })
};

export default function Home() {
  const [allPgs, setAllPgs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Initial Data
  useEffect(() => {
    const loadInitial = async () => {
      const { data } = await supabase.from('pgs').select('*').limit(4);
      if (data) setAllPgs(data);
    };
    loadInitial();
  }, []);

  const handleSearch = async (cityOverride?: string) => {
    const query = cityOverride || searchTerm;
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    if (cityOverride) setSearchTerm(cityOverride);

    try {
      // 1. SEARCH SUPABASE (Internal Database)
      const { data: localData } = await supabase
        .from('pgs')
        .select('*')
        .ilike('location', `%${query}%`);

      // 2. SEARCH GOOGLE PLACES (External API)
      // Note: We use a 'try-catch' here so if Google fails, Supabase data still shows
      let externalPgs = [];
      try {
        const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;
        const googleURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=PG+hostels+in+${query}&key=${apiKey}`;
        
        const response = await fetch(googleURL);
        const googleData = await response.json();

        if (googleData.status === "OK") {
          externalPgs = googleData.results.map((place: any) => ({
            id: place.place_id,
            name: place.name,
            location: place.formatted_address,
            price: "Check Price",
            image_url: place.photos 
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`
              : 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
            isVerified: false
          }));
        }
      } catch (e) {
        console.error("Google API blocked or failed:", e);
      }

      // 3. COMBINE RESULTS (Supabase first, then Google)
      const combinedResults = [...(localData || []), ...externalPgs];
      setAllPgs(combinedResults);
      
    } catch (error) {
      console.error("Critical Search Error:", error);
    } finally {
      setLoading(false);
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
      <SEO title="StayLocal | Search" description="Find verified PGs." location="India" />

      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1920" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter italic">Find Your Stay.</h1>
          <div className="flex flex-col md:flex-row gap-2 bg-white p-2 rounded-3xl shadow-2xl max-w-2xl mx-auto">
            <input 
              type="text" value={searchTerm} placeholder="Enter City (e.g. Chennai)" 
              className="flex-1 px-8 py-4 text-slate-900 outline-none font-bold text-lg"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={() => handleSearch()} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-slate-900 transition-all">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Top Cities Grid */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cities.map((city, i) => (
            <motion.div
              key={city.name}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative h-80 rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-lg"
              onClick={() => handleSearch(city.name)}
            >
              <img src={city.img} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-8 left-8">
                <div className={`w-8 h-1 ${city.color} mb-2`} />
                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">{city.tag}</p>
                <h3 className="text-2xl font-black text-white">{city.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Search Results */}
      <section id="listings" className="py-20 px-6 bg-slate-50 min-h-[40vh]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-slate-900 mb-10">
            {hasSearched ? `Results for "${searchTerm}"` : 'Featured Listings'}
          </h2>

          {loading ? (
             <div className="text-center py-20"><div className="animate-spin h-10 w-10 border-t-2 border-blue-600 rounded-full mx-auto" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <AnimatePresence>
                {allPgs.map((pg, i) => (
                  <motion.div key={pg.id || i} variants={cardVariants} initial="hidden" animate="visible" className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 group">
                    <div className="relative h-60">
                      <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[9px] font-black uppercase ${pg.isVerified !== false ? 'bg-blue-600 text-white' : 'bg-white text-slate-900'}`}>
                        {pg.isVerified !== false ? 'StayLocal Verified' : 'Google Result'}
                      </div>
                      <img src={pg.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-black text-slate-900 mb-1">{pg.name}</h3>
                      <p className="text-slate-400 text-sm font-bold mb-6">📍 {pg.location}</p>
                      <div className="flex justify-between items-center border-t pt-6">
                        <span className="text-lg font-black text-blue-600">{pg.price === "Check Price" ? "Inquiry" : `₹${pg.price}`}</span>
                        <Link href={pg.isVerified !== false ? `/pg/${pg.id}` : `https://www.google.com/maps/search/${encodeURIComponent(pg.name + " " + pg.location)}`} target="_blank">
                           <button className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">Details</button>
                        </Link>
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