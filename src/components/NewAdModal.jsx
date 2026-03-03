import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const NewAdModal = ({ isOpen, onClose, editData = null }) => {
  const [formData, setFormData] = useState({
    title: '', description: '', type: '', department: '', image: null
  });
  const [preview, setPreview] = useState(null);

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
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gələcəkdə burada API sorğusu olacaq (POST və ya PUT)
    toast.success(editData ? 'Elan uğurla yeniləndi!' : 'Yeni elan universitet sisteminə əlavə edildi!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 overflow-y-auto max-h-[95vh]">
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
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Poster və ya Şəkil</label>
            <div className="relative group">
              <input type="file" accept="image/*" id="file-upload" className="hidden" onChange={handleImageChange} />
              <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 group-hover:bg-blue-50 transition-all">
                {!preview ? (
                  <div className="text-center">
                    <p className="text-xs text-gray-500 font-semibold">Şəkil seçmək üçün klikləyin</p>
                  </div>
                ) : (
                  <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-2xl" />
                )}
              </label>
            </div>
          </div>

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
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAdModal;