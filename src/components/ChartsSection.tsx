import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { BarChart3, LineChart, Cpu } from 'lucide-react';

// Platform Overview Data (Area Chart)
const overviewData = [
  { month: 'Jan', revenue: 45000, cost: 18000, requests: 250000 },
  { month: 'Feb', revenue: 52000, cost: 20000, requests: 310000 },
  { month: 'Mar', revenue: 49000, cost: 19000, requests: 400000 },
  { month: 'Apr', revenue: 63000, cost: 24000, requests: 620000 },
  { month: 'May', revenue: 78000, cost: 28000, requests: 890000 },
  { month: 'Jun', revenue: 95000, cost: 32000, requests: 1200000 },
  { month: 'Jul', revenue: 120000, cost: 38000, requests: 1550000 },
  { month: 'Aug', revenue: 142384, cost: 42000, requests: 1842904 },
];

// User Growth Data (Bar Chart)
const userGrowthData = [
  { name: 'Mon', active: 18200, new: 1200 },
  { name: 'Tue', active: 19500, new: 1400 },
  { name: 'Wed', active: 20400, new: 1800 },
  { name: 'Thu', active: 21100, new: 1600 },
  { name: 'Fri', active: 22800, new: 2100 },
  { name: 'Sat', active: 23900, new: 2500 },
  { name: 'Sun', active: 24892, new: 2900 },
];

// AI Engine distribution Data (Pie Chart)
const aiModelData = [
  { name: 'GPT-4o', value: 45, color: '#6366f1' },
  { name: 'Claude 3.5 Sonnet', value: 35, color: '#06b6d4' },
  { name: 'Gemini 1.5 Pro', value: 15, color: '#ec4899' },
  { name: 'Llama 3.1', value: 5, color: '#f59e0b' },
];

// Custom Premium Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl flex flex-col gap-1.5 text-xs text-white">
        <p className="font-semibold text-slate-400 mb-0.5">{label}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pld.color || pld.fill }} />
            <span className="text-slate-300 capitalize">{pld.name}:</span>
            <span className="font-mono font-bold">
              {typeof pld.value === 'number' && pld.name.includes('revenue') ? `$${pld.value.toLocaleString()}` : pld.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const ChartsSection: React.FC = () => {
  const [activeChart, setActiveChart] = useState<'revenue' | 'requests'>('revenue');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Main Platform Overview (Area Chart) - Spans 2 columns */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col shadow-lg"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-500">
              <LineChart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Platform Overview</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Monthly breakdown of platform activities and earnings</p>
            </div>
          </div>

          {/* Toggle buttons for Area chart */}
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-900/80 p-1 border border-slate-200/10">
            <button
              onClick={() => setActiveChart('revenue')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeChart === 'revenue' 
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Revenue / Cost
            </button>
            <button
              onClick={() => setActiveChart('requests')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeChart === 'requests' 
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              AI Requests
            </button>
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={overviewData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.08)" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(val) => activeChart === 'revenue' ? `$${val / 1000}k` : `${val / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />

              {activeChart === 'revenue' ? (
                <>
                  <Area 
                    type="monotone" 
                    name="revenue" 
                    dataKey="revenue" 
                    stroke="#6366f1" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                  <Area 
                    type="monotone" 
                    name="server cost" 
                    dataKey="cost" 
                    stroke="#06b6d4" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorCost)" 
                  />
                </>
              ) : (
                <Area 
                  type="monotone" 
                  name="requests" 
                  dataKey="requests" 
                  stroke="#a855f7" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRequests)" 
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* 2. AI Model usage distribution (Pie Chart) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="glass-panel p-6 rounded-2xl flex flex-col justify-between shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-500">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">AI Model Usage</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Distribution of active models API requests</p>
          </div>
        </div>

        {/* Pie Container */}
        <div className="h-52 w-full flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={aiModelData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {aiModelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Absolute Center Stats */}
          <div className="absolute text-center flex flex-col">
            <span className="text-2xl font-extrabold tracking-tight font-mono">1.8M</span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">AI Calls</span>
          </div>
        </div>

        {/* Custom Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {aiModelData.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100/50 dark:hover:bg-slate-900/30 transition-colors">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
              <div className="overflow-hidden flex flex-col">
                <span className="text-xs font-semibold truncate text-slate-700 dark:text-slate-300">{entry.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">{entry.value}% requests</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 3. User Acquisition (Bar Chart) - Full width on standard, column on dashboard */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="lg:col-span-3 glass-panel p-6 rounded-2xl flex flex-col shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-500">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">User Acquisition & Activity</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Weekly comparison of active vs newly registered accounts</p>
          </div>
        </div>

        {/* Bar Chart Container */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.08)" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingBottom: 10 }} />
              <Bar name="Active Accounts" dataKey="active" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={30} />
              <Bar name="New Registrations" dataKey="new" fill="#06b6d4" radius={[4, 4, 0, 0]} maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};
