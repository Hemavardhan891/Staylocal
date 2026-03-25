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

  // Initial Load - Featured PGs
  useEffect(() => {
    const loadInitial = async () => {
      const { data } = await supabase.from('pgs').select('*').limit(6);
      if (data) setAllPgs(data);
    };
    loadInitial();
  }, []);

  // Hybrid Search Function (Supabase + Google)
  const handleSearch = async (cityOverride?: string) => {
    const query = cityOverride || searchTerm;
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    if (cityOverride) setSearchTerm(cityOverride);

    try {
      // 1. Local Supabase Search
      const { data: localData } = await supabase
        .from('pgs')
        .select('*')
        .ilike('location', `%${query}%`);

      // 2. Google Places API Search
      const googleURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=PG+accommodations+in+${query}&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`;
      const response = await fetch(googleURL);
      const googleData = await response.json();

      let externalPgs = [];
      if (googleData.status === "OK") {
        externalPgs = googleData.results.map((place: any) => ({
          id: place.place_id,
          name: place.name,
          location: place.formatted_address,
          price: "Inquiry",
          image_url: place.photos 
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${place.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`
            : 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
          isVerified: false
        }));
      }

      setAllPgs([...(localData || []), ...externalPgs]);
      
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  const topCities = [
    { name: 'Bangalore', tag: 'Tech Hub', img: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600', color: 'bg-blue-600' },
    { name: 'Chennai', tag: 'Automobile Hub', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600', color: 'bg-orange-500' },
    { name: 'Hyderabad', tag: 'HITEC City', img: 'https://images.unsplash.com/photo-1510009489794-352fba39a0b8?w=600', color: 'bg-emerald-500' },
    { name: 'Pune', tag: 'Education Hub', img: 'https://images.unsplash.com/photo-1565214975484-3cfa9e56f914?w=600', color: 'bg-purple-600' }
  ];

  return (
    <main className="min-h-screen bg-white">
      <SEO title="StayLocal | Premium Discovery" description="AI-powered PG search for top Indian cities." location="India" />

      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1920" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Hero" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
            Your Premium <span className="text-blue-500">Stay.</span>
          </motion.h1>
          <div className="flex flex-col md:flex-row gap-2 bg-white p-3 rounded-[2rem] shadow-2xl max-w-2xl mx-auto">
            <input 
              type="text" value={searchTerm} placeholder="Search City or Area..." 
              className="flex-1 px-8 py-4 text-slate-900 outline-none font-bold text-lg"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={() => handleSearch()} className="bg-blue-600 hover:bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-lg">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Top Cities Section */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <h2 className="text-4xl font-black text-slate-900 mb-12 tracking-tight">Top Tech Cities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {topCities.map((city, i) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -10, transition: { type: "spring", stiffness: 300 } }}
              className="relative h-96 rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-xl"
              onClick={() => handleSearch(city.name)}
            >
              <img src={city.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={city.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8">
                <div className={`w-10 h-1 ${city.color} mb-3 rounded-full`} />
                <p className="text-white/60 font-black uppercase tracking-widest text-[9px] mb-1">{city.tag}</p>
                <h3 className="text-2xl font-black text-white">{city.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Results Section */}
      <section id="listings" className="py-24 px-6 bg-slate-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-slate-900 mb-12">
            {hasSearched ? `Results for "${searchTerm}"` : 'Featured Listings'}
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 mb-4"></div>
              <p className="font-black text-slate-900">AI Searching...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <AnimatePresence>
                {allPgs.map((pg, i) => (
                  <motion.div key={pg.id || i} custom={i} variants={cardVariants} initial="hidden" whileInView="visible" className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border group relative">
                    <div className={`absolute top-6 left-6 z-20 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${pg.isVerified !== false ? 'bg-blue-600 text-white' : 'bg-white/90 text-slate-700 backdrop-blur-md'}`}>
                      {pg.isVerified !== false ? 'Verified' : 'Google Search'}
                    </div>
                    <div className="h-64 overflow-hidden">
                      <img src={pg.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={pg.name} />
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-black text-slate-900 truncate">{pg.name}</h3>
                      <p className="text-slate-400 font-bold mb-6 text-sm truncate">📍 {pg.location}</p>
                      <div className="flex justify-between items-center border-t pt-6">
                        <p className="text-xl font-black text-blue-600">{pg.price === "Inquiry" ? "Check Price" : `₹${pg.price}`}</p>
                        <Link href={pg.isVerified !== false ? `/pg/${pg.id}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pg.name + " " + pg.location)}`} target={pg.isVerified === false ? "_blank" : "_self"}>
                          <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-blue-600 transition-all">
                            {pg.isVerified !== false ? 'Details' : 'Map View'}
                          </button>
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