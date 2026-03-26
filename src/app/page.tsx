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

  // AUTH LOGIC: Basic Sign-In Function
  const handleSignIn = async () => {
    // This is a placeholder for your login redirect
    // For the assignment, you can redirect to your /login page
    window.location.href = '/login';
  };

  useEffect(() => {
    const loadData = async () => {
      const { data } = await supabase.from('pgs').select('*').limit(6);
      if (data) setAllPgs(data);
    };
    loadData();
  }, []);

  const handleSearch = async (queryOverride?: string) => {
    const query = queryOverride || searchTerm;
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    if (queryOverride) setSearchTerm(queryOverride);

    const { data: localData } = await supabase
      .from('pgs')
      .select('*')
      .or(`location.ilike.%${query}%,name.ilike.%${query}%`);

    if (!localData || localData.length === 0) {
      setAllPgs([{
        id: 'google-card',
        name: `Top PGs in ${query}`,
        location: `Verified listings & reviews on Google Maps`,
        price: "Live Rates",
        image_url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
        isGoogle: true,
        url: `https://www.google.com/maps/search/PG+Hostels+in+${encodeURIComponent(query)}`
      }]);
    } else {
      setAllPgs(localData);
    }
    setLoading(false);
    setTimeout(() => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' }), 300);
  };

  const cities = [
    { name: 'Bangalore', tag: 'Tech Hub', img: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600' },
    { name: 'Chennai', tag: 'Automobile', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600' },
    { name: 'Hyderabad', tag: 'HITEC City', img: 'https://images.unsplash.com/photo-1510009489794-352fba39a0b8?w=600' },
    { name: 'Pune', tag: 'Education', img: 'https://images.unsplash.com/photo-1565214975484-3cfa9e56f914?w=600' },
    { name: 'Mumbai', tag: 'Financial', img: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600' },
    { name: 'Delhi', tag: 'NCR Region', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600' }
  ];

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <SEO title="StayLocal | Premium Discovery" description="Search PGs." location="India" />

      {/* VISUAL EFFECT: Floating Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-50 z-0" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-purple-100 rounded-full blur-[100px] opacity-40 z-0" />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-slate-900">
        <img src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1920" className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105 animate-[pulse_10s_infinite]" />
        
        <div className="relative z-10 text-center px-6">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <h1 className="text-7xl md:text-9xl font-black text-white mb-6 tracking-tighter">
              Stay<span className="text-blue-500">Local.</span>
            </h1>
            <p className="text-blue-400 font-bold tracking-[0.4em] uppercase text-sm mb-12">Premium PG Marketplace</p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-3 bg-white/10 backdrop-blur-xl p-3 rounded-[3rem] border border-white/20 shadow-2xl max-w-3xl mx-auto">
            <input 
              className="flex-1 px-8 py-5 bg-white rounded-[2.5rem] text-slate-900 outline-none font-bold text-lg"
              placeholder="Search Area, Colony or College..."
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={() => handleSearch()} className="bg-blue-600 text-white px-12 py-5 rounded-[2.5rem] font-black text-lg hover:bg-white hover:text-blue-600 transition-all shadow-xl">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* More Cities - Filling the space */}
      <section className="max-w-7xl mx-auto py-24 px-6 relative z-10">
        <h2 className="text-4xl font-black text-slate-900 mb-12 tracking-tight">Top Student Hubs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city, i) => (
            <motion.div
              key={city.name}
              whileHover={{ scale: 1.03, rotate: 1 }}
              className="relative h-80 rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl group"
              onClick={() => handleSearch(city.name)}
            >
              <img src={city.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8">
                <p className="text-white/60 font-black uppercase text-[10px] tracking-widest mb-1">{city.tag}</p>
                <h3 className="text-3xl font-black text-white tracking-tighter">{city.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Results Section */}
      <section id="listings" className="py-24 px-6 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto">
          {hasSearched && <h2 className="text-4xl font-black text-slate-900 mb-12 italic">Found in {searchTerm}</h2>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {allPgs.map((pg) => (
              <motion.div key={pg.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-100">
                <div className="h-64 relative">
                  <img src={pg.image_url} className="w-full h-full object-cover" />
                  <div className="absolute top-6 left-6 px-4 py-1 bg-blue-600 text-white rounded-full text-[10px] font-black">{pg.isGoogle ? 'Google' : 'Verified'}</div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-black text-slate-900 mb-2">{pg.name}</h3>
                  <p className="text-slate-400 font-bold text-sm mb-8">{pg.location}</p>
                  <div className="flex justify-between items-center border-t pt-6">
                    <span className="text-2xl font-black text-blue-600">{pg.price}</span>
                    <Link href={pg.isGoogle ? pg.url : `/pg/${pg.id}`} target={pg.isGoogle ? '_blank' : '_self'}>
                      <button className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs">View Stay</button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}