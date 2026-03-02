import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  // Brauzerin yaddaşından istifadəçinin rolunu oxuyuruq
  const userRole = localStorage.getItem('role') || 'user';

  // Çıxış düyməsinə basılanda işə düşən funksiya
  const handleLogout = () => {
    // Yaddaşdakı saxta (və ya real) tokeni və rolu silirik
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Bizi yenidən Login səhifəsinə atır
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Sol tərəf: Loqo və Başlıq */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Elan Platforması</h1>
          </div>

          {/* Sağ tərəf: İstifadəçi rolu və Çıxış düyməsi */}
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${userRole === 'manager' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-green-100 text-green-700 border border-green-200'}`}>
              {userRole === 'manager' ? 'Menecer Hesabı' : 'İstifadəçi Hesabı'}
            </span>
            
            <button 
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Çıxış et
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;