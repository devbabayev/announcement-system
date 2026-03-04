import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tighter italic">UNİ-ELAN</span>
          </div>

          {/* Düymələr */}
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-5 py-2.5 bg-gray-50 text-gray-700 font-bold rounded-2xl border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all cursor-pointer group">
              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Hesabım</span>
            </button>
            
            <button className="flex items-center space-x-2 px-5 py-2.5 bg-white text-red-600 font-bold rounded-2xl border border-red-100 hover:bg-red-50 transition-all cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Çıxış et</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;