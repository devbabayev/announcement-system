import { useState } from 'react';
import toast from 'react-hot-toast';

const NewAdModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '', description: '', type: '', department: '', image: null
  });
  const [preview, setPreview] = useState(null);

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
    toast.success('Elan universitet sisteminə əlavə edildi!');
    onClose();
    setPreview(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 overflow-y-auto max-h-[95vh]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Yeni Elan Yarat</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Başlıq */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Elan Başlığı *</label>
            <input required type="text" placeholder="Məs: Payız imtahan sessiyası" 
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Elan Növü */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Növ *</label>
              <select required className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFormData({...formData, type: e.target.value})}>
                <option value="">Seçin...</option>
                <option value="Tədbir">Tədbir</option>
                <option value="İmtahan">İmtahan</option>
                <option value="Məlumat">Məlumat</option>
                <option value="Vakansiya">Daxili Vakansiya</option>
              </select>
            </div>
            {/* Struktur/Şöbə */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Şöbə/Fakültə *</label>
              <select required className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFormData({...formData, department: e.target.value})}>
                <option value="">Seçin...</option>
                <option value="Rektorat">Rektorat</option>
                <option value="IT Mərkəzi">IT Mərkəzi</option>
                <option value="Tələbə Şurası">Tələbə Şurası</option>
                <option value="Kitabxana">Kitabxana</option>
                <option value="Xarici Əlaqələr">Xarici Əlaqələr</option>
              </select>
            </div>
          </div>

          {/* MODERN FAYL SEÇİMİ (Custom File Input) */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Poster və ya Şəkil</label>
            <div className="relative group">
              <input 
                type="file" 
                accept="image/*" 
                id="file-upload"
                className="hidden" 
                onChange={handleImageChange} 
              />
              <label 
                htmlFor="file-upload" 
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 group-hover:bg-blue-50 group-hover:border-blue-400 transition-all"
              >
                {!preview ? (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    <p className="text-xs text-gray-500 font-semibold">Şəkil seçmək üçün klikləyin</p>
                  </div>
                ) : (
                  <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-2xl" />
                )}
              </label>
            </div>
          </div>

          {/* Təsvir */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Ətraflı Məlumat *</label>
            <textarea required rows="4" placeholder="Elan mətni bura yazılır..." 
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl cursor-pointer transition-all">Ləğv et</button>
            <button type="submit" className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 cursor-pointer transition-all">Elanı Paylaş</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAdModal;