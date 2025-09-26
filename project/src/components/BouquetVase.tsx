const BouquetVase = () => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Decorative Vase */}
      <div className="relative">
        {/* Vase body */}
        <div 
          className="w-32 h-24 bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 rounded-b-full relative"
          style={{
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.2),
              inset 0 0 20px rgba(255, 255, 255, 0.3),
              inset 0 -10px 20px rgba(0, 0, 0, 0.1)
            `
          }}
        >
          {/* Vase rim */}
          <div 
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-36 h-4 bg-gradient-to-b from-amber-200 to-amber-300 rounded-full"
            style={{
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(255, 255, 255, 0.4)'
            }}
          />
          
          {/* Decorative pattern on vase */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full opacity-60" />
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full opacity-60" />
          
          {/* Vase highlight */}
          <div 
            className="absolute top-2 left-4 w-6 h-12 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-sm"
          />
        </div>
        
        {/* Vase base */}
        <div 
          className="w-36 h-3 bg-gradient-to-b from-amber-300 to-amber-400 rounded-full mt-1"
          style={{
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
          }}
        />
      </div>
      
      {/* Decorative elements around vase */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full animate-pulse"
            style={{
              animationDelay: `${i * 0.3}s`,
              boxShadow: '0 0 8px rgba(255, 192, 203, 0.6)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BouquetVase;