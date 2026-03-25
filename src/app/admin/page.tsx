'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [pgs, setPgs] = useState<any[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const { data } = await supabase.from('pgs').select('*');
      if (data) setPgs(data);
    };
    fetchAll();
  }, []);

  return (
    <div className="p-10 bg-white min-h-screen">
      <h1 className="text-3xl font-black mb-8 text-slate-900">Admin Control Panel</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-50 text-left">
            <th className="p-4 border">Name</th>
            <th className="p-4 border">Location</th>
            <th className="p-4 border">Price</th>
            <th className="p-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pgs.map(pg => (
            <tr key={pg.id}>
              <td className="p-4 border font-bold">{pg.name}</td>
              <td className="p-4 border">{pg.location}</td>
              <td className="p-4 border text-blue-600 font-black">₹{pg.price}</td>
              <td className="p-4 border">
                <button className="text-red-500 font-bold hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}