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
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  // Initial load: Fetch some featured PGs from your database
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    const { data } = await supabase.from('pgs').select('*').limit(6);
    if (data) setAllPgs(data);
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    setHasSearched(true);

    try {
      // 1. Fetch from your Supabase (Verified Listings)
      const { data: localData } = await supabase
        .from('pgs')
        .select('*')
        .ilike('location', `%${searchTerm}%`);

      // 2. Fetch from Google Places (External Listings)
      // This uses the 'Text Search' API to find PGs in the searched area
      const googleURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=PG+hostels+in+${searchTerm}&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`;
      
      const response = await fetch(googleURL);
      const googleData = await response.json();

      // 3. Normalize Google results to match your PG format
      const externalPgs = (googleData.results || []).map((place: any) => ({
        id: place.place_id,
        name: place.name,
        location: place.formatted_address,
        price: "Contact for Price", 
        image_url: place.photos 
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`
          : 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800', 
        isVerified: false // Flag to distinguish from your own database
      }));

      // 4. Combine: Show your verified ones first, then Google results
      setAllPgs([...(localData || []), ...externalPgs]);
      
    } catch (error) {
      console.error("Hybrid search failed:", error);
    } finally {
      setLoading(false);
      // Smooth scroll to results
      document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <SEO title="StayLocal | AI-Powered PG Search" description="Find verified PGs using StayLocal Hybrid Search." location="India" />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1920" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Luxury Stay"
        />
        
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter"
          >
            Find Your <span className="text-blue-500">Stay.</span>
          </motion.h1>

          <div className="flex flex-col md:flex-row gap-2 bg-white p-2 rounded-3xl shadow-2xl max-w-2xl mx-auto border border-white/20">
            <input 
              type="text" 
              placeholder="Enter City or Area (e.g. Chennai, OMR)" 
              className="flex-1 px-6 py-4 text-slate-900 outline-none font-bold text-lg"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all active:scale-95"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section id="listings" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {hasSearched ? `Results for "${searchTerm}"` : 'Featured Accommodations'}
            </h2>
            <div className="h-1.5 w-20 bg-blue-600 mt-4 rounded-full"></div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 mb-4"></div>
              <p className="text-slate-900 font-black">AI Searching PGs...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <AnimatePresence>
                {allPgs.map((pg, i) => (
                  <motion.div
                    key={pg.id || i}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 group relative"
                  >
                    {/* Source Badge */}
                    <div className={`absolute top-6 left-6 z-20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${pg.isVerified !== false ? 'bg-blue-600 text-white' : 'bg-white/90 text-slate-600 backdrop-blur-md'}`}>
                      {pg.isVerified !== false ? 'StayLocal Verified' : 'Google Result'}
                    </div>

                    <div className="h-72 overflow-hidden">
                      <img src={pg.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={pg.name} />
                    </div>
                    
                    <div className="p-10">
                      <h3 className="text-2xl font-black text-slate-900 mb-2 truncate">{pg.name}</h3>
                      <p className="text-slate-500 font-bold mb-8 flex items-center gap-2 text-sm">
                        <span className="text-blue-500">📍</span> {pg.location}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <p className="text-xl font-black text-blue-600">{pg.price === "Contact for Price" ? "Check Price" : `₹${pg.price}`}</p>
                        <Link href={pg.isVerified !== false ? `/pg/${pg.id}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pg.name + " " + pg.location)}`} target={pg.isVerified === false ? "_blank" : "_self"}>
                          <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-all">
                            {pg.isVerified !== false ? 'View Details' : 'View on Map'}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!loading && allPgs.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-bold text-xl">No PGs found in this area yet.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}