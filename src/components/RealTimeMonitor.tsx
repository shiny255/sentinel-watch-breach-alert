import React, { useState, useEffect } from 'react';
import { Loader, ShieldAlert, Check } from 'lucide-react';

const RealTimeMonitor = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [scanning, setScanning] = useState(true);
  
  // Simulate real-time logs coming in
  useEffect(() => {
    const logMessages = [
      "Scanning network traffic on interface eth0",
      "Analyzing packets for anomalies...",
      "Checking authentication attempts...",
      "Monitoring system processes for suspicious activity...",
      "Verifying file integrity...",
      "Checking network connections...",
      "Packet analysis complete",
      "Scanning memory for potential threats",
      "Evaluating system calls for privilege escalation",
      "Inspecting outbound connections",
      "Validating user permissions",
      "Port scan detected from 192.168.1.35 (blocked)",
      "Updated threat intelligence database",
      "SSH brute force attempt detected and blocked",
      "Malformed packet detected and dropped",
      "System integrity verified",
      "Threat scan complete - No critical threats detected"
    ];
    
    // Add new log message every 1.5 seconds
    const interval = setInterval(() => {
      const newLog = logMessages[Math.floor(Math.random() * logMessages.length)];
      setLogs(prevLogs => {
        // Keep only the most recent 8 logs
        const updatedLogs = [...prevLogs, newLog].slice(-8);
        
        // After enough logs, occasionally stop "scanning"
        if (updatedLogs.length > 5 && Math.random() > 0.7) {
          setScanning(false);
          // Resume scanning after a delay
          setTimeout(() => setScanning(true), 3000);
        }
        
        return updatedLogs;
      });
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="cyber-panel p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-cyber-info" />
          Security Monitor
        </h2>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-cyber-foreground">
            {scanning ? 'Scanning' : 'Scan complete'}
          </span>
          {scanning ? (
            <Loader className="h-4 w-4 text-cyber-info animate-spin" />
          ) : (
            <Check className="h-4 w-4 text-cyber-success" />
          )}
        </div>
      </div>
      
      <div className="font-mono text-xs bg-cyber-background p-3 rounded border border-cyber-muted h-[220px] overflow-hidden">
        {logs.map((log, index) => (
          <div 
            key={index} 
            className={`mb-1 ${index === logs.length - 1 ? 'text-cyber-info animate-pulse' : 'text-muted-foreground'}`}
          >
            <span className="text-cyber-accent mr-2">[{new Date().toLocaleTimeString()}]</span>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeMonitor;
