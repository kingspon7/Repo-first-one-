
import { useState, useEffect, useRef, useCallback } from 'react';
import { BotStatus, PriceData, Trade, DailyStats } from '../types';

const INITIAL_PRICE = 50000;
const VOLATILITY = 0.001;
const UPDATE_INTERVAL_MS = 1500;
const ENTRY_PERIOD = 20;
const EXIT_PERIOD = 10;
const MAX_DATA_POINTS = 100;

const initialStats: DailyStats = {
    high: INITIAL_PRICE,
    low: INITIAL_PRICE,
    change: 0,
    open: INITIAL_PRICE,
};

export const useTradingBot = () => {
  const [status, setStatus] = useState<BotStatus>(BotStatus.STOPPED);
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(INITIAL_PRICE);
  const [dailyStats, setDailyStats] = useState<DailyStats>(initialStats);
  const intervalRef = useRef<number | null>(null);
  const positionOpen = useRef<boolean>(false);

  const generateNewPrice = useCallback((lastPrice: number) => {
    const change = (Math.random() - 0.5) * 2 * lastPrice * VOLATILITY;
    return Math.max(0, lastPrice + change);
  }, []);

  const executeTrade = useCallback((type: 'BUY' | 'SELL', price: number) => {
    const newTrade: Trade = {
      id: `trade-${Date.now()}-${Math.random()}`,
      type,
      price,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
    };
    setTrades(prev => [newTrade, ...prev].slice(0, 50));
    positionOpen.current = type === 'BUY';
  }, []);

  const runStrategy = useCallback((data: PriceData[]) => {
    if (data.length < ENTRY_PERIOD) return;

    const currentPricePoint = data[data.length - 1];
    const prices = data.map(p => p.price);
    
    const entrySlice = prices.slice(-ENTRY_PERIOD -1, -1);
    const exitSlice = prices.slice(-EXIT_PERIOD -1, -1);

    const entryHigh = Math.max(...entrySlice);
    const exitLow = Math.min(...exitSlice);

    if (!positionOpen.current && currentPricePoint.price > entryHigh) {
      executeTrade('BUY', currentPricePoint.price);
    } else if (positionOpen.current && currentPricePoint.price < exitLow) {
      executeTrade('SELL', currentPricePoint.price);
    }

  }, [executeTrade]);

  const tick = useCallback(() => {
    setPriceData(prevData => {
      const lastPrice = prevData.length > 0 ? prevData[prevData.length - 1].price : INITIAL_PRICE;
      const newPrice = generateNewPrice(lastPrice);
      const newPoint: PriceData = { time: Date.now(), price: newPrice };
      
      const updatedData = [...prevData, newPoint].slice(-MAX_DATA_POINTS);
      
      setCurrentPrice(newPrice);
      if (status === BotStatus.RUNNING) {
        runStrategy(updatedData);
      }
      
      setDailyStats(prevStats => {
        const newDailyStats = { ...prevStats };
        if (newPrice > newDailyStats.high) newDailyStats.high = newPrice;
        if (newPrice < newDailyStats.low) newDailyStats.low = newPrice;
        newDailyStats.change = ((newPrice - newDailyStats.open) / newDailyStats.open) * 100;
        return newDailyStats;
      });

      return updatedData;
    });
  }, [generateNewPrice, runStrategy, status]);

  const startBot = () => {
    if (status === BotStatus.RUNNING) return;
    
    let initialData: PriceData[] = [];
    let price = INITIAL_PRICE;
    const now = Date.now();
    for (let i = 0; i < 30; i++) {
        price = generateNewPrice(price);
        initialData.push({ time: now - (30 - i) * UPDATE_INTERVAL_MS, price });
    }
    setPriceData(initialData);
    setCurrentPrice(price);
    setDailyStats({ high: price, low: price, open: price, change: 0});
    positionOpen.current = false;
    setTrades([]);


    setStatus(BotStatus.RUNNING);
    intervalRef.current = window.setInterval(tick, UPDATE_INTERVAL_MS);
  };

  const stopBot = () => {
    if (status === BotStatus.STOPPED) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStatus(BotStatus.STOPPED);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    status,
    priceData,
    trades,
    startBot,
    stopBot,
    currentPrice,
    dailyStats
  };
};
