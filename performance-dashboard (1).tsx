import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Cpu, Database, Globe, AlertTriangle } from 'lucide-react';

const PerformanceDashboard = () => {
  const [timeRange, setTimeRange] = useState('1h');

  // Sample performance data
  const performanceData = [
    { time: '00:00', responseTime: 250, throughput: 1000, errorRate: 0.5, cpuUsage: 65 },
    { time: '00:15', responseTime: 245, throughput: 1100, errorRate: 0.4, cpuUsage: 70 },
    { time: '00:30', responseTime: 260, throughput: 950, errorRate: 0.6, cpuUsage: 75 },
    { time: '00:45', responseTime: 255, throughput: 1050, errorRate: 0.3, cpuUsage: 68 },
    { time: '01:00', responseTime: 240, throughput: 1200, errorRate: 0.4, cpuUsage: 72 }
  ];

  const recommendations = [
    {
      type: 'optimization',
      title: 'Cache Configuration',
      description: 'Implement response caching to reduce database load',
      impact: 'High',
      effort: 'Medium'
    },
    {
      type: 'scaling',
      title: 'Auto-scaling Threshold',
      description: 'Adjust CPU threshold to 75% for better resource utilization',
      impact: 'Medium',
      effort: 'Low'
    },
    {
      type: 'performance',
      title: 'Query Optimization',
      description: 'Optimize database queries for high-traffic endpoints',
      impact: 'High',
      effort: 'High'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Performance & Scaling Dashboard</h1>
        <p className="text-gray-600">
          Real-time monitoring and scaling metrics for your cXentral platform
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Response Time */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Response Time</h3>
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">250ms</div>
          <div className="text-sm text-gray-500">Avg. over last hour</div>
        </div>

        {/* Throughput */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Throughput</h3>
            <Globe className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold">1000 req/s</div>
          <div className="text-sm text-gray-500">Current rate</div>
        </div>

        {/* Error Rate */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Error Rate</h3>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-2xl font-bold">0.5%</div>
          <div className="text-sm text-gray-500">Last 5 minutes</div>
        </div>

        {/* Resource Usage */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">CPU Usage</h3>
            <Cpu className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold">65%</div>
          <div className="text-sm text-gray-500">Current utilization</div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Performance Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="responseTime" stroke="#3b82f6" name="Response Time (ms)" />
              <Line type="monotone" dataKey="throughput" stroke="#10b981" name="Throughput (req/s)" />
              <Line type="monotone" dataKey="cpuUsage" stroke="#8b5cf6" name="CPU Usage (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Performance Recommendations</h2>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{rec.title}</h3>
                <span className={`px-2 py-1 rounded text-sm ${
                  rec.impact === 'High' ? 'bg-red-100 text-red-700' :
                  rec.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {rec.impact} Impact
                </span>
              </div>
              <p className="text-gray-600 mb-2">{rec.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Effort: {rec.effort}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
