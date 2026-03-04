import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewAdModal from '../components/NewAdModal';
import AdDetailsModal from '../components/AdDetailsModal';
import Spinner from '../components/Spinner';

const Dashboard = () => {
  const userRole = localStorage.getItem('role') || 'user';
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [adToEdit, setAdToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState('Hamısı');

  const universityAds = [
    { 
      id: 1, 
      title: 'Payız Semestri İmtahan Cədvəli', 
      author: 'Tədris Şöbəsi', 
      dept: 'Rektorat', 
      type: 'İmtahan', 
      date: '02.03.2026',
      description: '2025/2026-cı tədris ilinin payız semestri üzrə imtahan cədvəli portalda yerləşdirilib.',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 2, 
      title: 'Tələbə Elmi Cəmiyyətinin Toplantısı', 
      author: 'Tələbə Şurası', 
      dept: 'Tələbə Şurası', 
      type: 'Tədbir', 
      date: '01.03.2026',
      description: 'Gələn həftənin cümə günü saat 15:00-da akt zalında növbəti toplantı keçiriləcək.',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 3, 
      title: 'Yeni Laboratoriya Avadanlıqlarının Təqdimatı Və Gələcək Texnologiyalar Seminarı', 
      author: 'IT Mərkəzi', 
      dept: 'IT Mərkəzi', 
      type: 'Tədbir', 
      date: '03.03.2026',
      description: 'Yeni nəsil server və şəbəkə avadanlıqları ilə tanışlıq günü.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Üst Panel */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 opacity-0 animate-fade-in-up">
          <div className="space-y-5 text-left">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Universitet Elanları</h2>
            <div className="relative inline-block">
              <select 
                value={selectedDept} 
                onChange={(e) => setSelectedDept(e.target.value)} 
                className="appearance-none bg-white border-2 border-gray-100 text-gray-700 font-bold rounded-2xl py-3.5 pl-6 pr-14 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 shadow-sm cursor-pointer transition-all hover:bg-gray-50"
              >
                <option value="Hamısı">Bütün Bölmələr</option>
                <option value="Rektorat">Rektorat</option>
                <option value="IT Mərkəzi">IT Mərkəzi</option>
                <option value="Tələbə Şurası">Tələbə Şurası</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
          
          {userRole === 'manager' && (
            <button 
              onClick={() => { setAdToEdit(null); setIsModalOpen(true); }} 
              className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all cursor-pointer transform active:scale-95"
            >
              + Yeni Elan Paylaş
            </button>
          )}
        </div>

        {/* Elanlar Siyahısı */}
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-16 text-left">
            {filteredAds.map((ad, index) => (
              <div 
                key={ad.id} 
                className="opacity-0 animate-fade-in-up bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative group flex flex-col"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                
                {userRole === 'manager' && (
                  <div className="absolute top-6 right-6 z-10 flex space-x-2">
                    <button 
                      onClick={() => { setAdToEdit(ad); setIsModalOpen(true); }} 
                      className="p-3 bg-white/90 backdrop-blur text-blue-600 rounded-full hover:bg-blue-600 hover:text-white shadow-lg transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button 
                      onClick={() => window.confirm("Silmək istədiyinizə əminsiniz?")}
                      className="p-3 bg-white/90 backdrop-blur text-red-600 rounded-full hover:bg-red-600 hover:text-white shadow-lg transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                )}

                <div className="h-64 overflow-hidden relative">
                  <img src={ad.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={ad.title} />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/95 backdrop-blur text-blue-700 text-[11px] font-black uppercase tracking-widest rounded-xl shadow-sm border border-white">
                      {ad.dept}
                    </span>
                  </div>
                </div>

                <div className="p-9 flex flex-col flex-grow">
                  <div className="flex items-center text-gray-400 text-xs font-bold mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {ad.date}
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 leading-tight mb-8 flex-grow">
                    {ad.title}
                  </h3>
                  
                  <button 
                    onClick={() => setSelectedAd(ad)} 
                    className="w-full py-4.5 bg-gray-900 text-white text-sm font-black rounded-2xl hover:bg-blue-600 shadow-xl transition-all cursor-pointer"
                  >
                    Detallara Bax
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      <NewAdModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setAdToEdit(null); }} editData={adToEdit} />
      {selectedAd && <AdDetailsModal ad={selectedAd} onClose={() => setSelectedAd(null)} />}
    </div>
  );
};

export default Dashboard;