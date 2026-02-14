
import React from 'react';
import { BotStatus } from '../types';
import { PlayIcon, StopIcon } from './IconComponents';

interface BotControlProps {
  status: BotStatus;
  onStart: () => void;
  onStop: () => void;
  currentPrice: number;
}

export const BotControl: React.FC<BotControlProps> = ({ status, onStart, onStop, currentPrice }) => {
  const isRunning = status === BotStatus.RUNNING;

  return (
    <div className="bg-[#161B24] p-4 rounded-md border border-[#2C3241]">
      <h2 className="text-lg font-bold text-white mb-4">Trade Terminal</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[#78869E] text-sm">Status</span>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${isRunning ? 'bg-[#0ECB81]/20 text-[#0ECB81]' : 'bg-[#F6465D]/20 text-[#F6465D]'}`}>
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-[#0ECB81]' : 'bg-[#F6465D]'}`}></div>
            {isRunning ? 'Running' : 'Stopped'}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#78869E] text-sm">Market Price</span>
           <div className="flex items-center gap-2 text-white font-mono text-base">
             <span>${currentPrice.toFixed(2)}</span>
           </div>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={onStart}
          disabled={isRunning}
          className="w-full flex items-center justify-center gap-2 bg-[#0ECB81] hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors text-sm"
        >
          <PlayIcon className="w-4 h-4" />
          Start Bot
        </button>
        <button
          onClick={onStop}
          disabled={!isRunning}
          className="w-full flex items-center justify-center gap-2 bg-[#F6465D] hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors text-sm"
        >
          <StopIcon className="w-4 h-4" />
          Stop Bot
        </button>
      </div>
    </div>
  );
};
