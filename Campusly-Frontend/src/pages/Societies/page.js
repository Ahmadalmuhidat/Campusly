import { useEffect, useState } from 'react';
import SocietyCard from './Components/SocietyCard';
import SocietyInsights from '../../shared/components/SocietyInsights';
import AxiosClient from '../../config/axios';

export default function Societies() {
  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getSocieties = async () => {
    try {
      setLoading(true);
      const response = await AxiosClient.get("/societies");

      if (response.status === 200) {
        setSocieties(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch societies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSocieties();
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const filteredSocieties = societies.filter(society =>
    society.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    society.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    society.Category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className={`min-h-screen py-10 sm:py-12 px-4 sm:px-6 lg:px-8 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Main Content */}
          <div className="xl:w-3/4">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Societies</h1>
                <p className="text-gray-500">Discover and join student-led communities</p>
              </div>

              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search societies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all outline-none"
                />
                <svg className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="mb-12">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                      <div className="h-44 w-full bg-gray-200"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredSocieties.length === 0 ? (
                    <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                      <div className="text-gray-300 mb-4 text-6xl">🔍</div>
                      <p className="text-gray-500 text-lg font-medium">No societies found matching "{searchTerm}"</p>
                      <button
                        onClick={() => setSearchTerm('')}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        Clear search
                      </button>
                    </div>
                  ) : (
                    filteredSocieties.map((society) => <SocietyCard key={society.ID} {...society} />)
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:w-1/4 space-y-6">
            <div className="sticky top-8">
              <SocietyInsights societies={filteredSocieties} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
