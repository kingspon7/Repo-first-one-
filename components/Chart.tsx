
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PriceData } from '../types';

interface ChartProps {
  data: PriceData[];
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
  if (data.length === 0) {
    return <div className="flex items-center justify-center h-full text-[#78869E]">Waiting for market data...</div>;
  }
  
  const latestPrice = data[data.length-1].price;
  const initialPrice = data[0].price;
  const strokeColor = latestPrice >= initialPrice ? '#0ECB81' : '#F6465D';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: -10,
          bottom: 5,
        }}
      >
        <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
            </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#2C3241" />
        <XAxis 
            dataKey="time" 
            tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString()}
            stroke="#78869E"
            dy={10}
            tick={{ fontSize: 12 }}
        />
        <YAxis 
            stroke="#78869E" 
            orientation="right"
            domain={['dataMin - 10', 'dataMax + 10']}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
            dx={5}
            tick={{ fontSize: 12 }}
        />
        <Tooltip 
            contentStyle={{ backgroundColor: '#161B24', border: '1px solid #2C3241' }}
            labelFormatter={(unixTime) => new Date(unixTime).toLocaleString()}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
        />
        <Area type="monotone" dataKey="price" stroke={strokeColor} strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
