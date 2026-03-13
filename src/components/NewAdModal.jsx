<<<<<<< HEAD
import { useState } from 'react';
import api from '../api/axios';
import { extractErrors } from '../utils/auth';
import toast from 'react-hot-toast';

const NewAdModal = ({ isOpen, onClose, onCreated, departments = [], types = [] }) => {
=======
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const NewAdModal = ({ isOpen, onClose, editData = null }) => {
>>>>>>> 1672dbad6b480a561a1f6852e99e0943b216df50
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    department: '',
    status: 'active',
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redaktə rejimi üçün məlumatları xanalara doldururuq
  useEffect(() => {
    if (editData && isOpen) {
      setFormData({
        title: editData.title || '',
        description: editData.description || '',
        type: editData.type || '',
        department: editData.dept || '',
        image: editData.image || null
      });
      setPreview(editData.image || null);
    } else if (isOpen) {
      // Yeni elan üçün təmizləyirik
      setFormData({ title: '', description: '', type: '', department: '', image: null });
      setPreview(null);
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be under 5MB.');
        return;
      }
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    setError('');
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('description', formData.description);
      payload.append('type', formData.type);
      payload.append('department', formData.department);
      payload.append('status', formData.status);
      if (formData.image) {
        payload.append('image', formData.image);
      }

      await api.post('/announcements/', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Announcement created!');
      // Reset form
      setFormData({ title: '', description: '', type: '', department: '', status: 'active', image: null });
      setPreview(null);
      onCreated?.();
    } catch (err) {
      setError(extractErrors(err));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ title: '', description: '', type: '', department: '', status: 'active', image: null });
    setPreview(null);
    setError('');
=======
    // Gələcəkdə burada API sorğusu olacaq (POST və ya PUT)
    toast.success(editData ? 'Elan uğurla yeniləndi!' : 'Yeni elan universitet sisteminə əlavə edildi!');
>>>>>>> 1672dbad6b480a561a1f6852e99e0943b216df50
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 overflow-y-auto max-h-[95vh]">
<<<<<<< HEAD
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">New Announcement</h2>
          <button onClick={handleClose} className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-md mb-4">
            <p className="text-sm text-red-700 font-medium whitespace-pre-line">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Title *</label>
            <input
              required
              type="text"
              minLength={3}
              maxLength={255}
              placeholder="Announcement title"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Type */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Type *</label>
              <select
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="">Select...</option>
                {types.filter(t => t.is_active).map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            {/* Department */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Department *</label>
              <select
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              >
                <option value="">Select...</option>
                {departments.filter(d => d.is_active).map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
=======
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {editData ? 'Elanı Redaktə Et' : 'Yeni Elan Yarat'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Elan Başlığı *</label>
            <input required type="text" value={formData.title}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
              onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Növ *</label>
              <select required value={formData.type} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none"
                onChange={(e) => setFormData({...formData, type: e.target.value})}>
                <option value="">Seçin...</option>
                <option value="Tədbir">Tədbir</option>
                <option value="İmtahan">İmtahan</option>
                <option value="Məlumat">Məlumat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Şöbə/Fakültə *</label>
              <select required value={formData.department} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none"
                onChange={(e) => setFormData({...formData, department: e.target.value})}>
                <option value="">Seçin...</option>
                <option value="Rektorat">Rektorat</option>
                <option value="IT Mərkəzi">IT Mərkəzi</option>
                <option value="Tələbə Şurası">Tələbə Şurası</option>
                <option value="Kitabxana">Kitabxana</option>
>>>>>>> 1672dbad6b480a561a1f6852e99e0943b216df50
              </select>
            </div>
          </div>

<<<<<<< HEAD
          {/* Status */}
=======
>>>>>>> 1672dbad6b480a561a1f6852e99e0943b216df50
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
            <select
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Image (optional)</label>
            <div className="relative group">
<<<<<<< HEAD
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                id="file-upload-new"
                className="hidden"
                onChange={handleImageChange}
              />
              <label
                htmlFor="file-upload-new"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 group-hover:bg-blue-50 group-hover:border-blue-400 transition-all"
              >
                {!preview ? (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-xs text-gray-500 font-semibold">Click to upload image (JPG, PNG, GIF, WEBP - max 5MB)</p>
=======
              <input type="file" accept="image/*" id="file-upload" className="hidden" onChange={handleImageChange} />
              <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 group-hover:bg-blue-50 transition-all">
                {!preview ? (
                  <div className="text-center">
                    <p className="text-xs text-gray-500 font-semibold">Şəkil seçmək üçün klikləyin</p>
>>>>>>> 1672dbad6b480a561a1f6852e99e0943b216df50
                  </div>
                ) : (
                  <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-2xl" />
                )}
              </label>
              {preview && (
                <button
                  type="button"
                  onClick={() => { setFormData({ ...formData, image: null }); setPreview(null); }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

<<<<<<< HEAD
          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Description *</label>
            <textarea
              required
              rows="4"
              minLength={10}
              placeholder="Detailed description (min 10 characters)..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl cursor-pointer transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Announcement'}
=======
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Ətraflı Məlumat *</label>
            <textarea required rows="4" value={formData.description}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none resize-none"
              onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl cursor-pointer">Ləğv et</button>
            <button type="submit" className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg cursor-pointer transition-all">
              {editData ? 'Yadda Saxla' : 'Elanı Paylaş'}
>>>>>>> 1672dbad6b480a561a1f6852e99e0943b216df50
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAdModal;