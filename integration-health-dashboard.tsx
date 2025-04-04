import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, AlertCircle, CheckCircle, Clock, Database, Server, ArrowDown, ArrowUp, RefreshCw } from 'lucide-react';

const IntegrationHealthDashboard = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');

  const healthData = {
    overall: {
      status: 'healthy',
      uptime: 99.98,
      responseTime: 145,
      errorRate: 0.02,
      activeConnections: 1250
    },
    platforms: {
      'Genesys': { status: 'healthy', latency: 120, errorRate: 0.01, throughput: 1200 },
      'NICE': { status: 'warning', latency: 180, errorRate: 0.05, throughput: 950 },
      'Verint': { status: 'healthy', latency: 130, errorRate: 0.02, throughput: 1100 },
      'Five9': { status: 'degraded', latency: 220, errorRate: 0.08, throughput: 800 }
    },
    metrics: [
      { timestamp: '00:00', responseTime: 140, errorRate: 0.02, throughput: 1000 },
      { timestamp: '04:00', responseTime: 145, errorRate: 0.01, throughput: 1200 },
      { timestamp: '08:00', responseTime: 150, errorRate: 0.03, throughput: 1100 },
      { timestamp: '12:00', responseTime: 142, errorRate: 0.02, throughput: 1300 },
      { timestamp: '16:00', responseTime: 148, errorRate: 0.02, throughput: 1250 },
      { timestamp: '20:00', responseTime: 144, errorRate: 0.02, throughput: 1150 }
    ],
    incidents: [
      {
        id: 1,
        platform: 'NICE',
        type: 'latency',
        status: 'investigating',
        startTime: '2024-03-15T10:30:00Z',
        description: 'Increased latency detected'
      },
      {
        id: 2,
        platform: 'Five9',
        type: 'error_rate',
        status: 'resolved',
        startTime: '2024-03-15T08:15:00Z',
        endTime: '2024-03-15T09:00:00Z',
        description: 'Elevated error rates'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'degraded': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className={`w-5 h-5 ${getStatusColor(status)}`} />;
      case 'warning':
        return <AlertCircle className={`w-5 h-5 ${getStatusColor(status)}`} />;
      case 'degraded':
        return <AlertCircle className={`w-5 h-5 ${getStatusColor(status)}`} />;
      default:
        return <Activity className={`w-5 h-5 ${getStatusColor(status)}`} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Integration Health</h2>
          <p className="text-gray-600">Real-time monitoring and incident tracking</p>
        </div>
        <div className="flex gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 text-purple-600 border border-purple-600 rounded-lg">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Overall Health Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-purple-600" />
            <h3 className="font-medium">System Status</h3>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(healthData.overall.status)}
            <span className="capitalize">{healthData.overall.status}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-purple-600" />
            <h3 className="font-medium">Uptime</h3>
          </div>
          <div className="text-2xl font-bold">
            {healthData.overall.uptime}%
          </div>
        </div>

        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <Server className="w-5 h-5 text-purple-600" />
            <h3 className="font-medium">Response Time</h3>
          </div>
          <div className="text-2xl font-bold">
            {healthData.overall.responseTime}ms
          </div>
        </div>

        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-5 h-5 text-purple-600" />
            <h3 className="font-medium">Active Connections</h3>
          </div>
          <div className="text-2xl font-bold">
            {healthData.overall.activeConnections}
          </div>
        </div>
      </div>

      {/* Platform Health Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {Object.entries(healthData.platforms).map(([platform, data]) => (
          <div key={platform} className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{platform}</h3>
                {getStatusIcon(data.status)}
              </div>
              <div className="text-sm text-gray-600">
                Last updated: 2 minutes ago
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Latency</div>
                <div className="text-xl font-bold">{data.latency}ms</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Error Rate</div>
                <div className="text-xl font-bold">{data.errorRate}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Throughput</div>
                <div className="text-xl font-bold">{data.throughput}/s</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Metrics Chart */}
      <div className="bg-white rounded-lg p-6 mb-8">
        <h3 className="font-semibold mb-4">Performance Metrics</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={healthData.metrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="responseTime" 
                stroke="#8b5cf6" 
                name="Response Time"
              />
              <Line 
                type="monotone" 
                dataKey="throughput" 
                stroke="#2563eb" 
                name="Throughput"
              />
              <Line 
                type="monotone" 
                dataKey="errorRate" 
                stroke="#dc2626" 
                name="Error Rate"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Incidents */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="font-semibold mb-4">Active Incidents</h3>
        <div className="space-y-4">
          {healthData.incidents.map((incident) => (
            <div key={incident.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium mb-1">{incident.platform} - {incident.type}</div>
                <div className="text-sm text-gray-600">{incident.description}</div>
              </div>
              <div className="text-right">
                <div className={`font-medium ${
                  incident.status === 'resolved' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {incident.status}
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(incident.startTime).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationHealthDashboard;