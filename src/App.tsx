import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { StatCards } from './components/StatCards';
import { ChartsSection } from './components/ChartsSection';
import { DataTable } from './components/DataTable';
import { RecentActivity } from './components/RecentActivity';
import { SettingsUI } from './components/SettingsUI';
import { AIAssistant } from './components/AIAssistant';
import { ThemeProvider } from './context/ThemeContext';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowUpRight, Cpu, Bot, Rocket, Shield, Key } from 'lucide-react';

const DashboardContent: React.FC = () => {
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">
      {/* 1. Welcome / Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 dark:from-indigo-950 dark:via-slate-950 dark:to-black text-white border border-indigo-500/20 shadow-xl"
      >
        {/* Floating Glowing Particle elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-md border border-white/5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Platform Engine v2.4-beta</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-indigo-300 via-cyan-200 to-white bg-clip-text text-transparent">Jane</span>!
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
              Your autonomous AI clusters are executing normally. Average latency is stable at <strong className="text-white">42ms</strong>. No anomalous threat vectors detected today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs backdrop-blur-md">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold text-slate-200">{dateStr}</span>
            </div>
            <button className="px-4 py-2.5 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer">
              <span>Cluster Console</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* 2. Stats Summary cards */}
      <StatCards />

      {/* 3. Analytics Charts */}
      <ChartsSection />

      {/* 4. Details Section (Table & Activity side-by-side) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <DataTable />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

const ProjectsView: React.FC = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <div className="glass-panel p-8 rounded-2xl shadow-lg border border-slate-200/10 dark:border-slate-800/20 text-center max-w-xl mx-auto my-12 space-y-4">
      <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 mx-auto">
        <Rocket className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold">Project Architecture</h3>
      <p className="text-xs text-slate-500">Deploy, manage, and scale your microservices clusters directly inside Gravity Cloud workspaces.</p>
      <button className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md active:scale-95 transition-all cursor-pointer">
        Create New Microservice
      </button>
    </div>
  </motion.div>
);

const AIToolsView: React.FC = () => {
  const tools = [
    { title: "Query Optimizer", desc: "Analyzes PostgreSQL execution plans and dynamically indexes hot-tables.", icon: Cpu, state: "Armed" },
    { title: "Code Refactor Bot", desc: "Automatically converts legacy javascript controllers to modern optimized hooks.", icon: Bot, state: "Active" },
    { title: "WAF Security Agent", desc: "Monitors HTTP ingress points to actively block DDoS and SQL injections.", icon: Shield, state: "Running" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tools.map((t, idx) => (
        <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-200/10 dark:border-indigo-500/15 shadow-lg flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <t.icon className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm">{t.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.desc}</p>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200/10 dark:border-slate-800/20 pt-4">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.state}</span>
            </span>
            <button className="px-3 py-1.5 text-[10px] font-bold rounded-lg border border-slate-200/20 hover:bg-slate-100/50 dark:hover:bg-slate-900/50 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 transition-colors cursor-pointer">
              Launch Agent
            </button>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

const MessagesView: React.FC = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-6 rounded-2xl border border-slate-200/10 dark:border-slate-800/20 shadow-lg h-96 flex flex-col justify-center items-center gap-3">
    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
      <Bot className="w-6 h-6" />
    </div>
    <h4 className="font-bold text-sm">Inbox is empty</h4>
    <p className="text-xs text-slate-500 dark:text-slate-400">All alerts and server notifications are currently piped to your slack channel.</p>
  </motion.div>
);

const FinanceView: React.FC = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-6 rounded-2xl border border-slate-200/10 dark:border-slate-800/20 shadow-lg h-96 flex flex-col justify-center items-center gap-3">
    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
      <Key className="w-6 h-6" />
    </div>
    <h4 className="font-bold text-sm">Billing Details</h4>
    <p className="text-xs text-slate-500 dark:text-slate-400">Your enterprise subscription is billing to Visa ending in 4242. Current accrued API balance: $12.80.</p>
  </motion.div>
);

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'settings':
        return <SettingsUI />;
      case 'projects':
        return <ProjectsView />;
      case 'ai-tools':
        return <AIToolsView />;
      case 'messages':
        return <MessagesView />;
      case 'analytics':
        return (
          <div className="space-y-6">
            <ChartsSection />
            <DataTable />
          </div>
        );
      case 'users':
        return <DataTable />;
      case 'finance':
        return <FinanceView />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#030712] bg-grid-pattern transition-colors duration-300">
      {/* Sidebar navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar setIsOpenMobile={setIsOpenMobile} isOpenMobile={isOpenMobile} />
        
        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {renderContent()}
        </main>
      </div>

      {/* Autonomous chat assistant */}
      <AIAssistant />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
