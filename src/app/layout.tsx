// src/app/layout.tsx
import "./globals.css";
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'StayLocal | Premium PG Network',
  description: 'Find verified PGs in Bangalore, Chennai, Hyderabad, and Pune.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-slate-900 antialiased`}>
        
        {/* Sticky Glassmorphic Navbar */}
        <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-blue-200">
                <span className="text-white font-black text-xl">S</span>
              </div>
              <h1 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
                Stay<span className="text-blue-600">Local</span>
              </h1>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-10">
              <Link href="/" className="text-xs font-black text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-[0.2em]">Find PG</Link>
              <Link href="/about" className="text-xs font-black text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-[0.2em]">About</Link>
              <Link href="/contact" className="text-xs font-black text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-[0.2em]">Support</Link>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Link href="/list-your-pg">
                <button className="hidden sm:block px-6 py-2.5 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                  List Property
                </button>
              </Link>
              <Link href="/login">
                <button className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-blue-600 shadow-xl shadow-slate-200 transition-all active:scale-95">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Content Area */}
        <div className="pt-20">
          {children}
        </div>

        {/* Professional Footer */}
        <footer className="bg-slate-900 text-white pt-20 pb-10 mt-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-16">
            <div className="col-span-1 md:col-span-1">
              <h2 className="text-2xl font-black mb-6">STAYLOCAL</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                The AI-powered PG network helping students find verified homes across India with zero brokerage.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-blue-500 mb-6 uppercase tracking-widest text-[10px]">Cities</h4>
              <ul className="space-y-4 text-slate-300 text-sm font-medium">
                <li><Link href="/" className="hover:text-white transition">Bangalore</Link></li>
                <li><Link href="/" className="hover:text-white transition">Chennai</Link></li>
                <li><Link href="/" className="hover:text-white transition">Hyderabad</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-blue-500 mb-6 uppercase tracking-widest text-[10px]">Legal</h4>
              <ul className="space-y-4 text-slate-300 text-sm font-medium">
                <li><Link href="/" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/" className="hover:text-white transition">Terms of Use</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-blue-500 mb-6 uppercase tracking-widest text-[10px]">Contact</h4>
              <p className="text-slate-300 text-sm mb-4">HSR Layout, Sector 7<br/>Bangalore, India</p>
              <p className="text-white font-bold text-sm underline decoration-blue-500 underline-offset-4">hello@staylocal.in</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-10 text-center text-slate-500 text-xs font-bold tracking-widest uppercase">
            © 2026 StayLocal Technologies. Built for 3x Growth.
          </div>
        </footer>
      </body>
    </html>
  );
}