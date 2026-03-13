import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewAdModal from '../components/NewAdModal';
import AdDetailsModal from '../components/AdDetailsModal';
import EditAdModal from '../components/EditAdModal';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import api from '../api/axios';
import { isManager, extractErrors } from '../utils/auth';
import toast from 'react-hot-toast';

const Dashboard = () => {
<<<<<<< HEAD
  const userIsManager = isManager();

  const [announcements, setAnnouncements] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [types, setTypes] = useState([]);
=======
  const userRole = localStorage.getItem('role') || 'user';
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [adToEdit, setAdToEdit] = useState(null);
>>>>>>> 1672dbad6b480a561a1f6852e99e0943b216df50
  const [isLoading, setIsLoading] = useState(true);

<<<<<<< HEAD
  // Filters
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [ordering, setOrdering] = useState('-created_at');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 12;

  // Modals
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [editingAd, setEditingAd] = useState(null);

  const fetchAnnouncements = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        page_size: pageSize,
        ordering,
      };
      if (search) params.search = search;
      if (selectedDept) params.department = selectedDept;
      if (selectedType) params.type = selectedType;
      if (selectedStatus && userIsManager) params.status = selectedStatus;

      const { data } = await api.get('/announcements/', { params });
      setAnnouncements(data.data.results);
      setTotalPages(data.data.total_pages);
      setTotalCount(data.data.count);
    } catch (err) {
      toast.error(extractErrors(err));
    } finally {
      setIsLoading(false);
=======
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
>>>>>>> 1672dbad6b480a561a1f6852e99e0943b216df50
    }
  }, [currentPage, search, selectedDept, selectedType, selectedStatus, ordering, userIsManager]);

  const fetchFilters = useCallback(async () => {
    try {
      const [deptRes, typeRes] = await Promise.all([
        api.get('/departments/', { params: { page_size: 100 } }),
        api.get('/announcement-types/', { params: { page_size: 100 } }),
      ]);
      setDepartments(deptRes.data.data.results);
      setTypes(typeRes.data.data.results);
    } catch {
      // silently fail for filters
    }
  }, []);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  // Reset to page 1 when filters change
  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    try {
      await api.delete(`/announcements/${id}/`);
      toast.success('Announcement deleted.');
      fetchAnnouncements();
    } catch (err) {
      toast.error(extractErrors(err));
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchAnnouncements();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

<<<<<<< HEAD
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Announcements</h2>
            <p className="mt-1 text-sm text-gray-500">{totalCount} announcement{totalCount !== 1 ? 's' : ''} found</p>
          </div>

          {userIsManager && (
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all cursor-pointer group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              New Announcement
=======
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
>>>>>>> 1672dbad6b480a561a1f6852e99e0943b216df50
            </button>
          )}
        </div>

<<<<<<< HEAD
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search announcements..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
            </form>

            {/* Department filter */}
            <select
              value={selectedDept}
              onChange={(e) => handleFilterChange(setSelectedDept)(e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 px-3 py-2.5 outline-none cursor-pointer"
            >
              <option value="">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>

            {/* Type filter */}
            <select
              value={selectedType}
              onChange={(e) => handleFilterChange(setSelectedType)(e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 px-3 py-2.5 outline-none cursor-pointer"
            >
              <option value="">All Types</option>
              {types.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>

            {/* Status filter (manager only) */}
            {userIsManager && (
              <select
                value={selectedStatus}
                onChange={(e) => handleFilterChange(setSelectedStatus)(e.target.value)}
                className="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 px-3 py-2.5 outline-none cursor-pointer"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            )}

            {/* Ordering */}
            <select
              value={ordering}
              onChange={(e) => handleFilterChange(setOrdering)(e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 px-3 py-2.5 outline-none cursor-pointer"
            >
              <option value="-created_at">Newest First</option>
              <option value="created_at">Oldest First</option>
              <option value="title">Title A-Z</option>
              <option value="-title">Title Z-A</option>
              <option value="-updated_at">Recently Updated</option>
            </select>
          </div>
        </div>

        {/* Announcement List */}
=======
        {/* Elanlar Siyahısı */}
>>>>>>> 1672dbad6b480a561a1f6852e99e0943b216df50
        {isLoading ? (
          <Spinner />
        ) : announcements.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-500">No announcements found</h3>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters.</p>
          </div>
        ) : (
<<<<<<< HEAD
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {announcements.map((ad) => (
              <div
                key={ad.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 relative group flex flex-col"
              >
                {/* Manager Actions */}
                {userIsManager && (
                  <div className="absolute top-3 right-3 z-10 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditingAd(ad)}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-lg cursor-pointer"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(ad.id)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg cursor-pointer"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
=======
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
>>>>>>> 1672dbad6b480a561a1f6852e99e0943b216df50
                    </button>
                  </div>
                )}

<<<<<<< HEAD
                {/* Image */}
                <div className="h-48 overflow-hidden bg-gray-100">
                  {ad.image ? (
                    <img src={ad.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={ad.title} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-600 text-[10px] font-bold uppercase tracking-widest">{ad.department_name}</span>
                    <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-bold rounded text-gray-500">{ad.type_name}</span>
                  </div>

                  {/* Status badge for managers */}
                  {userIsManager && (
                    <span className={`self-start px-2 py-0.5 text-[10px] font-bold rounded mb-2 ${
                      ad.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {ad.status}
                    </span>
                  )}

                  <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2">{ad.title}</h3>

                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                      {new Date(ad.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">{ad.created_by_name}</p>
                  </div>

                  <button
                    onClick={() => setSelectedAd(ad)}
                    className="w-full mt-3 py-2.5 bg-gray-50 text-gray-900 text-sm font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
=======
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
>>>>>>> 1672dbad6b480a561a1f6852e99e0943b216df50
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>

<<<<<<< HEAD
      {/* Modals */}
      <NewAdModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onCreated={() => { setIsNewModalOpen(false); fetchAnnouncements(); }}
        departments={departments}
        types={types}
      />
      {selectedAd && (
        <AdDetailsModal
          adId={selectedAd.id}
          onClose={() => setSelectedAd(null)}
          onEdit={(ad) => { setSelectedAd(null); setEditingAd(ad); }}
          isManager={userIsManager}
        />
      )}
      {editingAd && (
        <EditAdModal
          ad={editingAd}
          onClose={() => setEditingAd(null)}
          onUpdated={() => { setEditingAd(null); fetchAnnouncements(); }}
          departments={departments}
          types={types}
        />
      )}
=======
      <Footer />

      <NewAdModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setAdToEdit(null); }} editData={adToEdit} />
      {selectedAd && <AdDetailsModal ad={selectedAd} onClose={() => setSelectedAd(null)} />}
>>>>>>> 1672dbad6b480a561a1f6852e99e0943b216df50
    </div>
  );
};

export default Dashboard;