import SEO from '@/components/SEO';
import { supabase } from '@/lib/supabase';

export default async function PGDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Fetch PG data from Supabase
  const { data: pg } = await supabase.from('pgs').select('*').eq('id', id).single();

  if (!pg) return <div className="p-20 text-center font-bold">PG Not Found</div>;

  return (
    <main className="min-h-screen bg-white pb-20 pt-10">
      <SEO title={`${pg.name} | StayLocal`} description={`Book ${pg.name} in ${pg.location}.`} location={pg.location} />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <img src={pg.image_url} className="w-full h-[500px] object-cover rounded-[3rem] shadow-2xl mb-10" />
          
          <h1 className="text-5xl font-black text-slate-900 mb-4">{pg.name}</h1>
          <p className="text-xl text-slate-500 font-medium mb-10">📍 {pg.location}</p>

          <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100">
            <h2 className="text-2xl font-black mb-6">About this Property</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Experience premium living at {pg.name}. Located in the prime area of {pg.location}, this property offers verified amenities and 24/7 security.
            </p>

            {/* MAP SECTION */}
            <div className="mt-12">
              <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-blue-600">Location Map</h3>
              <div className="w-full h-[400px] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
                <iframe
                  width="100%" height="100%" style={{ border: 0 }} loading="lazy"
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY_HERE&q=${encodeURIComponent(pg.name + " " + pg.location)}`}
                ></iframe>
              </div>
              <p className="mt-4 text-sm text-slate-400 font-bold italic text-center">
                * Exact location shared after booking verification.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-32 p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl">
             <p className="text-slate-400 font-black uppercase text-xs mb-2 tracking-widest">Monthly Rent</p>
             <h2 className="text-5xl font-black text-blue-600 mb-8">₹{pg.price.toLocaleString()}</h2>
             <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xl shadow-lg shadow-blue-100 hover:bg-slate-900 transition-all">
                Book Site Visit
             </button>
          </div>
        </div>
      </div>
    </main>
  );
}