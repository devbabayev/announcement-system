const Spinner = () => {
    return (
      <div className="flex flex-col justify-center items-center py-20 space-y-4">
        {/* Fırlanan göy dairə */}
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600"></div>
        <p className="text-gray-500 font-medium">Məlumatlar yüklənir...</p>
      </div>
    );
  };
  
  export default Spinner;