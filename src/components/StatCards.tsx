import React from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Users, 
  Cpu, 
  Percent, 
  HardDrive,
  TrendingUp, 
  TrendingDown 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

interface StatItem {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType<any>;
  color: string;
  glowColor: string;
  chartData: { val: number }[];
}

const statsData: StatItem[] = [
  {
    title: "Total Revenue",
    value: "$142,384.00",
    change: "+12.4%",
    isPositive: true,
    icon: DollarSign,
    color: "from-emerald-500 to-teal-400",
    glowColor: "rgba(16, 185, 129, 0.15)",
    chartData: [{ val: 120 }, { val: 135 }, { val: 125 }, { val: 140 }, { val: 138 }, { val: 148 }, { val: 155 }]
  },
  {
    title: "Active Users",
    value: "24,892",
    change: "+8.2%",
    isPositive: true,
    icon: Users,
    color: "from-indigo-500 to-blue-400",
    glowColor: "rgba(99, 102, 241, 0.15)",
    chartData: [{ val: 18 }, { val: 20 }, { val: 21 }, { val: 23 }, { val: 22 }, { val: 24 }, { val: 25 }]
  },
  {
    title: "AI Requests",
    value: "1,842,904",
    change: "+28.4%",
    isPositive: true,
    icon: Cpu,
    color: "from-purple-500 to-pink-400",
    glowColor: "rgba(168, 85, 247, 0.15)",
    chartData: [{ val: 800 }, { val: 950 }, { val: 1100 }, { val: 1300 }, { val: 1500 }, { val: 1700 }, { val: 1850 }]
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "+0.4%",
    isPositive: true,
    icon: Percent,
    color: "from-cyan-500 to-blue-400",
    glowColor: "rgba(6, 182, 212, 0.15)",
    chartData: [{ val: 2.8 }, { val: 2.9 }, { val: 3.1 }, { val: 3.0 }, { val: 3.1 }, { val: 3.2 }, { val: 3.24 }]
  },
  {
    title: "Server Usage",
    value: "94.2%",
    change: "-1.2%",
    isPositive: false,
    icon: HardDrive,
    color: "from-rose-500 to-orange-400",
    glowColor: "rgba(239, 68, 68, 0.15)",
    chartData: [{ val: 96 }, { val: 95 }, { val: 97 }, { val: 93 }, { val: 92 }, { val: 95 }, { val: 94.2 }]
  }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export const StatCards: React.FC = () => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
    >
      {statsData.map((stat, i) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            style={{ '--glow-color': stat.glowColor } as React.CSSProperties}
            className="relative glass-panel glass-panel-hover p-5 rounded-2xl overflow-hidden flex flex-col justify-between group shadow-lg cursor-pointer"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr from-transparent to-indigo-500/5 dark:to-indigo-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-300 pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                {stat.title}
              </span>
              <div className={`p-2 rounded-xl bg-gradient-to-tr ${stat.color} text-white shadow-md shadow-indigo-500/5`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mb-2">
              <h3 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-50 font-mono">
                {stat.value}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                {stat.isPositive ? (
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                )}
                <span className={`text-xs font-bold ${stat.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.change}
                </span>
                <span className="text-[10px] text-slate-400">vs last month</span>
              </div>
            </div>

            {/* Sparkline chart */}
            <div className="h-10 mt-2 -mx-5 -mb-5 relative opacity-85 group-hover:opacity-100 transition-opacity">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stat.chartData}>
                  <defs>
                    <linearGradient id={`gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={stat.isPositive ? '#10b981' : '#ef4444'} stopOpacity={0.25} />
                      <stop offset="100%" stopColor={stat.isPositive ? '#10b981' : '#ef4444'} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="val"
                    stroke={stat.isPositive ? '#10b981' : '#ef4444'}
                    strokeWidth={1.5}
                    fillOpacity={1}
                    fill={`url(#gradient-${i})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
