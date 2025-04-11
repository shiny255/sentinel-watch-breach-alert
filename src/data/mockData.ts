
export interface SecurityEvent {
  id: string;
  timestamp: Date;
  type: 'intrusion' | 'authentication' | 'malware' | 'policy_violation' | 'system_alert';
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  source: string;
  destination: string;
  description: string;
  status: 'new' | 'investigating' | 'resolved' | 'dismissed';
  details?: Record<string, any>;
}

export interface SystemStatus {
  overallThreatLevel: 'critical' | 'high' | 'medium' | 'low' | 'normal';
  activeAlerts: number;
  systemsAtRisk: number;
  systemsMonitored: number;
  networkStatus: 'normal' | 'degraded' | 'critical';
  lastUpdateTime: Date;
}

export interface NetworkStats {
  packetsAnalyzed: number;
  anomaliesDetected: number;
  blockedConnections: number;
  trafficVolume: number; // in GB
}

// Generate a set of mock security events
export const generateMockEvents = (count: number): SecurityEvent[] => {
  const eventTypes: SecurityEvent['type'][] = ['intrusion', 'authentication', 'malware', 'policy_violation', 'system_alert'];
  const severityLevels: SecurityEvent['severity'][] = ['critical', 'high', 'medium', 'low', 'info'];
  const statuses: SecurityEvent['status'][] = ['new', 'investigating', 'resolved', 'dismissed'];
  const ipAddresses = [
    '192.168.1.105', '192.168.1.110', '192.168.1.120', 
    '10.0.0.15', '10.0.0.27', '172.16.0.5', 
    '8.8.8.8', '1.1.1.1', '204.79.197.200'
  ];
  
  const descriptions = [
    'Multiple failed login attempts detected',
    'Unusual outbound data transfer',
    'Potential SQL injection attempt',
    'Suspicious process execution',
    'Firewall rule violation',
    'Unauthorized access to restricted file',
    'Malware signature detected',
    'Unusual network scan activity',
    'Privilege escalation attempt',
    'Configuration change detected outside maintenance window'
  ];
  
  return Array.from({ length: count }, (_, i) => {
    // Create timestamps spanning the last 24 hours
    const timestamp = new Date();
    timestamp.setHours(timestamp.getHours() - Math.random() * 24);
    
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)];
    
    // Make critical events more likely to be 'new'
    let status;
    if (severity === 'critical' || severity === 'high') {
      status = Math.random() > 0.3 ? 'new' : statuses[Math.floor(Math.random() * statuses.length)];
    } else {
      status = statuses[Math.floor(Math.random() * statuses.length)];
    }
    
    return {
      id: `evt-${Date.now()}-${i}`,
      timestamp,
      type: eventType,
      severity,
      source: ipAddresses[Math.floor(Math.random() * ipAddresses.length)],
      destination: ipAddresses[Math.floor(Math.random() * ipAddresses.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      status,
      details: {
        protocol: Math.random() > 0.5 ? 'TCP' : 'UDP',
        port: Math.floor(Math.random() * 65535),
        user: Math.random() > 0.7 ? 'admin' : 'user',
        process: Math.random() > 0.6 ? 'system' : 'user_app',
      }
    };
  });
};

// Mock system status data
export const getCurrentSystemStatus = (): SystemStatus => {
  return {
    overallThreatLevel: Math.random() > 0.7 ? 'medium' : (Math.random() > 0.9 ? 'high' : 'normal'),
    activeAlerts: Math.floor(Math.random() * 10),
    systemsAtRisk: Math.floor(Math.random() * 5),
    systemsMonitored: 45,
    networkStatus: Math.random() > 0.8 ? 'normal' : 'degraded',
    lastUpdateTime: new Date()
  };
};

// Mock network statistics
export const getNetworkStats = (): NetworkStats => {
  return {
    packetsAnalyzed: Math.floor(Math.random() * 1000000) + 9000000,
    anomaliesDetected: Math.floor(Math.random() * 100),
    blockedConnections: Math.floor(Math.random() * 50),
    trafficVolume: parseFloat((Math.random() * 100 + 50).toFixed(2))
  };
};

// Data for the threat map visualization
export interface ThreatMapData {
  source: string;
  target: string;
  value: number;
  type: 'ddos' | 'ransomware' | 'intrusion' | 'malware' | 'phishing';
}

export const threatMapData: ThreatMapData[] = [
  { source: 'CN', target: 'US', value: 85, type: 'ddos' },
  { source: 'RU', target: 'US', value: 72, type: 'ransomware' },
  { source: 'US', target: 'FR', value: 43, type: 'intrusion' },
  { source: 'BR', target: 'UK', value: 29, type: 'phishing' },
  { source: 'KR', target: 'JP', value: 38, type: 'malware' },
  { source: 'IR', target: 'DE', value: 56, type: 'ddos' },
  { source: 'IN', target: 'AU', value: 22, type: 'malware' },
  { source: 'UK', target: 'CA', value: 17, type: 'phishing' }
];

// Time series data for attack trends
export interface AttackTrendData {
  date: string;
  intrusions: number;
  malware: number;
  phishing: number;
  ddos: number;
}

export const attackTrendData: AttackTrendData[] = [
  { date: '2025-04-04', intrusions: 12, malware: 8, phishing: 15, ddos: 5 },
  { date: '2025-04-05', intrusions: 18, malware: 10, phishing: 12, ddos: 3 },
  { date: '2025-04-06', intrusions: 15, malware: 12, phishing: 8, ddos: 7 },
  { date: '2025-04-07', intrusions: 21, malware: 15, phishing: 10, ddos: 9 },
  { date: '2025-04-08', intrusions: 19, malware: 11, phishing: 13, ddos: 6 },
  { date: '2025-04-09', intrusions: 25, malware: 14, phishing: 16, ddos: 8 },
  { date: '2025-04-10', intrusions: 31, malware: 17, phishing: 18, ddos: 11 },
  { date: '2025-04-11', intrusions: 28, malware: 19, phishing: 15, ddos: 9 },
];
