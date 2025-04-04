import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Users, DollarSign, AlertTriangle, CheckCircle, Clock, 
  BarChart2, MessageCircle, Shield, Settings, Search 
} from 'lucide-react';

export default function VendorManagement() {
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [timeRange, setTimeRange] = useState('month');

  const vendors = [
    {
      id: 1,
      name: 'Data Visualization Pro',
      category: 'Analytics',
      status: 'active',
      complianceScore: 98,
      supportScore: 4.8,
      revenue: 45000,
      users: 2800,
      pendingTickets: 3,
      lastUpdate: '2 hours ago'
    },
    {
      id: 2,
      name: 'Integration Hub',
      category: 'Integration',
      status: 'active',
      complianceScore: 95,
      supportScore: 4.6,
      revenue: 38000,
      users: 2100,
      pendingTickets: 5,
      lastUpdate: '1 hour ago'
    },
    {
      id: 3,
      name: 'Security Suite',
      category: 'Security',
      status: 'warning',
      complianceScore: 92,
      supportScore: 4.5,
      revenue: 32000,
      users: 1800,
      pendingTickets: 8,
      lastUpdate: '30 minutes ago'
    }
  ];

  const performanceData = [
    { month: 'Jan', revenue: 35000, users: 2000, tickets: 45 },
    { month: 'Feb', revenue: 38000, users: 2200, tickets: 42 },
    { month: 'Mar', revenue: 42000, users: 2400, tickets: 38 },
    { month: 'Apr', revenue: 45000, users: 2800, tickets: 35 }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Vendor Management</h2>
          <p className="text-gray-600">Monitor and manage marketplace vendors</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search vendors..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold">Total Revenue</h4>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            ${(115000).toLocaleString()}
          </div>
          <div className="text-sm text-purple-600">Monthly Revenue</div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold">Active Users</h4>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {(6700).toLocaleString()}
          </div>
          <div className="text-sm text-blue-600">Across All Vendors</div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold">Compliance</h4>
          </div>
          <div className="text-2xl font-bold text-green-600">95%</div>
          <div className="text-sm text-green-600">Average Score</div>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-5 h-5 text-orange-600" />
            <h4 className="font-semibold">Support</h4>
          </div>
          <div className="text-2xl font-bold text-orange-600">16</div>
          <div className="text-sm text-orange-600">Open Tickets</div>
        </div>
      </div>

      {/* Vendor List */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Active Vendors</h3>
          <div className="flex gap-2">
            {['all', 'analytics', 'integration', 'security'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedVendor(category)}
                className={`px-4 py-2 rounded-lg ${
                  selectedVendor === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold">{vendor.name}</h4>
                    <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                      {vendor.category}
                    </span>
                    {vendor.status === 'warning' && (
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Last updated: {vendor.lastUpdate}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Monthly Revenue</div>
                    <div className="font-semibold">${vendor.revenue.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Active Users</div>
                    <div className="font-semibold">{vendor.users.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Support Tickets</div>
                    <div className="font-semibold">{vendor.pendingTickets}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Compliance Score</div>
                    <div className="font-semibold">{vendor.complianceScore}%</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-6">Revenue Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8b5cf6" 
                  name="Revenue" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-6">Support Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="tickets" 
                  fill="#8b5cf6" 
                  name="Support Tickets" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}