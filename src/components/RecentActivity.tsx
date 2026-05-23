import React from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch, 
  AlertTriangle, 
  ArrowUpRight, 
  Settings,
  ShieldCheck,
  Bot
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'deploy' | 'alert' | 'info' | 'system' | 'ai';
  title: string;
  description: string;
  time: string;
  user?: {
    name: string;
    avatar: string;
  };
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'deploy',
    title: "Production deploy v2.3.9 completed",
    description: "Main branch was compiled and deployed to AWS us-east-1. 24 services updated.",
    time: "12 mins ago",
    user: { name: "Elena Rostova", avatar: "ER" }
  },
  {
    id: '2',
    type: 'ai',
    title: "Autonomous DB Optimization run",
    description: "AI Database Agent re-indexed 4 tables, reducing query latency by 180ms.",
    time: "45 mins ago"
  },
  {
    id: '3',
    type: 'alert',
    title: "High API Error Rate in EU-West",
    description: "Gateway router returned 502 Bad Gateway for 4.2% of calls. Resolved by auto-scaling.",
    time: "2 hours ago"
  },
  {
    id: '4',
    type: 'system',
    title: "Daily database backup secured",
    description: "Encrypted snapshot stored in decentralized cold storage. Integrity check verified (100%).",
    time: "5 hours ago"
  },
  {
    id: '5',
    type: 'info',
    title: "Enterprise client activated: Stripe",
    description: "Configured multi-region cluster and dedicated load balancing. SLA 99.99% active.",
    time: "1 day ago",
    user: { name: "Alexander Wright", avatar: "AW" }
  }
];

const getIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'deploy':
      return <GitBranch className="w-4 h-4 text-indigo-500" />;
    case 'alert':
      return <AlertTriangle className="w-4 h-4 text-rose-500" />;
    case 'info':
      return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
    case 'ai':
      return <Bot className="w-4 h-4 text-cyan-500" />;
    default:
      return <Settings className="w-4 h-4 text-slate-500" />;
  }
};

const getBgColor = (type: ActivityItem['type']) => {
  switch (type) {
    case 'deploy':
      return 'bg-indigo-500/10 border-indigo-500/20';
    case 'alert':
      return 'bg-rose-500/10 border-rose-500/20';
    case 'info':
      return 'bg-emerald-500/10 border-emerald-500/20';
    case 'ai':
      return 'bg-cyan-500/10 border-cyan-500/20';
    default:
      return 'bg-slate-500/10 border-slate-500/20';
  }
};

export const RecentActivity: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="glass-panel p-6 rounded-2xl shadow-lg flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-slate-800 dark:text-slate-100">Live Activity Feed</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Real-time platform logs, deployments, and background executions.</p>
        </div>
        <button className="text-xs text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold flex items-center gap-0.5 cursor-pointer">
          <span>View logs</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Timeline items list */}
      <div className="flex-1 relative pl-6 border-l border-slate-200/20 dark:border-slate-800/40 space-y-6">
        {activities.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 + 0.3 }}
            className="relative"
          >
            {/* Timeline Bullet Dot */}
            <div className={`absolute -left-[35px] top-0.5 w-6 h-6 rounded-full border flex items-center justify-center bg-background shadow-sm ${getBgColor(item.type)}`}>
              {getIcon(item.type)}
            </div>

            {/* Content card */}
            <div className="flex flex-col gap-1.5 p-3.5 rounded-xl border border-slate-200/10 dark:border-slate-800/20 hover:bg-slate-100/30 dark:hover:bg-slate-900/20 transition-all">
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">
                  {item.time}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>

              {/* Tag / Associated User info */}
              {item.user && (
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-500 dark:text-indigo-400 text-[8px] font-bold flex items-center justify-center">
                    {item.user.avatar}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">Triggered by {item.user.name}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
