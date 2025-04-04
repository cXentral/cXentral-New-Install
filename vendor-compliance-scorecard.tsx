import React, { useState } from 'react';
import { Shield, AlertCircle, CheckCircle, XCircle, AlertTriangle, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ComplianceScorecard = () => {
  const [selectedVendor, setSelectedVendor] = useState('Genesys');
  const [timeRange, setTimeRange] = useState('3m');

  const complianceData = {
    'Genesys': {
      overall: 94,
      categories: {
        'Data Privacy': {
          score: 95,
          status: 'compliant',
          certifications: ['GDPR', 'CCPA', 'HIPAA'],
          lastAudit: '2024-01-15',
          issues: []
        },
        'Security': {
          score: 98,
          status: 'compliant',
          certifications: ['SOC 2', 'ISO 27001', 'PCI DSS'],
          lastAudit: '2024-02-01',
          issues: []
        },
        'Operational': {
          score: 92,
          status: 'warning',
          certifications: ['ISO 9001'],
          lastAudit: '2024-01-20',
          issues: ['Minor documentation gaps']
        },
        'API Compliance': {
          score: 90,
          status: 'warning',
          certifications: ['OpenAPI'],
          lastAudit: '2024-01-10',
          issues: ['Rate limiting documentation needed']
        }
      },
      history: [
        { month: 'Jan', score: 92 },
        { month: 'Feb', score: 93 },
        { month: 'Mar', score: 94 }
      ]
    }
    // Add more vendors...
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'non-compliant':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const vendorData = complianceData[selectedVendor];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Compliance Scorecard</h2>
          <p className="text-gray-600">Vendor compliance monitoring and certification tracking</p>
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

      {/* Overall Score */}
      <div className="bg-white rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold mb-2">Overall Compliance Score</div>
            <div className="text-4xl font-bold text-purple-600">{vendorData.overall}%</div>
          </div>
          <div className="h-24 w-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vendorData.history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Scores */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {Object.entries(vendorData.categories).map(([category, data]) => (
          <div key={category} className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold">{category}</h3>
              </div>
              {getStatusIcon(data.status)}
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Compliance Score</div>
                <div className="text-2xl font-bold">{data.score}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-2">Certifications</div>
                <div className="flex flex-wrap gap-2">
                  {data.certifications.map((cert) => (
                    <span key={cert} className="px-2 py-1 bg-purple-100 text-purple-600 rounded">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
              {data.issues.length > 0 && (
                <div>
                  <div className="text-sm text-gray-600 mb-2">Issues</div>
                  <div className="space-y-1">
                    {data.issues.map((issue, index) => (
                      <div key={index} className="flex items-center gap-2 text-yellow-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="text-sm text-gray-600">
                Last Audited: {new Date(data.lastAudit).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Compliance Documents */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="font-semibold mb-4">Compliance Documentation</h3>
        <div className="grid grid-cols-3 gap-4">
          {['Privacy Policy', 'Security Whitepaper', 'Compliance Report', 'API Documentation'].map((doc) => (
            <div key={doc} className="flex items-center gap-3 p-3 border rounded-lg">
              <FileText className="w-5 h-5 text-purple-600" />
              <span>{doc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceScorecard;