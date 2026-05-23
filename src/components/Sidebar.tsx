import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users2, 
  MessageSquare, 
  FolderGit, 
  Bot, 
  DollarSign, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { cn } from '../utils/cn';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'users', label: 'Users', icon: Users2 },
  { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 3 },
  { id: 'projects', label: 'Projects', icon: FolderGit },
  { id: 'ai-tools', label: 'AI Tools', icon: Bot, isNew: true },
  { id: 'finance', label: 'Finance', icon: DollarSign },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  isOpenMobile,
  setIsOpenMobile
}) => {
  const sidebarWidth = isCollapsed ? 'w-20' : 'w-64';

  const sidebarContent = (
    <div className="flex flex-col h-full glass-panel border-r border-slate-200/20 dark:border-slate-800/40 text-slate-800 dark:text-slate-100 relative">
      {/* Brand logo section */}
      <div className="p-6 flex items-center justify-between border-b border-slate-200/10 dark:border-slate-800/20">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="p-2.5 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-xl shadow-lg shadow-indigo-500/30 flex-shrink-0 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300 bg-clip-text text-transparent tracking-tight whitespace-nowrap"
            >
              Gravity AI
            </motion.span>
          )}
        </div>

        {/* Desktop Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex p-1.5 rounded-lg border border-slate-200/20 hover:bg-slate-200/20 dark:hover:bg-slate-800/40 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all cursor-pointer"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpenMobile(false); // Close drawer on mobile click
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 group relative cursor-pointer",
                isActive 
                  ? "bg-gradient-to-r from-indigo-500/10 to-cyan-500/5 text-indigo-600 dark:text-indigo-400 font-medium border border-indigo-500/15" 
                  : "hover:bg-slate-100/50 dark:hover:bg-slate-900/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent"
              )}
            >
              {/* Active Glow Bar */}
              {isActive && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute left-0 w-1 h-6 bg-gradient-to-b from-indigo-500 to-cyan-400 rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105 duration-200", 
                isActive ? "text-indigo-500 dark:text-indigo-400" : "text-slate-400"
              )} />
              
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm whitespace-nowrap flex-grow text-left"
                >
                  {item.label}
                </motion.span>
              )}

              {/* Notification Badges / Tags */}
              {!isCollapsed && item.badge && (
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {item.badge}
                </span>
              )}
              
              {!isCollapsed && item.isNew && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 tracking-wider uppercase">
                  New
                </span>
              )}

              {/* Tooltip for collapsed mode */}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-2.5 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-800 text-white text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl z-50 pointer-events-none whitespace-nowrap border border-slate-700/30">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* User profile footer for Sidebar */}
      <div className={cn(
        "p-4 border-t border-slate-200/10 dark:border-slate-800/20 flex items-center gap-3 overflow-hidden",
        isCollapsed ? "justify-center" : "justify-start"
      )}>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 flex-shrink-0 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white text-sm font-semibold">
            JD
          </div>
        </div>
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-hidden"
          >
            <p className="text-sm font-semibold truncate">Jane Doe</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">jane.doe@gravity.ai</p>
          </motion.div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside 
        animate={{ width: isCollapsed ? 80 : 256 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "hidden md:block h-screen sticky top-0 z-30 transition-shadow",
          sidebarWidth
        )}
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isOpenMobile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpenMobile(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 z-50 md:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
