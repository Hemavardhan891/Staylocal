'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Authenticating...');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMsg(error.message);
    } else {
      setMsg('Success! Redirecting...');
      window.location.href = '/'; // Go back to dashboard after sign in
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-50 p-6">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-12 rounded-[3rem] shadow-2xl">
        <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tighter">Sign In.</h2>
        <input 
          type="email" placeholder="Email" className="w-full p-4 mb-4 border rounded-2xl outline-none focus:border-blue-600"
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" placeholder="Password" className="w-full p-4 mb-6 border rounded-2xl outline-none focus:border-blue-600"
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-2xl font-black shadow-lg shadow-blue-200">
          Enter StayLocal
        </button>
        {msg && <p className="mt-4 text-center text-sm font-bold text-red-500">{msg}</p>}
      </form>
    </div>
  );
}