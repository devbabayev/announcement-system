const AdDetailsModal = ({ ad, onClose }) => {
    if (!ad) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
          {/* Şəkil hissəsi */}
          <div className="h-64 bg-gray-200 relative">
            <img 
              src={ad.image || 'https://via.placeholder.com/600x400?text=Şəkil+Yoxdur'} 
              className="w-full h-full object-cover" 
              alt={ad.title} 
            />
            <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
  
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded uppercase">{ad.dept}</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">{ad.title}</h2>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-blue-600">{ad.price}</p>
                <p className="text-xs text-gray-400">Yaradıldı: {ad.date}</p>
              </div>
            </div>
  
            <div className="bg-gray-50 p-4 rounded-xl mb-6">
              <h4 className="text-sm font-bold text-gray-700 mb-2">Təsvir:</h4>
              <p className="text-gray-600 leading-relaxed">{ad.description}</p>
            </div>
  
            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  {ad.author[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{ad.author}</p>
                  <p className="text-xs text-gray-500">{ad.dept} nümayəndəsi</p>
                </div>
              </div>
              <button className="px-6 py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-black cursor-pointer">
                Əlaqə saxla
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AdDetailsModal;