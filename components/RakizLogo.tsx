
import React from 'react';

const RakizLogo: React.FC<{ size?: string }> = ({ size = "w-24 h-24" }) => {
  return (
    <div className={`relative ${size} group`}>
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* The Logo Image via CSS */}
      <div className={`w-full h-full rakiz-logo-img relative z-10 transition-transform duration-300 group-hover:scale-110`}>
      </div>
    </div>
  );
};

export default RakizLogo;
