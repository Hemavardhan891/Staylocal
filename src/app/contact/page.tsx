// src/app/contact/page.tsx
import SEO from '@/components/SEO';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20 px-6">
      <SEO 
        title="Contact Us | Gharpayy Support" 
        description="Have questions about a PG? Contact the Gharpayy team for support and inquiries." 
        location="India"
      />

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border">
        {/* Left Side: Contact Info */}
        <div className="bg-blue-700 p-12 text-white md:w-2/5">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="opacity-80 mb-10 text-lg">Have a question or a feedback? We'd love to hear from you.</p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-2xl">📧</span>
              <p>support@gharpayy.com</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl">📞</span>
              <p>+91 12345 67890</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl">📍</span>
              <p>HSR Layout, Bangalore, KA</p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="p-12 md:w-3/5">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">FULL NAME</label>
                <input type="text" className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-blue-500" placeholder="Hema Vardhan" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">EMAIL ADDRESS</label>
                <input type="email" className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-blue-500" placeholder="hema@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">MESSAGE</label>
              <textarea rows={4} className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-blue-500" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-100">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}