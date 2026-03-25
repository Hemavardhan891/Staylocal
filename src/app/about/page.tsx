// src/app/about/page.tsx
import SEO from '@/components/SEO';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <SEO 
        title="About Us | Gharpayy - India's Trusted PG Network" 
        description="Learn how Gharpayy is revolutionizing the PG search experience for students and professionals." 
        location="India"
      />
      
      <div className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-5xl font-black text-blue-800 mb-6">Our Mission</h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-10">
          Finding a home away from home shouldn't be a struggle. Gharpayy was born out of 
          the frustration of hidden brokerage fees, unverified photos, and unreliable roommates. 
          We are here to provide a transparent, tech-first PG booking experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">100% Verified</h3>
            <p className="text-gray-500">Every PG on our platform is physically visited by our team to ensure what you see is what you get.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Zero Brokerage</h3>
            <p className="text-gray-500">We believe in direct connections. You talk to owners, not middlemen. No hidden charges, ever.</p>
          </div>
        </div>

        <div className="mt-20 p-10 bg-blue-50 rounded-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to find your stay?</h2>
          <a href="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
            Browse PGs Now
          </a>
        </div>
      </div>
    </main>
  );
}