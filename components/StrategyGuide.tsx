
import React from 'react';

export const StrategyGuide: React.FC = () => {
  return (
    <div className="bg-[#161B24] p-4 rounded-md border border-[#2C3241]">
      <h2 className="text-lg font-bold text-white mb-4">Strategy Guidelines</h2>
      <p className="text-sm text-[#78869E] mb-4">
        This bot uses a simplified trend-following system based on the Turtle Trading rules.
      </p>
      <ul className="space-y-3 text-sm">
        <li className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0ECB81] mt-1.5 flex-shrink-0"></div>
          <div>
            <h3 className="font-semibold text-[#DCDDE1]">Entry Signal (Long)</h3>
            <p className="text-[#78869E]">Buy when price exceeds the 20-period high.</p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#F6465D] mt-1.5 flex-shrink-0"></div>
          <div>
            <h3 className="font-semibold text-[#DCDDE1]">Exit Signal (Sell)</h3>
            <p className="text-[#78869E]">Sell when price drops below the 10-period low.</p>
          </div>
        </li>
      </ul>
    </div>
  );
};
