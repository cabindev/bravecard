import React from 'react';
import Image from 'next/image';

const CloudLoading: React.FC = () => {
  return (
    <div className="relative w-32 h-32">
      <div className="absolute inset-0">
        <svg className="animate-spin-slow" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            stroke="#FDA4AF" 
            strokeWidth="8" 
            fill="none" 
            strokeDasharray="70 180"
          />
        </svg>
      </div>
      <div className="absolute inset-2 animate-float">
        <Image
          src="/cloud.png"
          alt="Loading Cloud"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default CloudLoading;