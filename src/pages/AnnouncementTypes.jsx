import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import api from '../api/axios';
import { extractErrors, isManager } from '../utils/auth';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const AnnouncementTypes = () => {
  if (!isManager()) return <Navigate to="/" replace />;

  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [ordering, setOrdering] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', is_active: true });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const fetchTypes = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page: currentPage, page_size: pageSize, ordering };
      if (search) params.search = search;
      const { data } = await api.get('/announcement-types/', { params });
      setTypes(data.data.results);
      setTotalPages(data.data.total_pages);
    } catch (err) {
      toast.error(extractErrors(err));
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, ordering]);

  useEffect(() => { fetchTypes(); }, [fetchTypes]);

  const openCreate = () => {
    setEditing(null);
    setFormData({ name: '', description: '', is_active: true });
    setFormError('');
    setModalOpen(true);
  };

  const openEdit = (type) => {
    setEditing(type);
    setFormData({ name: type.name, description: type.description || '', is_active: type.is_active });
    setFormError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    try {
      if (editing) {
        await api.put(`/announcement-types/${editing.id}/`, formData);
        toast.success('Announcement type updated!');
      } else {
        await api.post('/announcement-types/', formData);
        toast.success('Announcement type created!');
      }
      setModalOpen(false);
      fetchTypes();
    } catch (err) {
      setFormError(extractErrors(err));
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this announcement type?')) return;
    try {
      await api.delete(`/announcement-types/${id}/`);
      toast.success('Announcement type deleted!');
      fetchTypes();
    } catch (err) {
      toast.error(extractErrors(err));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Announcement Types</h2>
          <button
            onClick={openCreate}
            className="flex items-center px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            New Type
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search types..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
            />
          </div>
          <select
            value={ordering}
            onChange={(e) => { setOrdering(e.target.value); setCurrentPage(1); }}
            className="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 px-3 py-2.5 outline-none cursor-pointer"
          >
            <option value="name">Name A-Z</option>
            <option value="-name">Name Z-A</option>
            <option value="-created_at">Newest First</option>
            <option value="created_at">Oldest First</option>
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <Spinner />
        ) : types.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No announcement types found.</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Description</th>
                    <th className="text-center px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-center px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Announcements</th>
                    <th className="text-right px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {types.map((type) => (
                    <tr key={type.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{type.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell max-w-xs truncate">{type.description || '—'}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded ${type.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {type.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">{type.announcement_count}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => openEdit(type)} className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer">Edit</button>
                        <button onClick={() => handleDelete(type.id)} className="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">{editing ? 'Edit Announcement Type' : 'New Announcement Type'}</h3>
                <button onClick={() => setModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {formError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-md mb-4">
                  <p className="text-sm text-red-700 font-medium whitespace-pre-line">{formError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Name *</label>
                  <input
                    required
                    type="text"
                    maxLength={100}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                  <textarea
                    rows="3"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="type-active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="type-active" className="text-sm font-medium text-gray-700 cursor-pointer">Active</label>
                </div>
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl cursor-pointer">Cancel</button>
                  <button type="submit" disabled={formLoading} className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                    {formLoading ? 'Saving...' : editing ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AnnouncementTypes;
