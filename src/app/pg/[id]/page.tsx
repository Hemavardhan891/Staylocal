// src/app/pg/[id]/page.tsx
import SEO from '@/components/SEO';
import Link from 'next/link';

export default async function PGDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const pgId = resolvedParams.id;

  // Clean name for display
  const displayName = pgId.replace(/-/g, ' ');

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <SEO 
        title={`${displayName} | Gharpayy Verified PG`} 
        description={`Book a stay at ${displayName}. Best amenities and zero brokerage.`}
        location="India"
      />

      {/* Navigation Breadcrumb */}
      <div className="max-w-6xl mx-auto p-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> / 
        <Link href="/" className="hover:text-blue-600 ml-1">Bangalore</Link> / 
        <span className="ml-1 capitalize">{displayName}</span>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
        
        {/* Left Column: PG Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border">
            <div className="h-96 bg-gray-200 relative">
               <img 
                 src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800" 
                 className="w-full h-full object-cover" 
                 alt={displayName}
               />
               <div className="absolute bottom-4 left-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                 Available Now
               </div>
            </div>
            
            <div className="p-8">
              <h1 className="text-4xl font-black capitalize text-gray-900">{displayName}</h1>
              <p className="text-gray-500 mt-2 flex items-center gap-2">
                📍 Premium Locality, Bangalore
              </p>

              <div className="flex gap-4 mt-8">
                <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold text-sm">Wifi Included</span>
                <span className="bg-orange-50 text-orange-700 px-4 py-2 rounded-xl font-bold text-sm">3 Meals Daily</span>
                <span className="bg-purple-50 text-purple-700 px-4 py-2 rounded-xl font-bold text-sm">Attached Bath</span>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">About this PG</h2>
                <p className="text-gray-600 leading-relaxed">
                  Located in the heart of the city, this {displayName} offers a comfortable and secure stay for professionals and students. 
                  With 24/7 security, high-speed internet, and home-cooked meals, we ensure you feel right at home.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 sticky top-24">
            <h3 className="text-2xl font-bold mb-1">Book a Visit</h3>
            <p className="text-gray-500 text-sm mb-6">Schedule a free site visit today</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Your Name</label>
                <input type="text" placeholder="Hema Vardhan" className="w-full mt-1 p-3 bg-gray-50 border rounded-xl outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Phone Number</label>
                <input type="tel" placeholder="+91 98765 43210" className="w-full mt-1 p-3 bg-gray-50 border rounded-xl outline-none focus:border-blue-500" />
              </div>
              <div className="pt-4">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Monthly Rent</span>
                    <span className="font-bold text-green-600">₹12,000</span>
                </div>
                <div className="flex justify-between mb-4 pb-4 border-b">
                    <span className="text-gray-500">Security Deposit</span>
                    <span className="font-bold text-gray-900">₹12,000</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 transition-all">
                Send Inquiry
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">
                By clicking, you agree to Gharpayy's Terms of Service.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}