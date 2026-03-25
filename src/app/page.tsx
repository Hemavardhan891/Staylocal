'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import SEO from '../components/SEO';
import { supabase } from '@/lib/supabase';

// Fixed the TypeScript error by adding the ": Variants" type
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: i * 0.1, 
      duration: 0.5, 
      ease: "easeOut" 
    }
  })
};

export default function Home() {
  const [allPgs, setAllPgs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPGs() {
      setLoading(true);
      const { data, error } = await supabase
        .from('pgs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setAllPgs(data || []);
      setLoading(false);
    }
    fetchPGs();
  }, []);

  const filteredPGs = allPgs.filter((pg) => {
    const matchesSearch = pg.location?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pg.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = filterGender === 'All' || pg.gender === filterGender;
    return matchesSearch && matchesGender;
  });

  return (
    <main className="min-h-screen bg-white">
      <SEO 
        title="StayLocal | Premium Verified PGs" 
        description="Find high-quality PGs with zero brokerage and verified listings." 
        location="India" 
      />

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1920" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Luxury Stay"
        />
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-md"
          >
            <span className="text-blue-400 text-xs font-black uppercase tracking-[0.2em]">Verified by StayLocal AI</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
          >
            Premium Living, <br />
            <span className="text-blue-600">Zero Brokerage.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-slate-300 mb-10 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Find your home away from home. Explore top-rated PGs with high-speed WiFi, home-cooked meals, and 24/7 security.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row gap-2 bg-white p-2 rounded-2xl shadow-2xl max-w-2xl mx-auto"
          >
            <input 
              type="text" 
              placeholder="Search locality (e.g. Koramangala)" 
              className="flex-1 px-6 py-4 text-slate-900 outline-none font-medium text-lg placeholder:text-slate-400"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              onClick={() => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 hover:bg-slate-900 text-white px-10 py-4 rounded-xl font-bold transition-all text-lg"
            >
              Search
            </button>
          </motion.div>
        </div>
      </section>

      {/* Popular Cities Grid */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Explore Top Hubs</h2>
          <div className="h-1.5 w-20 bg-blue-600 mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Bangalore', count: '120+ PGs', img: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=600' },
            { name: 'Hyderabad', count: '85+ PGs', img: 'https://images.unsplash.com/photo-1510009489794-352fba39a0b8?auto=format&fit=crop&w=600' },
            { name: 'Pune', count: '64+ PGs', img: 'https://images.unsplash.com/photo-1565214975484-3cfa9e56f914?auto=format&fit=crop&w=600' },
            { name: 'Delhi', count: '90+ PGs', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600' }
          ].map((city) => (
            <motion.div 
              key={city.name}
              whileHover={{ y: -10 }}
              className="relative h-80 rounded-[2.5rem] overflow-hidden cursor-pointer group shadow-xl"
            >
              <img src={city.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={city.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-white font-black text-2xl">{city.name}</h3>
                <p className="text-blue-400 text-sm font-bold uppercase tracking-widest mt-1">{city.count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Filter and Listings */}
      <section id="listings" className="bg-slate-50 py-24 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Available Rooms</h2>
              <p className="text-slate-500 font-bold mt-2 text-lg">Showing {filteredPGs.length} verified listings</p>
            </div>
            
            <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
              {['All', 'Boys', 'Girls', 'Unisex'].map((g) => (
                <button
                  key={g}
                  onClick={() => setFilterGender(g)}
                  className={`px-8 py-3 rounded-xl font-black transition-all text-sm uppercase tracking-wider ${
                    filterGender === g 
                    ? 'bg-blue-600 text-white shadow-xl' 
                    : 'text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-blue-600 mb-6"></div>
              <p className="text-slate-900 font-black text-xl">Connecting to Database...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <AnimatePresence>
                {filteredPGs.map((pg, i) => (
                  <motion.div
                    key={pg.id}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -12 }}
                    className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <img 
                        src={pg.image_url || 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800'} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        alt={pg.name} 
                      />
                      <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-black text-blue-700 uppercase tracking-[0.2em] shadow-sm">
                        {pg.gender} PG
                      </div>
                    </div>
                    
                    <div className="p-10">
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                          {pg.name}
                        </h3>
                        <div className="text-right">
                          <p className="text-2xl font-black text-blue-600">₹{pg.price.toLocaleString()}</p>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly</span>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 font-bold mb-8 text-lg flex items-center gap-2">
                        <span className="text-blue-500">📍</span> {pg.location}
                      </p>

                      <Link href={`/pg/${pg.id}`}>
                        <button className="w-full py-5 bg-slate-900 text-white rounded-[1.25rem] font-bold text-lg hover:bg-blue-600 shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2">
                          View Details
                        </button>
                      </Link>
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