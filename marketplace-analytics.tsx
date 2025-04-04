import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, Users, TrendingUp, BarChart2, Download, Star } from 'lucide-react';

export default function MarketplaceAnalytics() {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const allData = {
    month: [
      { date: '2024-01', revenue: 125000, installations: 2800, activeUsers: 15000, rating: 4.5 },
      { date: '2024-02', revenue: 150000, installations: 3200, activeUsers: 18000, rating: 4.6 },
      { date: '2024-03', revenue: 180000, installations: 3600, activeUsers: 21000, rating: 4.7 },
      { date: '2024-04', revenue: 220000, installations: 4100, activeUsers: 24000, rating: 4.7 },
      { date: '2024-05', revenue: 260000, installations: 4500, activeUsers: 27000, rating: 4.8 },
      { date: '2024-06', revenue: 300000, installations: 5000, activeUsers: 30000, rating: 4.8 }
    ],
    quarter: [
      { date: 'Q1 2024', revenue: 455000, installations: 9600, activeUsers: 21000, rating: 4.6 },
      { date: 'Q2 2024', revenue: 780000, installations: 13600, activeUsers: 30000, rating: 4.8 },
      { date: 'Q3 2024', revenue: 1200000, installations: 18000, activeUsers: 42000, rating: 4.7 },
      { date: 'Q4 2024', revenue: 1800000, installations: 25000, activeUsers: 55000, rating: 4.8 }
    ],
    year: [
      { date: '2023', revenue: 2500000, installations: 45000, activeUsers: 35000, rating: 4.5 },
      { date: '2024', revenue: 4235000, installations: 66200, activeUsers: 55000, rating: 4.8 },
      { date: '2025', revenue: 7500000, installations: 95000, activeUsers: 85000, rating: 4.9 }
    ]
  };
  
  const performanceData = allData[timeRange];

  const categoryData = [
    { name: 'Integration', value: 35 },
    { name: 'Analytics', value: 25 },
    { name: 'Security', value: 20 },
    { name: 'Communication', value: 15 },
    { name: 'Automation', value: 5 }
  ];

  const metrics = [
    { key: 'revenue', label: 'Revenue', color: '#8b5cf6' },
    { key: 'installations', label: 'Installations', color: '#2563eb' },
    { key: 'activeUsers', label: 'Active Users', color: '#16a34a' },
    { key: 'rating', label: 'Rating', color: '#dc2626' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Marketplace Analytics</h2>
          <p className="text-gray-600">Performance metrics and insights</p>
        </div>
        <div className="flex gap-4">
          {['month', 'quarter', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg ${
                timeRange === range
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}ly
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold">Revenue</h4>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            ${(performanceData[performanceData.length - 1].revenue).toLocaleString()}
          </div>
          <div className="text-sm text-purple-600">Monthly Revenue</div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Download className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold">Installations</h4>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {performanceData[performanceData.length - 1].installations.toLocaleString()}
          </div>
          <div className="text-sm text-blue-600">Total Installations</div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold">Active Users</h4>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {performanceData[performanceData.length - 1].activeUsers.toLocaleString()}
          </div>
          <div className="text-sm text-green-600">Monthly Active Users</div>
        </div>

        <div className="bg-rose-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-rose-600" />
            <h4 className="font-semibold">Rating</h4>
          </div>
          <div className="text-2xl font-bold text-rose-600">
            {performanceData[performanceData.length - 1].rating.toFixed(1)}
          </div>
          <div className="text-sm text-rose-600">Average Rating</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Performance Trends */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Performance Trends</h3>
            <div className="flex gap-2">
              {metrics.map((metric) => (
                <button
                  key={metric.key}
                  onClick={() => setSelectedMetric(metric.key)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    selectedMetric === metric.key
                      ? 'bg-purple-600 text-white'
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  {metric.label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={metrics.find(m => m.key === selectedMetric).color}
                  name={metrics.find(m => m.key === selectedMetric).label}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-6">Category Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" name="Market Share %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Extensions */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Top Performing Extensions</h3>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Extension {i}</h4>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm">4.8</span>
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Category: {categoryData[i - 1].name}
              </div>
              <div className="flex justify-between text-sm">
                <span>Downloads: 5K+</span>
                <span>Revenue: $25K</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}