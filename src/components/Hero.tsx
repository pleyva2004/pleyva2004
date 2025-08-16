import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="text-center max-w-2xl mx-auto">
        {/* Profile Photo */}
        <div className="mb-6">
          <img 
            src="/pablo_leyva_casual.jpg"
            alt="Profile" 
            className="w-80 h-80 rounded-full mx-auto border-4 border-white/10 shadow-2xl"
          />
        </div>

        {/* Quote Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <blockquote className="text-gray-800 text-base italic leading-relaxed">
            "Build what you wish existed. Stay curious. Keep it real."
          </blockquote>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;