
import React from 'react';
import { DailyStats } from '../types';

interface MarketInfoBarProps {
    currentPrice: number;
    dailyStats: DailyStats;
}

const Stat: React.FC<{ label: string; value: string; valueColor?: string }> = ({ label, value, valueColor }) => (
    <div className="flex items-baseline gap-2 sm:gap-4 px-4 border-r border-gray-700 last:border-r-0">
        <span className="text-xs text-[#78869E] whitespace-nowrap">{label}</span>
        <span className={`text-sm font-semibold font-mono ${valueColor || 'text-[#DCDDE1]'}`}>
            {value}
        </span>
    </div>
);


export const MarketInfoBar: React.FC<MarketInfoBarProps> = ({ currentPrice, dailyStats }) => {
    const isPositiveChange = dailyStats.change >= 0;
    const changeColor = isPositiveChange ? 'text-[#0ECB81]' : 'text-[#F6465D]';
    const changeSign = isPositiveChange ? '+' : '';

    return (
        <div className="bg-[#161B24] border-b border-[#2C3241] p-2">
            <div className="flex items-center">
                <div className="px-4">
                    <h2 className="text-lg font-bold text-white">BTC/USDT <span className="text-xs font-normal text-gray-500">(Simulated)</span></h2>
                </div>
                <div className="flex-grow flex items-center overflow-x-auto">
                    <Stat label="Price" value={`$${currentPrice.toFixed(2)}`} valueColor={changeColor} />
                    <Stat label="24h Change" value={`${changeSign}${dailyStats.change.toFixed(2)}%`} valueColor={changeColor} />
                    <Stat label="24h High" value={`$${dailyStats.high.toFixed(2)}`} />
                    <Stat label="24h Low" value={`$${dailyStats.low.toFixed(2)}`} />
                </div>
            </div>
        </div>
    );
}
