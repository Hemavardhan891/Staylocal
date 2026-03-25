// src/app/login/page.tsx
'use client';

import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-[85vh] flex items-center justify-center bg-slate-50 px-6 py-12">
      <SEO title="Sign In | StayLocal" description="Log in to your StayLocal account." location="India" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
             <span className="text-white font-black text-2xl">S</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="text-slate-500 mt-2 font-medium">Your next home is just a click away.</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest">Email Address</label>
            <input 
              type="email" 
              placeholder="hema@staylocal.in" 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all text-black font-medium" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all text-black font-medium" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-600 shadow-xl shadow-slate-200 transition-all active:scale-95"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-slate-500 text-sm font-medium">
            New to StayLocal? <span className="text-blue-600 font-bold cursor-pointer hover:underline">Create Account</span>
          </p>
          <Link href="/" className="inline-block text-slate-400 text-xs hover:text-slate-600 transition">
            ← Back to Homepage
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
