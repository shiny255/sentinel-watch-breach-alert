
import React, { useState, useEffect } from 'react';
import SecurityHeader from '../components/SecurityHeader';
import DashboardOverview from '../components/DashboardOverview';
import SecurityEventList from '../components/SecurityEventList';
import ThreatVisualization from '../components/ThreatVisualization';
import RealTimeMonitor from '../components/RealTimeMonitor';
import { 
  generateMockEvents, 
  getCurrentSystemStatus,
  getNetworkStats,
  attackTrendData
} from '../data/mockData';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const [events, setEvents] = useState(generateMockEvents(15));
  const [systemStatus, setSystemStatus] = useState(getCurrentSystemStatus());
  const [networkStats, setNetworkStats] = useState(getNetworkStats());
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  
  useEffect(() => {
    // Refresh data every 30 seconds
    const intervalId = setInterval(() => {
      refreshData();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const refreshData = () => {
    setEvents(generateMockEvents(15));
    setSystemStatus(getCurrentSystemStatus());
    setNetworkStats(getNetworkStats());
    setLastRefresh(new Date());
  };
  
  return (
    <div className="min-h-screen bg-cyber-background bg-cyber-grid bg-[length:50px_50px]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <SecurityHeader systemStatus={systemStatus} />
        
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Security Dashboard</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshData}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
        
        <div className="mb-6">
          <DashboardOverview systemStatus={systemStatus} networkStats={networkStats} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 space-y-6">
            <ThreatVisualization data={attackTrendData} />
            <RealTimeMonitor />
          </div>
          <div className="col-span-1">
            <SecurityEventList events={events} />
          </div>
        </div>
        
        <div className="mt-6 text-xs text-center text-muted-foreground">
          Last updated: {lastRefresh.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
