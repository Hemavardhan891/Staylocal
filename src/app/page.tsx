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
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPGs() {
      setLoading(true);
      const { data, error } = await supabase.from('pgs').select('*').order('created_at', { ascending: false });
      if (!error) setAllPgs(data || []);
      setLoading(false);
    }
    fetchPGs();
  }, []);

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredPGs = allPgs.filter((pg) => {
    const matchesSearch = pg.location?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pg.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = filterGender === 'All' || pg.gender === filterGender;
    return matchesSearch && matchesGender;
  });

  return (
    <main className="min-h-screen bg-white">
      <SEO title="StayLocal | Premium PG Network" description="Find verified PGs in India's top tech hubs." location="India" />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <motion.img 
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
          src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1920" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Stay<span className="text-blue-500">Local.</span></h1>
          <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-2xl mx-auto flex">
            <input 
              type="text" placeholder="Search Koramangala, OMR, or HITEC City..." 
              className="flex-1 px-6 py-4 text-slate-900 outline-none font-medium"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold">Search</button>
          </div>
        </div>
      </section>

      {/* City Grid */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-black mb-10">Top Student Hubs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Bangalore', img: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400' },
            { name: 'Chennai', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400' },
            { name: 'Hyderabad', img: 'https://images.unsplash.com/photo-1510009489794-352fba39a0b8?w=400' },
            { name: 'Pune', img: 'https://images.unsplash.com/photo-1565214975484-3cfa9e56f914?w=400' }
          ].map(city => (
            <div key={city.name} className="relative h-60 rounded-[2rem] overflow-hidden group cursor-pointer">
              <img src={city.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white font-bold text-xl">{city.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Listings */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <AnimatePresence>
            {filteredPGs.map((pg, i) => (
              <motion.div key={pg.id} custom={i} variants={cardVariants} initial="hidden" whileInView="visible" className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border group relative">
                
                {/* Heart Button */}
                <button 
                  onClick={() => toggleWishlist(pg.id)}
                  className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-colors ${wishlist.includes(pg.id) ? 'text-red-500 fill-red-500' : 'text-slate-400'}`} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                <div className="h-64 overflow-hidden">
                  <img src={pg.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black">{pg.name}</h3>
                  <p className="text-slate-500 font-bold mb-6">📍 {pg.location}</p>
                  <Link href={`/pg/${pg.id}`}>
                    <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-colors">View Details</button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}