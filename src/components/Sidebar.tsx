import React from 'react';
import { Home, Share2 } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40">
      <div className="bg-black/80 backdrop-blur-sm rounded-full p-3 space-y-4 border border-gray-800">
        {/* Home Button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-100 transition-colors"
        >
          <Home size={20} />
        </button>
        
        {/* Share/Network Button */}
        <button 
          className="w-12 h-12 rounded-full bg-transparent flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;