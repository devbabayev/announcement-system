import { useState, useEffect } from 'react';
import api from '../api/axios';
import Spinner from './Spinner';

const AdDetailsModal = ({ adId, onClose, onEdit, isManager }) => {
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const { data } = await api.get(`/announcements/${adId}/`);
        setAd(data);
      } catch {
        setAd(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [adId]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 text-center">
          <p className="text-gray-500">Announcement not found.</p>
          <button onClick={onClose} className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg font-bold cursor-pointer">Close</button>
        </div>
      </div>
    );
  }

  const deptName = typeof ad.department === 'object' ? ad.department.name : ad.department_name;
  const typeName = typeof ad.type === 'object' ? ad.type.name : ad.type_name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
        {/* Image */}
        <div className="h-64 bg-gray-200 relative">
          {ad.image ? (
            <img src={ad.image} className="w-full h-full object-cover" alt={ad.title} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded uppercase">{deptName}</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded">{typeName}</span>
            <span className={`px-2 py-1 text-xs font-bold rounded ${ad.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {ad.status}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">{ad.title}</h2>

          <div className="bg-gray-50 p-4 rounded-xl mb-6">
            <h4 className="text-sm font-bold text-gray-700 mb-2">Description</h4>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{ad.description}</p>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                {ad.created_by_name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{ad.created_by_name}</p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(ad.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            {isManager && (
              <button
                onClick={() => onEdit?.(ad)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetailsModal;