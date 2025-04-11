
import React from 'react';
import { AlertCircle, Clock, ArrowRight, ShieldAlert } from 'lucide-react';
import { SecurityEvent } from '@/data/mockData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface SecurityEventListProps {
  events: SecurityEvent[];
}

const SecurityEventList = ({ events }: SecurityEventListProps) => {
  // Function to determine badge color based on severity
  const getBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-cyber-danger text-white border-none';
      case 'high': return 'bg-cyber-danger/80 text-white border-none';
      case 'medium': return 'bg-cyber-warning text-black border-none';
      case 'low': return 'bg-cyber-info/70 text-white border-none';
      default: return 'border-none';
    }
  };

  // Function to get icon based on event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'intrusion': return <ShieldAlert className="h-4 w-4 text-cyber-danger" />;
      case 'authentication': return <AlertCircle className="h-4 w-4 text-cyber-warning" />;
      case 'malware': return <AlertCircle className="h-4 w-4 text-cyber-danger" />;
      case 'policy_violation': return <AlertCircle className="h-4 w-4 text-cyber-info" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  // Format the timestamp
  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Sort events by timestamp (most recent first) and by severity
  const sortedEvents = [...events].sort((a, b) => {
    // First sort by status - new events first
    if (a.status === 'new' && b.status !== 'new') return -1;
    if (a.status !== 'new' && b.status === 'new') return 1;
    
    // Then sort by severity
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[a.severity] - severityOrder[b.severity];
    }
    
    // Finally sort by timestamp
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  return (
    <div className="cyber-panel p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-cyber-danger" />
          Security Events
        </h2>
        <Badge variant="outline" className="text-xs">
          {sortedEvents.filter(event => event.status === 'new').length} New
        </Badge>
      </div>
      
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3">
          {sortedEvents.map((event) => (
            <div 
              key={event.id} 
              className={`p-3 rounded-md cyber-panel border-l-4 flex items-start ${
                event.status === 'new' 
                  ? 'border-l-cyber-danger animate-pulse-glow cyber-glow-danger' 
                  : event.status === 'investigating' 
                  ? 'border-l-cyber-warning cyber-glow-warning' 
                  : 'border-l-muted'
              }`}
            >
              <div className="mr-3 mt-1">
                {getEventIcon(event.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium text-sm">{event.description}</p>
                  <Badge className={`ml-2 text-xs ${getBadgeVariant(event.severity)}`}>
                    {event.severity.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <div className="flex items-center space-x-2">
                    <div>{event.source}</div>
                    <ArrowRight className="h-3 w-3" />
                    <div>{event.destination}</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimestamp(event.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SecurityEventList;
