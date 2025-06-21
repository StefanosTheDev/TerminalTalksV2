import React from 'react';
import { Headphones, Users, Zap } from 'lucide-react';

const stats = [
  {
    icon: Headphones,
    value: '150+',
    label: 'Episodes',
    iconColor: 'text-purple-400',
  },
  { icon: Users, value: '25K+', label: 'Learners', iconColor: 'text-blue-400' },
  { icon: Zap, value: '4.8', label: 'Rating', iconColor: 'text-green-400' },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-16">
      {stats.map(({ icon: Icon, value, label, iconColor }) => (
        <div
          key={label}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
        >
          <Icon className={`w-8 h-8 mx-auto mb-3 ${iconColor}`} />
          <div className="text-3xl font-bold mb-1">{value}</div>
          <div className="text-gray-400">{label}</div>
        </div>
      ))}
    </div>
  );
}
