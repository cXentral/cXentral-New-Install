import React, { useState, useEffect } from 'react';
import { 
  Building2, TrendingUp, ShieldCheck, Cloud,  
  LineChart, Users, Box, CheckCircle, XCircle,
  AlertTriangle, Star, DollarSign, BarChart2
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Comprehensive vendor data incorporating all Gartner categories
const vendorData = {
  ccaas: {
    genesys: {
      name: 'Genesys Cloud CX',
      rating: 4.7,
      reviews: 736,
      marketShare: 25,
      customerBase: 7000,
      pricing: {
        starter: 75,
        professional: 110,
        premium: 150
      },
      features: {
        ai: true,
        omnichannel: true,
        analytics: true,
        compliance: ['SOC2', 'HIPAA', 'GDPR']
      },
      deployment: ['cloud', 'hybrid'],
      integrations: ['Salesforce', 'Microsoft Teams', 'Zendesk']
    },
    nice: {
      name: 'NICE CXone',
      rating: 4.6,
      reviews: 468,
      marketShare: 20,
      customerBase: 6500,
      pricing: {
        starter: 70,
        professional: 100,
        premium: 140
      },
      features: {
        ai: true,
        omnichannel: true,
        analytics: true,
        compliance: ['SOC2', 'HIPAA', 'PCI']
      },
      deployment: ['cloud'],
      integrations: ['ServiceNow', 'Oracle', 'SAP']
    }
  },
  cpaas: {
    twilio: {
      name: 'Twilio Platform',
      rating: 4.3,
      reviews: 126,
      marketShare: 28,
      customerBase: 240000,
      pricing: 'usage-based',
      features: {
        voice: true,
        messaging: true,
        video: true,
        compliance: ['SOC2', 'HIPAA', 'GDPR']
      },
      deployment: ['cloud'],
      integrations: ['All major platforms']
    },
    vonage: {
      name: 'Vonage API Platform',
      rating: 4.5,
      reviews: 121,
      marketShare: 15,
      customerBase: 120000,
      pricing: 'usage-based',
      features: {
        voice: true,
        messaging: true,
        video: true,
        compliance: ['SOC2', 'GDPR']
      },
      deployment: ['cloud'],
      integrations: ['Major CRM & UC platforms']
    }
  },
  cdp: {
    segment: {
      name: 'Twilio Segment',
      rating: 4.5,
      reviews: 83,
      marketShare: 18,
      customerBase: 25000,
      pricing: {
        startup: 120,
        business: 'custom',
        enterprise: 'custom'
      },
      features: {
        dataCollection: true,
        identityResolution: true,
        realtime: true,
        compliance: ['SOC2', 'GDPR', 'CCPA']
      },
      deployment: ['cloud'],
      integrations: ['200+ platforms']
    },
    salesforce: {
      name: 'Salesforce CDP',
      rating: 4.4,
      reviews: 111,
      marketShare: 22,
      customerBase: 150000,
      pricing: 'custom',
      features: {
        dataCollection: true,
        identityResolution: true,
        realtime: true,
        compliance: ['SOC2', 'HIPAA', 'GDPR']
      },
      deployment: ['cloud'],
      integrations: ['Salesforce ecosystem']
    }
  }
};

const VendorCard = ({ vendor }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{vendor.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm">{vendor.rating} ({vendor.reviews} reviews)</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium">{vendor.marketShare}% Market Share</div>
          <div className="text-sm text-gray-500">{vendor.customerBase.toLocaleString()} customers</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium mb-1">Deployment</div>
            <div className="flex flex-wrap gap-2">
              {vendor.deployment.map(type => (
                <span key={type} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  {type}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Compliance</div>
            <div className="flex flex-wrap gap-2">
              {vendor.features.compliance.map(cert => (
                <span key={cert} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {expanded && (
          <div className="space-y-4 pt-4 border-t">
            <div>
              <div className="text-sm font-medium mb-2">Key Features</div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(vendor.features)
                  .filter(([key]) => key !== 'compliance')
                  .map(([feature, enabled]) => (
                    <div key={feature} className="flex items-center gap-2">
                      {enabled ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Integrations</div>
              <div className="flex flex-wrap gap-2">
                {vendor.integrations.map(integration => (
                  <span key={integration} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    {integration}
                  </span>
                ))}
              </div>
            </div>

            {vendor.pricing !== 'usage-based' && vendor.pricing !== 'custom' && (
              <div>
                <div className="text-sm font-medium mb-2">Pricing Tiers</div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(vendor.pricing).map(([tier, price]) => (
                    <div key={tier} className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">{tier}</div>
                      <div className="font-medium">${price}/user</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-center text-sm text-purple-600 hover:text-purple-700 mt-2"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      </div>
    </div>
  );
};

const MarketAnalytics = ({ category }) => {
  const vendors = Object.values(vendorData[category]);
  const marketData = vendors.map(v => ({
    name: v.name.split(' ')[0],
    marketShare: v.marketShare,
    rating: v.rating * 20,
    reviews: v.reviews
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-semibold mb-4">Market Analysis: {category.toUpperCase()}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={marketData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="marketShare" fill="#8884d8" name="Market Share %" />
            <Bar dataKey="rating" fill="#82ca9d" name="Rating Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default function VendorIntelligence() {
  const [selectedCategory, setSelectedCategory] = useState('ccaas');
  const [view, setView] = useState('cards');

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Vendor Intelligence</h2>
        <p className="text-gray-600">Compare and analyze leading vendors across categories</p>
      </div>

      <div className="flex gap-4 mb-6">
        {Object.keys(vendorData).map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {Object.values(vendorData[selectedCategory]).map(vendor => (
          <VendorCard key={vendor.name} vendor={vendor} />
        ))}
      </div>

      <div className="mt-6">
        <MarketAnalytics category={selectedCategory} />
      </div>
    </div>
  );
}