import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NewAdModal from '../components/NewAdModal';
import AdDetailsModal from '../components/AdDetailsModal';
import Spinner from '../components/Spinner';

const Dashboard = () => {
  // LocalStorage-dən rolu götürürük (default olaraq 'user')
  const userRole = localStorage.getItem('role') || 'user';
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState('Hamısı');

  // UNİVERSİTET ÜÇÜN SAXTA MƏLUMATLAR
  const universityAds = [
    { 
      id: 1, 
      title: 'Payız Semestri İmtahan Cədvəli', 
      status: 'approved', 
      author: 'Tədris Şöbəsi', 
      dept: 'Rektorat', 
      type: 'İmtahan', 
      date: '02.03.2026',
      description: '2025/2026-cı tədris ilinin payız semestri üzrə imtahan cədvəli artıq portalda yerləşdirilib.',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 2, 
      title: 'Tələbə Elmi Cəmiyyətinin Toplantısı', 
      status: 'approved', 
      author: 'Tələbə Şurası', 
      dept: 'Tələbə Şurası', 
      type: 'Tədbir', 
      date: '01.03.2026',
      description: 'Gələn həftənin cümə günü saat 15:00-da akt zalında növbəti toplantı keçiriləcək.',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredAds = selectedDept === 'Hamısı' 
    ? universityAds 
    : universityAds.filter(ad => ad.dept === selectedDept);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ÜST HİSSƏ: BAŞLIQ VƏ FİLTR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Universitet Elanları</h2>
            <div className="mt-3 flex items-center space-x-3">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Struktur:</span>
              <select 
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-white border-0 shadow-sm ring-1 ring-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 p-2 outline-none cursor-pointer"
              >
                <option value="Hamısı">Bütün Bölmələr</option>
                <option value="Rektorat">Rektorat</option>
                <option value="IT Mərkəzi">IT Mərkəzi</option>
                <option value="Tələbə Şurası">Tələbə Şurası</option>
                <option value="Kitabxana">Kitabxana</option>
              </select>
            </div>
          </div>
          
          {/* SƏLAHİYYƏT YOXLANILMASI: Yalnız manager görür */}
          {userRole === 'manager' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all cursor-pointer group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              Yeni Elan Paylaş
            </button>
          )}
        </div>

        {/* ELANLARIN SİYAHISI */}
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAds.map((ad) => (
              <div key={ad.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 relative group">
                
                {/* MANAGER ÜÇÜN SİLMƏ DÜYMƏSİ */}
                {userRole === 'manager' && (
                  <button className="absolute top-4 right-4 z-10 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-600 shadow-lg" title="Elanı Sil">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                )}

                <div className="h-52 overflow-hidden">
                  <img src={ad.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={ad.title} />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-blue-600 text-[10px] font-bold uppercase tracking-widest">{ad.dept}</p>
                    <span className="px-2 py-0.5 bg-gray-100 text-[9px] font-bold rounded text-gray-500">{ad.type}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight mb-4 line-clamp-2 h-14">{ad.title}</h3>
                  
                  <button 
                    onClick={() => setSelectedAd(ad)}
                    className="w-full py-3 bg-gray-50 text-gray-900 text-sm font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                  >
                    Detallara Bax
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* MODALLAR */}
      <NewAdModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {selectedAd && <AdDetailsModal ad={selectedAd} onClose={() => setSelectedAd(null)} />}
    </div>
  );
};

export default Dashboard;