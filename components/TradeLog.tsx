
import React from 'react';
import { Trade } from '../types';

interface TradeLogProps {
  trades: Trade[];
}

export const TradeLog: React.FC<TradeLogProps> = ({ trades }) => {
  return (
    <div className="h-full flex flex-col p-4">
      <h2 className="text-lg font-bold text-white mb-4 flex-shrink-0">Recent Trades</h2>
      
      {/* Header */}
      <div className="grid grid-cols-3 text-xs text-[#78869E] pb-2 border-b border-[#2C3241] flex-shrink-0">
        <span>Price (USDT)</span>
        <span className="text-center">Type</span>
        <span className="text-right">Time</span>
      </div>

      {/* Body */}
      <div className="flex-grow overflow-y-auto mt-2">
        {trades.length === 0 ? (
          <div className="flex items-center justify-center h-full text-[#78869E]">
            No trades executed.
          </div>
        ) : (
          <ul className="space-y-1">
            {trades.map((trade) => (
              <li key={trade.id} className="grid grid-cols-3 text-sm font-mono items-center">
                <span className={`${trade.type === 'BUY' ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                  {trade.price.toFixed(2)}
                </span>
                <span className={`text-center font-sans font-semibold ${trade.type === 'BUY' ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                  {trade.type}
                </span>
                <span className="text-right text-[#78869E]">{trade.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
