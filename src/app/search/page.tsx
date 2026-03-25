// src/app/search/page.tsx
export default function SearchPage() {
  const samplePGs = [
    { id: 1, name: "Zolo Stays - HSR", price: "12,000", type: "Boys" },
    { id: 2, name: "Stanza Living - Koramangala", price: "15,000", type: "Girls" }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Search Results</h1>
      <div className="space-y-4">
        {samplePGs.map((pg) => (
          <div key={pg.id} className="p-4 border rounded-lg flex justify-between items-center bg-white shadow-sm">
            <div>
              <h2 className="font-semibold text-lg">{pg.name}</h2>
              <p className="text-gray-500">{pg.type} PG</p>
            </div>
            <div className="text-right">
              <p className="text-blue-600 font-bold">₹{pg.price}/mo</p>
              <button className="text-sm bg-blue-50 px-3 py-1 rounded mt-2 border border-blue-200">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}