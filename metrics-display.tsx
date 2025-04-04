import React from 'react';
import { BarChart2, Clock, TrendingUp, Users } from 'lucide-react';

export default function MetricsDisplay() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* FCR Card */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">FCR</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-2">First Call Resolution</p>
          <div className="text-2xl font-bold text-green-500">+30%</div>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-2">
            <div 
              className="bg-green-500 h-full rounded-full"
              style={{ width: '80%' }}
            />
          </div>
        </div>

        {/* AHT Card */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">AHT</h3>
            <Clock className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-sm text-gray-600 mb-2">Average Handling Time</p>
          <div className="text-2xl font-bold text-red-500">-28%</div>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-2">
            <div 
              className="bg-red-500 h-full rounded-full"
              style={{ width: '72%' }}
            />
          </div>
        </div>

        {/* ART Card */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">ART</h3>
            <Users className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-sm text-gray-600 mb-2">Average Resolution Time</p>
          <div className="text-2xl font-bold text-purple-500">-30%</div>
          <div className="flex gap-1 mt-2">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i < 7 ? 'bg-purple-500' : 'bg-gray-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CSAT Card */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">CSAT</h3>
            <BarChart2 className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-sm text-gray-600 mb-2">Customer Satisfaction</p>
          <div className="text-2xl font-bold text-blue-500">95%</div>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-2">
            <div 
              className="bg-blue-500 h-full rounded-full"
              style={{ width: '95%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}