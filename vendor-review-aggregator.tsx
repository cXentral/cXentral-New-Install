import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MessageCircle, Star, TrendingUp, AlertCircle, BarChart2, Users } from 'lucide-react';

const reviewSources = [
  { id: 'g2', name: 'G2', color: '#2563eb' },
  { id: 'trustradius', name: 'TrustRadius', color: '#7c3aed' },
  { id: 'gartner', name: 'Gartner Peer Reviews', color: '#16a34a' },
  { id: 'capterra', name: 'Capterra', color: '#dc2626' }
];

const aggregatedReviews = {
  'Genesys': {
    overall: 4.6,
    sentiment: 0.82,
    reviews: 1250,
    trending: 0.03,
    sources: {
      g2: { score: 4.5, reviews: 450, sentiment: 0.81 },
      trustradius: { score: 4.7, reviews: 380, sentiment: 0.84 },
      gartner: { score: 4.6, reviews: 220, sentiment: 0.82 },
      capterra: { score: 4.5, reviews: 200, sentiment: 0.80 }
    },
    history: [
      { date: '2024-01', score: 4.5, sentiment: 0.79 },
      { date: '2024-02', score: 4.6, sentiment: 0.81 },
      { date: '2024-03', score: 4.6, sentiment: 0.82 }
    ],
    keyTopics: [
      { topic: 'Customer Support', sentiment: 0.88, mentions: 420 },
      { topic: 'API Integration', sentiment: 0.76, mentions: 380 },
      { topic: 'Reliability', sentiment: 0.84, mentions: 290 },
      { topic: 'Documentation', sentiment: 0.72, mentions: 250 }
    ]
  }
  // Add more vendors...
};

const SentimentGauge = ({ value }) => {
  const rotation = (value - 0.5) * 180; // Convert 0-1 to -90 to +90 degrees

  return (
    <div className="relative w-32 h-16 mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full opacity-20" />
      <div 
        className="absolute bottom-0 left-1/2 w-1 h-8 bg-blue-600 origin-bottom transform -translate-x-1/2"
        style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
      />
    </div>
  );
};

export default function VendorReviewDashboard() {
  const [selectedVendor, setSelectedVendor] = useState('Genesys');
  const [timeRange, setTimeRange] = useState('3m');
  
  const vendorData = aggregatedReviews[selectedVendor];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Vendor Review Analysis</h2>
          <p className="text-gray-600">Real-time review aggregation and sentiment analysis</p>
        </div>
        <div className="flex gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <h3 className="font-medium">Overall Score</h3>
          </div>
          <div className="text-3xl font-bold">{vendorData.overall}</div>
          <div className="text-sm text-gray-600">Across all platforms</div>
        </div>

        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium">Total Reviews</h3>
          </div>
          <div className="text-3xl font-bold">{vendorData.reviews}</div>
          <div className="text-sm text-gray-600">From all sources</div>
        </div>

        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="font-medium">Sentiment Score</h3>
          </div>
          <div className="text-3xl font-bold">{(vendorData.sentiment * 100).toFixed(0)}%</div>
          <SentimentGauge value={vendorData.sentiment} />
        </div>

        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h3 className="font-medium">Trending</h3>
          </div>
          <div className="text-3xl font-bold">+{(vendorData.trending * 100).toFixed(1)}%</div>
          <div className="text-sm text-gray-600">Month over month</div>
        </div>
      </div>

      {/* Source Breakdown */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Review Source Breakdown</h3>
          <div className="space-y-4">
            {reviewSources.map((source) => {
              const data = vendorData.sources[source.id];
              return (
                <div key={source.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{source.name}</div>
                    <div className="text-sm text-gray-600">{data.reviews} reviews</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{data.score}</div>
                    <div className="text-sm text-gray-600">
                      {(data.sentiment * 100).toFixed(0)}% positive
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Key Topics</h3>
          <div className="space-y-4">
            {vendorData.keyTopics.map((topic) => (
              <div key={topic.topic} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{topic.topic}</span>
                  <span className="text-gray-600">{topic.mentions} mentions</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${topic.sentiment * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Review Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={vendorData.history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#2563eb" 
                name="Score" 
              />
              <Line 
                type="monotone" 
                dataKey="sentiment" 
                stroke="#7c3aed" 
                name="Sentiment" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}