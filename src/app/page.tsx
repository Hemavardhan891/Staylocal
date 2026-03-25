'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SEO from '../components/SEO';
import { supabase } from '@/lib/supabase';

// Define the structure of a PG
interface PG {
  id: string;
  name: string;
  location: string;
  price: number;
  gender: string;
  image_url: string;
}

export default function Home() {
  const [allPgs, setAllPgs] = useState<PG[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('All');
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from Supabase when the page loads
  useEffect(() => {
    async function fetchPGs() {
      setLoading(true);
      const { data, error } = await supabase
        .from('pgs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching PGs:', error);
      } else {
        setAllPgs(data || []);
      }
      setLoading(false);
    }
    fetchPGs();
  }, []);

  // 2. Filter logic remains the same, but uses state data
  const filteredPGs = allPgs.filter((pg) => {
    const matchesSearch = pg.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pg.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = filterGender === 'All' || pg.gender === filterGender;
    return matchesSearch && matchesGender;
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <SEO title="StayLocal | Live PG Listings" description="Real-time verified PGs." location="India" />

      {/* Hero Section */}
      <section className="bg-blue-700 py-16 text-white text-center px-4">
        <h1 className="text-4xl font-black mb-6">Find Your Perfect PG</h1>
        <div className="max-w-xl mx-auto bg-white rounded-xl p-2 flex shadow-2xl">
          <input 
            type="text" 
            placeholder="Search city or PG name..." 
            className="flex-1 px-4 py-2 text-black outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex justify-center gap-3 mt-6">
          {['All', 'Boys', 'Girls', 'Unisex'].map((g) => (
            <button key={g} onClick={() => setFilterGender(g)} className={`px-5 py-2 rounded-full font-bold ${filterGender === g ? 'bg-orange-500' : 'bg-white text-blue-700'}`}>
              {g}
            </button>
          ))}
        </div>
      </section>

      {/* Loading State */}
      <section className="max-w-7xl mx-auto mt-12 px-4">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading live listings...</div>
        ) : filteredPGs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPGs.map((pg) => (
              <Link href={`/pg/${pg.id}`} key={pg.id}>
                <div className="bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition-all">
                  <img src={pg.image_url} alt={pg.name} className="h-48 w-full object-cover" />
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold uppercase bg-blue-100 text-blue-700 px-2 py-1 rounded">{pg.gender}</span>
                      <span className="text-lg font-bold text-green-600">₹{pg.price.toLocaleString()}</span>
                    </div>
                    <h3 className="text-xl font-bold">{pg.name}</h3>
                    <p className="text-gray-500 text-sm">{pg.location}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed rounded-2xl">No PGs found.</div>
        )}
      </section>
    </main>
  );
}