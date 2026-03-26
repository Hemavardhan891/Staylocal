'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [allPgs, setAllPgs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 1. Initial Load: Show a few manual PGs from your database
  useEffect(() => {
    const loadData = async () => {
      const { data } = await supabase.from('pgs').select('*').limit(3);
      if (data) setAllPgs(data);
    };
    loadData();
  }, []);

  // 2. The Smart Search Logic (Colony/College/Area focus)
  const handleSearch = async (overrideValue?: string) => {
    const query = overrideValue || searchTerm;
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    
    // Always update search term for the UI
    if (overrideValue) setSearchTerm(overrideValue);

    try {
      // STEP A: Check your Supabase first (Precise match for colony/college)
      const { data: localData } = await supabase
        .from('pgs')
        .select('*')
        .or(`location.ilike.%${query}%,name.ilike.%${query}%`);

      // STEP B: If local database is empty, create a "Virtual Google Card"
      // This is the 3x Growth strategy: Never show an empty page!
      if (!localData || localData.length === 0) {
        setAllPgs([{
          id: 'google-external',
          name: `Top Rated PGs near ${query}`,
          location: `View 50+ hostels, reviews & photos in this colony on Google`,
          price: "Live Rates",
          image_url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
          isGoogle: true,
          url: `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY7{encodeURIComponent("PG Hostels near " + query)}`
        }]);
      } else {
        setAllPgs(localData);
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
      // Smooth scroll to the results section
      setTimeout(() => {
        document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <SEO title="StayLocal | Search Area, Colony & College" description="Find PGs near your college or office." location="India" />

      {/* Hero Section - Dashboard remains the same */}
      <section className="h-[65vh] bg-slate-900 flex items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
        <div className="relative z-10 w-full max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter"
          >
            StayLocal<span className="text-blue-500">.</span>
          </motion.h1>
          
          <p className="text-slate-400 font-bold mb-10 text-lg uppercase tracking-widest">
            Search by <span className="text-white">Colony</span> • <span className="text-white">College</span> • <span className="text-white">Town</span>
          </p>

          <div className="flex flex-col md:flex-row bg-white p-2 rounded-[2.5rem] shadow-2xl">
            <input 
              ref={searchInputRef}
              value={searchTerm}
              className="flex-1 px-8 py-5 text-slate-900 outline-none font-bold text-lg"
              placeholder="e.g. SRM University, HSR Layout, OMR"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={() => handleSearch()}
              className="bg-blue-600 text-white px-12 py-5 rounded-[2rem] font-black text-lg hover:bg-slate-900 transition-all active:scale-95"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Quick Links for Students - Helps with 3x Growth */}
      <div className="max-w-7xl mx-auto py-12 px-6 flex flex-wrap gap-3 justify-center">
         {['Anna University', 'SRM Kattankulathur', 'Manyata Tech Park', 'IIT Madras', 'Koramangala'].map(area => (
           <button 
            key={area} onClick={() => handleSearch(area)}
            className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-full text-xs font-black text-slate-500 hover:border-blue-600 hover:text-blue-600 transition-all"
           >
             + {area}
           </button>
         ))}
      </div>

      {/* Results Section */}
      <section id="listings" className="max-w-7xl mx-auto py-20 px-6 min-h-[50vh]">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900">
              {hasSearched ? `Results for "${searchTerm}"` : 'Recommended Stays'}
            </h2>
            <div className="h-1.5 w-20 bg-blue-600 mt-4 rounded-full" />
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center"><div className="animate-spin h-10 w-10 border-t-2 border-blue-600 rounded-full mx-auto" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <AnimatePresence>
              {allPgs.map((pg, i) => (
                <motion.div 
                  key={pg.id || i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all group"
                >
                  <div className="h-64 relative overflow-hidden">
                    <img src={pg.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={pg.name} />
                    <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${pg.isGoogle ? 'bg-white text-slate-900' : 'bg-blue-600 text-white'}`}>
                      {pg.isGoogle ? 'Google Direct' : 'Verified Stay'}
                    </div>
                  </div>
                  <div className="p-10">
                    <h3 className="text-2xl font-black text-slate-900 mb-2 truncate">{pg.name}</h3>
                    <p className="text-slate-400 font-bold mb-8 text-sm leading-relaxed">{pg.location}</p>
                    <div className="flex justify-between items-center border-t border-slate-50 pt-8">
                      <span className="text-2xl font-black text-blue-600">{pg.price}</span>
                      {pg.isGoogle ? (
                        <a href={pg.url} target="_blank" className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-xs hover:bg-blue-600 transition-all">Explore Google</a>
                      ) : (
                        <Link href={`/pg/${pg.id}`} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-xs hover:bg-blue-600 transition-all">View Details</Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </main>
  );
}