import React, { FC } from 'react';

interface IntroProps {
  className?: string;
}

const Intro: FC<IntroProps> = ({ className }) => {
  return (
    <div className={className ? className : ''}>
      <h1 className="text-pink-700 text-4xl md:text-5xl mb-6 font-bold">
        จับไพ่รุ้ง
      </h1>
      <p className="text-gray-700 text-lg sm:text-xl lg:text-2xl">
        เชื่อมโยงกับคุณภาพดีๆ จากไพ่รุ้ง
      </p>
    </div>
  );
}

export default Intro;
