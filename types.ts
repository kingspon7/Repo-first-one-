
export enum BotStatus {
  STOPPED = 'STOPPED',
  RUNNING = 'RUNNING',
}

export interface PriceData {
  time: number;
  price: number;
}

export interface Trade {
  id: string;
  type: 'BUY' | 'SELL';
  price: number;
  time: string;
}

export interface DailyStats {
  high: number;
  low: number;
  change: number;
  open: number;
}
