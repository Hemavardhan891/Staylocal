// src/app/layout.tsx
import "./globals.css";
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900" suppressHydrationWarning>
        {/* Navigation Bar */}
        <nav className="p-4 bg-white border-b flex justify-between items-center sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-8">
            <Link href="/">
              <h1 className="text-2xl font-black text-blue-700 tracking-tighter">GHARPAYY</h1>
            </Link>
            <div className="hidden md:flex gap-6 text-sm font-bold text-gray-500 uppercase tracking-wide">
              <Link href="/" className="hover:text-blue-600 transition">Find PG</Link>
              <Link href="/about" className="hover:text-blue-600 transition">About</Link>
              <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/list-your-pg">
              <button className="hidden sm:block px-5 py-2 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition">
                List Your PG
              </button>
            </Link>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition">
              Login
            </button>
          </div>
        </nav>

        {/* Page Content */}
        {children}

        {/* Footer Section */}
        <footer className="bg-gray-900 text-white py-16 px-6 mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-black italic">GHARPAYY</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                India's most trusted PG reservation platform. We verify so you don't have to.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-blue-400">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-blue-400">Popular Cities</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/" className="hover:text-white">PG in Bangalore</Link></li>
                <li><Link href="/" className="hover:text-white">PG in Pune</Link></li>
                <li><Link href="/" className="hover:text-white">PG in Hyderabad</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-blue-400">Owner Zone</h4>
              <p className="text-gray-400 text-sm mb-4">Own a PG? Partner with us to get verified leads.</p>
              <Link href="/list-your-pg">
                <button className="w-full bg-white text-gray-900 py-2 rounded-lg font-bold text-sm">
                  Register Property
                </button>
              </Link>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
            © 2026 Gharpayy Technologies Pvt Ltd. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}