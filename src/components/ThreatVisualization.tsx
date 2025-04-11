
import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { AttackTrendData } from '@/data/mockData';

interface ThreatVisualizationProps {
  data: AttackTrendData[];
}

const ThreatVisualization = ({ data }: ThreatVisualizationProps) => {
  return (
    <div className="cyber-panel p-4">
      <h2 className="text-lg font-semibold mb-4">Threat Activity Trends</h2>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorIntrusions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e83a3a" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#e83a3a" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorMalware" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffb020" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ffb020" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPhishing" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDdos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <XAxis 
              dataKey="date" 
              tick={{ fill: 'hsl(215 20.2% 65.1%)' }}
              tickFormatter={(date) => new Date(date).toLocaleDateString([], { month: 'short', day: 'numeric' })} 
            />
            <YAxis tick={{ fill: 'hsl(215 20.2% 65.1%)' }} />
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(13, 17, 23, 0.9)', 
                borderColor: '#30363d',
                color: '#e6edf3'
              }} 
            />
            <Legend 
              wrapperStyle={{ 
                paddingTop: 20, 
                color: 'hsl(215 20.2% 65.1%)'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="intrusions" 
              name="Intrusions"
              stroke="#e83a3a" 
              fillOpacity={1} 
              fill="url(#colorIntrusions)" 
            />
            <Area 
              type="monotone" 
              dataKey="malware" 
              name="Malware"
              stroke="#ffb020" 
              fillOpacity={1} 
              fill="url(#colorMalware)" 
            />
            <Area 
              type="monotone" 
              dataKey="phishing" 
              name="Phishing"
              stroke="#0ea5e9" 
              fillOpacity={1} 
              fill="url(#colorPhishing)" 
            />
            <Area 
              type="monotone" 
              dataKey="ddos" 
              name="DDoS"
              stroke="#4caf50" 
              fillOpacity={1} 
              fill="url(#colorDdos)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ThreatVisualization;
