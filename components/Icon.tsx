// components/Icon.tsx
import React from 'react';
import { IconProps } from '@/types/card';

const Icon: React.FC<IconProps> = ({ icon, className }) => {
  return <span className={className}>{icon}</span>;
};

export default Icon;
