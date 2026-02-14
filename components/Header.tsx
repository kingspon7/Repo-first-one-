
import React from 'react';
import { TurtleIcon } from './IconComponents';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#161B24] border-b border-[#2C3241] p-3">
      <div className="container mx-auto flex items-center gap-3">
        <TurtleIcon className="w-7 h-7 text-[#0066FF]" />
        <h1 className="text-xl font-bold text-white tracking-wider">
          Turtle Trading Bot
        </h1>
      </div>
    </header>
  );
};
