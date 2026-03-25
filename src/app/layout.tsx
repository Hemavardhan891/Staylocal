// src/app/layout.tsx
import "./globals.css";
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-slate-900 antialiased" suppressHydrationWarning>
        
        {/* Modern Glassmorphic Navbar */}
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
                <span className="text-white font-black text-xl">S</span>
              </div>
              <h1 className="text-2xl font-black tracking-tighter text-slate-900">
                STAY<span className="text-blue-600">LOCAL</span>
              </h1>
            </Link>

            {/* Navigation Links - High Contrast */}
            <div className="hidden md:flex items-center gap-10">
              <Link href="/" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest">Find PG</Link>
              <Link href="/about" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest">Our Story</Link>
              <Link href="/contact" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest">Support</Link>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Link href="/list-your-pg">
                <button className="hidden sm:block px-6 py-2.5 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                  List Property
                </button>
              </Link>
              <button className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-blue-600 shadow-lg shadow-slate-200 transition-all active:scale-95">
                Sign In
              </button>
            </div>
          </div>
        </nav>

        {/* Spacer for Fixed Nav */}
        <div className="pt-20">
          {children}
        </div>

        {/* Professional Footer */}
        <footer className="bg-slate-900 text-white pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-16">
            <div className="col-span-1 md:col-span-1">
              <h2 className="text-2xl font-black mb-6">STAYLOCAL</h2>
              <p className="text-slate-400 leading-relaxed">
                The AI-powered PG network helping 10,000+ students find verified homes across India with zero brokerage.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-blue-500 mb-6 uppercase tracking-widest text-xs">Platform</h4>
              <ul className="space-y-4 text-slate-300 font-medium">
                <li><Link href="/" className="hover:text-white transition">Search Rooms</Link></li>
                <li><Link href="/list-your-pg" className="hover:text-white transition">Add Property</Link></li>
                <li><Link href="/about" className="hover:text-white transition">How it Works</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-blue-500 mb-6 uppercase tracking-widest text-xs">Trust</h4>
              <ul className="space-y-4 text-slate-300 font-medium">
                <li><Link href="/" className="hover:text-white transition">Verified Badge</Link></li>
                <li><Link href="/" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/" className="hover:text-white transition">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-blue-500 mb-6 uppercase tracking-widest text-xs">Contact</h4>
              <p className="text-slate-300 mb-4">HSR Layout, Sector 7<br/>Bangalore, India</p>
              <p className="text-white font-bold">hello@staylocal.in</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-10 text-center text-slate-500 text-sm">
            © 2026 StayLocal Technologies. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}