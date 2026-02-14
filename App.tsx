
import React from 'react';
import { Header } from './components/Header';
import { Chart } from './components/Chart';
import { BotControl } from './components/BotControl';
import { TradeLog } from './components/TradeLog';
import { StrategyGuide } from './components/StrategyGuide';
import { useTradingBot } from './hooks/useTradingBot';
import { MarketInfoBar } from './components/MarketInfoBar';

const App: React.FC = () => {
  const { status, priceData, trades, startBot, stopBot, currentPrice, dailyStats } = useTradingBot();

  return (
    <div className="h-screen flex flex-col text-[#DCDDE1] font-sans bg-[#0B111B]">
      <Header />
      <MarketInfoBar currentPrice={currentPrice} dailyStats={dailyStats} />
      <main className="flex-grow p-2 grid grid-cols-1 lg:grid-cols-5 gap-2 overflow-hidden">
        
        {/* Left Panel */}
        <div className="lg:col-span-1 flex flex-col gap-2 overflow-y-auto">
          <BotControl status={status} onStart={startBot} onStop={stopBot} currentPrice={currentPrice} />
          <StrategyGuide />
        </div>

        {/* Center Panel */}
        <div className="lg:col-span-3 bg-[#161B24] rounded-md border border-[#2C3241] p-2">
            <Chart data={priceData} />
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-1 bg-[#161B24] rounded-md border border-[#2C3241]">
          <TradeLog trades={trades} />
        </div>
        
      </main>
    </div>
  );
};

export default App;
