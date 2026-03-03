const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Universitet Haqqında */}
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-xl font-extrabold text-blue-600 tracking-tight mb-4 italic">UNİ-ELAN</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Universitetimizin rəsmi elan və bildiriş platforması. Tələbə və müəllimlər üçün mərkəzləşdirilmiş məlumat mərkəzi.
              </p>
            </div>
  
            {/* Faydalı Linklər */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Faydalı Linklər</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Tədris Planı</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Kitabxana Sistemi</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Tələbə Portalı</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Akademik Təqvim</a></li>
              </ul>
            </div>
  
            {/* Struktur */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Struktur</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Rektorat</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">IT Mərkəzi</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Tələbə Şurası</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Beynəlxalq Əlaqələr</a></li>
              </ul>
            </div>
  
            {/* Əlaqə */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Əlaqə</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center">
                  <span className="font-medium text-gray-900 mr-2">Email:</span> info@uni-elan.edu.az
                </li>
                <li className="flex items-center">
                  <span className="font-medium text-gray-900 mr-2">Tel:</span> +994 12 000 00 00
                </li>
                <li className="mt-4 flex space-x-4">
                  {/* Sosial Şəbəkə İkonları (Placeholder) */}
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 cursor-pointer transition-all">
                      <span className="text-[10px] font-bold">FB</span>
                  </div>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-100 cursor-pointer transition-all">
                      <span className="text-[10px] font-bold">IG</span>
                  </div>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-50 cursor-pointer transition-all">
                      <span className="text-[10px] font-bold">IN</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
  
          {/* Alt Müəlliflik Hüququ */}
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-medium">
            <p>© {currentYear} Universitet Elan Sistemi. Bütün hüquqlar qorunur.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-600 transition-colors">Məxfilik Siyasəti</a>
              <a href="#" className="hover:text-gray-600 transition-colors">İstifadə Şərtləri</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;