'use client';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black text-slate-900 mb-8"
        >
          Redefining Living for <br/><span className="text-blue-600">Modern India.</span>
        </motion.h1>
        <p className="text-xl text-slate-600 leading-relaxed mb-12">
          StayLocal was built to solve one problem: The struggle of finding a verified, 
          broker-free PG in India's tech hubs. We use AI and real-time mapping to 
          connect students directly with premium homeowners.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
            <h3 className="text-3xl font-black text-blue-600">10k+</h3>
            <p className="font-bold text-slate-400 uppercase text-xs mt-2">Verified Rooms</p>
          </div>
          <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
            <h3 className="text-3xl font-black text-blue-600">0%</h3>
            <p className="font-bold text-slate-400 uppercase text-xs mt-2">Brokerage Fee</p>
          </div>
          <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
            <h3 className="text-3xl font-black text-blue-600">4+</h3>
            <p className="font-bold text-slate-400 uppercase text-xs mt-2">Major Cities</p>
          </div>
        </div>
      </div>
    </main>
  );
}