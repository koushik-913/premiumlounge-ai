import React, { useState, useEffect } from 'react';
import { Shield, Cpu, Camera, Database, Wifi, RefreshCw, Activity } from 'lucide-react';

interface StatusItem {
  id: string;
  icon: React.ElementType;
  label: string;
  status: 'online' | 'secure' | 'active' | 'warning' | 'offline';
  detail: string;
  metric?: string;
}

const STATUS_CONFIG = {
  online: { dot: 'bg-success', text: 'text-success', label: 'Online', bg: 'bg-success-light' },
  secure: { dot: 'bg-teal', text: 'text-teal', label: 'Secure', bg: 'bg-teal-light' },
  active: { dot: 'bg-success', text: 'text-success', label: 'Active', bg: 'bg-success-light' },
  warning: { dot: 'bg-yellow-400', text: 'text-yellow-600', label: 'Warning', bg: 'bg-yellow-50' },
  offline: { dot: 'bg-danger', text: 'text-danger', label: 'Offline', bg: 'bg-danger-light' },
};

const statusItems: StatusItem[] = [
  {
    id: 'face-engine',
    icon: Cpu,
    label: 'Face Recognition Engine',
    status: 'online',
    detail: 'Neural network model loaded and ready for inference',
    metric: '99.9% uptime',
  },
  {
    id: 'database',
    icon: Database,
    label: 'Member Database',
    status: 'secure',
    detail: 'Encrypted member records with AES-256 protection',
    metric: 'TLS 1.3',
  },
  {
    id: 'camera',
    icon: Camera,
    label: 'Camera Feed',
    status: 'active',
    detail: 'Primary entrance camera streaming at 30 FPS',
    metric: '1080p HD',
  },
  {
    id: 'network',
    icon: Wifi,
    label: 'Network Connectivity',
    status: 'online',
    detail: 'Secure internal network connection established',
    metric: '<5ms latency',
  },
  {
    id: 'blockchain',
    icon: Shield,
    label: 'ICP Blockchain Node',
    status: 'online',
    detail: 'Internet Computer Protocol canister running on-chain',
    metric: 'Canister active',
  },
  {
    id: 'activity',
    icon: Activity,
    label: 'System Activity Monitor',
    status: 'active',
    detail: 'Real-time monitoring of all system components',
    metric: 'All clear',
  },
];

export default function SystemStatusSection() {
  const [lastCheck, setLastCheck] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const generateTimestamp = () => {
    return new Date().toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  useEffect(() => {
    setLastCheck(generateTimestamp());
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastCheck(generateTimestamp());
      setIsRefreshing(false);
    }, 1200);
  };

  const allOnline = statusItems.every(
    (item) => item.status === 'online' || item.status === 'secure' || item.status === 'active'
  );

  return (
    <section id="system-status" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-light mb-4">
            <Shield className="w-3.5 h-3.5 text-teal" />
            <span className="text-teal text-xs font-medium tracking-widest uppercase">
              Security & System Status
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
            System Health Dashboard
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            Real-time monitoring of all critical system components ensuring uninterrupted
            lounge access operations.
          </p>
        </div>

        {/* Overall Status Banner */}
        <div
          className={`card-premium p-5 mb-8 flex items-center justify-between ${
            allOnline ? 'border-success/30 bg-success-light/40' : 'border-danger/30 bg-danger-light/40'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                allOnline ? 'bg-success animate-dot-blink' : 'bg-danger'
              }`}
            />
            <div>
              <div className="font-semibold text-foreground text-sm">
                {allOnline ? 'All Systems Operational' : 'System Issues Detected'}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Last checked: {lastCheck}
              </div>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-muted-foreground border border-border rounded-md hover:bg-secondary transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* Status Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {statusItems.map((item) => {
            const Icon = item.icon;
            const config = STATUS_CONFIG[item.status];

            return (
              <div key={item.id} className="card-premium p-5 hover:shadow-premium-lg transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${config.text}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{item.label}</h3>
                      {item.metric && (
                        <span className="text-xs text-muted-foreground font-mono">{item.metric}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${config.dot}`} />
                    <span className={`text-xs font-medium ${config.text}`}>{config.label}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
              </div>
            );
          })}
        </div>

        {/* Last System Check */}
        <div className="mt-8 card-premium p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center flex-shrink-0">
            <RefreshCw className="w-5 h-5 text-gold" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">
              Last System Check
            </div>
            <div className="text-sm font-semibold text-foreground font-mono">{lastCheck}</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-dot-blink" />
            <span className="text-xs text-success font-medium">All Clear</span>
          </div>
        </div>
      </div>
    </section>
  );
}
