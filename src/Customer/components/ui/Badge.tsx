import React from 'react';

export const Badge = ({ children, variant = 'gold' }: { children: React.ReactNode; variant?: 'gold' | 'green' | 'red' | 'gray' | 'blue' }) => {
  const styles = {
    gold: 'bg-[#FFF8ED] text-[#C89B3C] border-[#F5DEB3]',
    green: 'bg-[#F0FFF8] text-[#0D7A53] border-[#BCE3D1]',
    red: 'bg-[#FFF5F5] text-[#C0392B] border-[#F5BDB9]',
    gray: 'bg-[#F8F8F6] text-[#666] border-[#E6E6E6]',
    blue: 'bg-[#F0F5FF] text-[#3B5BDB] border-[#B4C6FB]',
  };
  return <span className={`inline-flex items-center text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${styles[variant]}`}>{children}</span>;
};
