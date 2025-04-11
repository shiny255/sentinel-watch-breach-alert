
import React from 'react';
import { Activity, Shield, ServerCrash, Network } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SystemStatus, NetworkStats } from '@/data/mockData';

interface DashboardOverviewProps {
  systemStatus: SystemStatus;
  networkStats: NetworkStats;
}

const DashboardOverview = ({ systemStatus, networkStats }: DashboardOverviewProps) => {
  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="cyber-panel cyber-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Systems Monitored</CardTitle>
          <Shield className="h-4 w-4 text-cyber-info" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{systemStatus.systemsMonitored}</div>
          <div className="flex items-center space-x-2 mt-4">
            <div className="text-xs text-muted-foreground">
              {systemStatus.systemsAtRisk} at risk
            </div>
            <Progress value={systemStatus.systemsAtRisk / systemStatus.systemsMonitored * 100} className="h-1 w-full bg-muted" />
          </div>
        </CardContent>
      </Card>

      <Card className="cyber-panel cyber-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Packets Analyzed</CardTitle>
          <Activity className="h-4 w-4 text-cyber-info" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(networkStats.packetsAnalyzed)}</div>
          <p className="text-xs text-muted-foreground mt-4">
            {networkStats.anomaliesDetected} anomalies detected
          </p>
        </CardContent>
      </Card>

      <Card className="cyber-panel cyber-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Network Status</CardTitle>
          <Network className="h-4 w-4 text-cyber-info" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full mr-2 ${
              systemStatus.networkStatus === 'normal' 
                ? 'bg-cyber-success' 
                : systemStatus.networkStatus === 'degraded' 
                ? 'bg-cyber-warning' 
                : 'bg-cyber-danger'
            }`}></div>
            <div className="text-lg font-medium capitalize">{systemStatus.networkStatus}</div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            {networkStats.trafficVolume} GB traffic today
          </p>
        </CardContent>
      </Card>

      <Card className="cyber-panel cyber-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Blocked Connections</CardTitle>
          <ServerCrash className="h-4 w-4 text-cyber-info" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{networkStats.blockedConnections}</div>
          <p className="text-xs text-muted-foreground mt-4">
            {new Date().toLocaleDateString()} monitoring session
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
