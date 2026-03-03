import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewAdModal from '../components/NewAdModal';
import AdDetailsModal from '../components/AdDetailsModal';
import Spinner from '../components/Spinner';

const Dashboard = () => {
  // LocalStorage-dən istifadəçi rolunu götürürük
  const userRole = localStorage.getItem('role') || 'user';
  
  // State idarəetməsi
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null); // Detal modalı üçün
  const [adToEdit, setAdToEdit] = useState(null);   // Redaktə modalı üçün
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState('Hamısı');

  // Nümunə universitet məlumatları
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
      title: 'Yeni Laboratoriya Avadanlıqlarının Təqdimatı', 
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

  // Filtrləmə məntiqi
  const filteredAds = selectedDept === 'Hamısı' 
    ? universityAds 
    : universityAds.filter(ad => ad.dept === selectedDept);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* ƏSAS MƏZMUN (flex-grow footer-i aşağı itələmək üçündür) */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* BAŞLIQ VƏ SÜZGƏC PANELI */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Universitet Elanları</h2>
            <div className="mt-3 flex items-center space-x-3">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Struktur:</span>
              <select 
                value={selectedDept} 
                onChange={(e) => setSelectedDept(e.target.value)} 
                className="bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer transition-all"
              >
                <option value="Hamısı">Bütün Bölmələr</option>
                <option value="Rektorat">Rektorat</option>
                <option value="IT Mərkəzi">IT Mərkəzi</option>
                <option value="Tələbə Şurası">Tələbə Şurası</option>
                <option value="Kitabxana">Kitabxana</option>
              </select>
            </div>
          </div>
          
          {/* Yalnız Manager Yeni Elan Düyməsini Görür */}
          {userRole === 'manager' && (
            <button 
              onClick={() => { setAdToEdit(null); setIsModalOpen(true); }} 
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all cursor-pointer transform active:scale-95"
            >
              + Yeni Elan Paylaş
            </button>
          )}
        </div>

        {/* ELANLAR ŞƏBƏKƏSİ */}
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {filteredAds.map((ad) => (
              <div key={ad.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all relative group">
                
                {/* MANAGER ÜÇÜN İDARƏETMƏ DÜYMƏLƏRİ - HƏMİŞƏ GÖRÜNÜR */}
                {userRole === 'manager' && (
                  <div className="absolute top-4 right-4 z-10 flex space-x-2">
                    <button 
                      onClick={() => { setAdToEdit(ad); setIsModalOpen(true); }} 
                      className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md border border-white/20 cursor-pointer transition-transform active:scale-90"
                      title="Redaktə et"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      className="p-2.5 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-md border border-white/20 cursor-pointer transition-transform active:scale-90"
                      title="Sil"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* ELAN ŞƏKLI */}
                <div className="h-52 overflow-hidden">
                  <img src={ad.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={ad.title} />
                </div>

                {/* ELAN MƏLUMATI */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-blue-600 text-[10px] font-bold uppercase tracking-widest">{ad.dept}</p>
                    <span className="px-2 py-0.5 bg-gray-100 text-[9px] font-bold rounded text-gray-400">{ad.date}</span>
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

      {/* FOOTER */}
      <Footer />

      {/* MODALLAR */}
      <NewAdModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setAdToEdit(null); }} 
        editData={adToEdit} 
      />
      
      {selectedAd && (
        <AdDetailsModal ad={selectedAd} onClose={() => setSelectedAd(null)} />
      )}
    </div>
  );
};

export default Dashboard;