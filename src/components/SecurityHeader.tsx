
import React from 'react';
import { Shield, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { SystemStatus } from '@/data/mockData';

interface SecurityHeaderProps {
  systemStatus: SystemStatus;
}

const SecurityHeader = ({ systemStatus }: SecurityHeaderProps) => {
  const { toast } = useToast();
  
  // Function to show notifications
  const showNotifications = () => {
    toast({
      title: "Recent Alerts",
      description: `${systemStatus.activeAlerts} active alerts require your attention.`,
      variant: "destructive",
    });
  };

  // Calculate threat level color
  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-cyber-danger';
      case 'high': return 'bg-cyber-danger';
      case 'medium': return 'bg-cyber-warning';
      case 'low': return 'bg-cyber-warning/70';
      default: return 'bg-cyber-success';
    }
  };

  return (
    <header className="cyber-panel p-4 mb-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Shield className="h-8 w-8 text-cyber-accent animate-pulse-glow" />
        <div>
          <h1 className="text-xl font-bold">Sentinel Watch</h1>
          <p className="text-xs text-muted-foreground">Breach Alert System</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="flex items-center mr-6">
          <div className="flex flex-col items-end mr-3">
            <span className="text-sm font-medium">Threat Level</span>
            <span className={`text-xs ${systemStatus.overallThreatLevel === 'normal' ? 'text-cyber-success' : 
              systemStatus.overallThreatLevel === 'medium' ? 'text-cyber-warning' : 'text-cyber-danger'}`}>
              {systemStatus.overallThreatLevel.toUpperCase()}
            </span>
          </div>
          <div className={`w-3 h-3 rounded-full ${getThreatLevelColor(systemStatus.overallThreatLevel)} animate-pulse-glow`}></div>
        </div>
        
        <Button 
          variant="outline" 
          size="icon"
          className="relative"
          onClick={showNotifications}
        >
          <Bell className="h-5 w-5" />
          {systemStatus.activeAlerts > 0 && (
            <span className="absolute -top-1 -right-1 bg-cyber-danger text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-background">
              {systemStatus.activeAlerts}
            </span>
          )}
        </Button>
        
        <Button variant="outline" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default SecurityHeader;
