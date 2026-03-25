// src/app/layout.tsx
import "./globals.css";
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-slate-900 antialiased" suppressHydrationWarning>
        
        {/* Sticky Professional Navbar */}
        <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
                <span className="text-white font-black text-xl">S</span>
              </div>
              <h1 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
                Stay<span className="text-blue-600">Local</span>
              </h1>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-10">
              <Link href="/" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest">
                Find PG
              </Link>
              <Link href="/about" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest">
                Our Story
              </Link>
              <Link href="/contact" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest">
                Support
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Link href="/list-your-pg">
                <button className="hidden sm:block px-6 py-2.5 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                  List Property
                </button>
              </Link>
              <Link href="/login">
                <button className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-blue-600 shadow-lg shadow-slate-200 transition-all active:scale-95">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Spacer to push content below the fixed nav */}
        <div className="pt-20">
          {children}
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-white pt-20 pb-10 mt-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-16">
            <div>
              <h2 className="text-2xl font-black mb-6">STAYLOCAL</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                The most trusted PG network in India. We help you find verified homes with zero brokerage.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-blue-500 mb-6 uppercase tracking-widest text-xs">Explore</h4>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li><Link href="/" className="hover:text-white">Bangalore PGs</Link></li>
                <li><Link href="/" className="hover:text-white">Pune PGs</Link></li>
                <li><Link href="/" className="hover:text-white">Hyderabad PGs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-blue-500 mb-6 uppercase tracking-widest text-xs">Owner</h4>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li><Link href="/list-your-pg" className="hover:text-white font-bold text-blue-400">Add Property</Link></li>
                <li><Link href="/contact" className="hover:text-white">Partner with us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-blue-500 mb-6 uppercase tracking-widest text-xs">Support</h4>
              <p className="text-slate-300 text-sm">Email: hello@staylocal.in</p>
              <p className="text-slate-300 text-sm mt-2">HSR Layout, Bangalore</p>
            </div>
          </div>
          <p className="text-center text-slate-500 text-xs mt-10">© 2026 StayLocal Technologies. Built for 3x Growth.</p>
        </footer>
      </body>
    </html>
  );
}