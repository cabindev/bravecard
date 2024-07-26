import React from 'react';
import { motion } from 'framer-motion';

const BraveLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="relative w-40 h-40">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0"
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="rainbow" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#FF9AA2" />
                <stop offset="25%" stopColor="#FFB7B2" />
                <stop offset="50%" stopColor="#FFDAC1" />
                <stop offset="75%" stopColor="#E2F0CB" />
                <stop offset="100%" stopColor="#B5EAD7" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#rainbow)"
              strokeWidth="8"
              fill="none"
              strokeDasharray="70 180"
            />
          </svg>
        </motion.div>
        <motion.div
          animate={{
            color: ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex items-center justify-center text-4xl font-bold"
        >
          BRAVE
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center"
      >
        <div className="text-gray-700 text-xl md:text-3xl">
        <p>ไพ่กล้าของคุณคือ<span className="loading-dots"></span></p>
        </div>
      </motion.div>
    </div>
  );
};

export default BraveLoading;