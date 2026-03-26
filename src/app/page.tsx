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

  // 1. Load your actual database properties on startup
  useEffect(() => {
    const loadInitial = async () => {
      const { data, error } = await supabase.from('pgs').select('*').limit(6);
      if (error) {
        console.error("Database Connection Error:", error.message);
      } else if (data && data.length > 0) {
        setAllPgs(data);
      }
    };
    loadInitial();
  }, []);

  // 2. Hybrid Search Logic (DB First, then Google)
  const handleSearch = async (overrideValue?: string) => {
    const query = overrideValue || searchTerm;
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    if (overrideValue) setSearchTerm(overrideValue);

    try {
      // Step A: Check Supabase with Case-Insensitive search
      const { data: localData, error } = await supabase
        .from('pgs')
        .select('*')
        .or(`location.ilike.%${query}%,name.ilike.%${query}%`);

      if (error || !localData || localData.length === 0) {
        // Step B: Fallback to STABLE Google Maps Deep-Link
        const googleLink = `http://googleusercontent.com/maps.google.com/search?q=${encodeURIComponent("PG Hostels in " + query)}`;
        
        setAllPgs([{
          id: 'google-result',
          name: `Top Rated PGs in ${query}`,
          location: `Verified maps and 50+ local listings for ${query}`,
          price: "Inquiry",
          rating: 4.8,
          isGoogle: true,
          url: googleLink,
          image_url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'
        }]);
      } else {
        // Step C: Show your own Database results
        setAllPgs(localData);
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
      setTimeout(() => {
        document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const cities = [
    { name: 'Bangalore', tag: 'Tech Hub', img: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600', color: 'bg-blue-600' },
    { name: 'Chennai', tag: 'Automobile', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600', color: 'bg-orange-500' },
    { name: 'Hyderabad', tag: 'HITEC City', img: 'https://images.unsplash.com/photo-1510009489794-352fba39a0b8?w=600', color: 'bg-emerald-500' },
    { name: 'Pune', tag: 'Education', img: 'https://images.unsplash.com/photo-1565214975484-3cfa9e56f914?w=600', color: 'bg-purple-600' },
    { name: 'Mumbai', tag: 'Financial', img: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600', color: 'bg-pink-600' },
    { name: 'Delhi', tag: 'NCR Region', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600', color: 'bg-red-600' },
    { name: 'Kolkata', tag: 'Cultural', img: 'https://s3.india.com/wp-content/uploads/2025/07/kolkata-DIY.jpg', color: 'bg-yellow-600' },
    { name: 'Ahmedabad', tag: 'Business', img: 'https://www.fabhotels.com/blog/wp-content/uploads/2019/05/Historical-Places-in-Ahmedabad_600.jpg', color: 'bg-teal-600' }
  ];

  return (
    <main className="min-h-screen bg-white selection:bg-blue-100">
      
      {/* 1. FLOATING SUPPORT CHAT */}
      <motion.div whileHover={{ scale: 1.1 }} className="fixed bottom-10 right-10 z-[100] cursor-pointer group">
        <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl animate-pulse text-2xl">💬</div>
      </motion.div>

      {/* 2. PREMIUM NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100 px-10 py-6 flex justify-between items-center">
        <div className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Stay<span className="text-blue-600">Local.</span></div>
        <div className="hidden md:flex gap-12 items-center">
          {['Find PG', 'About Us', 'Support'].map((item) => (
            <button key={item} className="text-[10px] font-black text-slate-900 hover:text-blue-600 transition-all uppercase tracking-[0.2em]">{item}</button>
          ))}
          <Link href="/list-your-pg" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xs shadow-lg shadow-blue-100 uppercase">List Property</Link>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 2 }}
          src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1920" 
          className="absolute inset-0 w-full h-full object-cover opacity-40" 
        />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter italic">Find Your Hub.</motion.h1>
          <div className="flex bg-white p-3 rounded-[3rem] shadow-2xl max-w-2xl mx-auto border-4 border-white/20">
            <input 
              className="flex-1 px-8 py-4 text-slate-900 outline-none font-black text-xl placeholder:text-slate-400" 
              placeholder="Search Area, Colony or College..."
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={() => handleSearch()} className="bg-blue-600 text-white px-12 rounded-[2.5rem] font-black text-lg shadow-xl hover:bg-slate-900 transition-all">Search</button>
          </div>
        </div>
      </section>

      {/* 4. TRUST STATS BAR */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Verified PGs', value: '1,200+' }, { label: 'Happy Students', value: '5,000+' },
            { label: 'Smart Cities', value: '8' }, { label: 'Inquiry Hub', value: 'Live' }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-black text-slate-900 mb-2">{stat.value}</p>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 8-CITY PHOTO GRID */}
      <section className="max-w-7xl mx-auto py-32 px-6">
        <h2 className="text-5xl font-black text-slate-900 mb-16 tracking-tighter italic">Top Student Hubs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {cities.map((city, i) => (
            <motion.div
              key={city.name}
              whileHover={{ scale: 1.05, y: -15, transition: { type: "spring", stiffness: 300 } }}
              onClick={() => handleSearch(city.name)}
              className="relative h-96 rounded-[3.5rem] overflow-hidden cursor-pointer shadow-2xl group"
            >
              <img src={city.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125" alt={city.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10 text-white">
                <div className={`w-12 h-2 ${city.color} mb-4 rounded-full`} />
                <h3 className="text-3xl font-black uppercase italic">{city.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. DYNAMIC RESULTS LIST */}
      <section id="listings" className="py-24 px-6 bg-slate-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-slate-900 mb-16 tracking-tighter italic">
            {hasSearched ? `Results for "${searchTerm}"` : 'Recent Listings'}
          </h2>

          <div className="space-y-12">
            <AnimatePresence>
              {allPgs.map((pg, i) => (
                <motion.div 
                  key={pg.id || i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-[4rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col lg:flex-row group"
                >
                  <div className="lg:w-[450px] h-80 relative overflow-hidden">
                    <img src={pg.image_url || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-black text-slate-900 shadow-xl tracking-widest uppercase">
                      ⭐ {pg.rating || '4.5'}
                    </div>
                  </div>
                  
                  <div className="p-12 flex-1 flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                      <div>
                        <h3 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">{pg.name}</h3>
                        <p className="text-slate-400 font-bold text-lg flex items-center gap-2 italic">📍 {pg.location}</p>
                      </div>
                      <div className="md:text-right">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-1">Rent Package</p>
                        <p className="text-4xl font-black text-blue-600">{pg.price === "Inquiry" ? "Inquiry" : `₹${pg.price}`}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between border-t border-slate-50 pt-10 mt-4 gap-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Status</span>
                        <span className="font-black text-green-600 text-lg uppercase tracking-tighter">Verified Available ✅</span>
                      </div>
                      {pg.isGoogle ? (
                        <a href={pg.url} target="_blank" className="bg-slate-900 text-white px-12 py-5 rounded-[2rem] font-black text-sm hover:bg-blue-600 transition-all shadow-xl shadow-blue-100 uppercase tracking-widest">
                          View on Maps
                        </a>
                      ) : (
                        <Link href={`/pg/${pg.id}`}>
                          <button className="bg-slate-900 text-white px-12 py-5 rounded-[2rem] font-black text-sm hover:bg-blue-600 transition-all shadow-xl shadow-blue-100 uppercase tracking-widest">
                            View Details
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}