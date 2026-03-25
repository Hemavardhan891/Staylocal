// src/app/page.tsx
import SEO from '../components/SEO';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SEO 
        title="Gharpayy | Best PGs in India - No Brokerage" 
        description="Book verified PGs in Bangalore, Pune, and Hyderabad. High-speed WiFi, 3 meals, and zero brokerage." 
        location="India"
      />
      
      {/* Hero Section */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h1 className="text-5xl font-extrabold mb-4">Find Your Perfect PG</h1>
        <p className="text-xl opacity-90">Verified listings. Zero stress.</p>
        
        <div className="mt-8 max-w-2xl mx-auto flex p-2 bg-white rounded-lg shadow-xl">
          <input 
            type="text" 
            placeholder="Search by city or locality..." 
            className="flex-1 p-3 text-black outline-none"
          />
          <button className="bg-orange-500 px-8 py-3 rounded-md font-bold hover:bg-orange-600 transition">
            Search
          </button>
        </div>
      </section>

      {/* Featured Cities */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8">Top Cities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {['Bangalore', 'Pune', 'Hyderabad', 'Delhi'].map((city) => (
            <div key={city} className="p-8 bg-white border rounded-xl hover:border-blue-500 cursor-pointer transition">
              <p className="font-bold text-lg">{city}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
