import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Menu, 
  ChevronDown, 
  Settings, 
  User, 
  LogOut, 
  Sparkles,
  Command
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface TopbarProps {
  setIsOpenMobile: (open: boolean) => void;
  isOpenMobile: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({ setIsOpenMobile, isOpenMobile }) => {
  const { theme, toggleTheme } = useTheme();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "AI training job completed successfully.", time: "5m ago", read: false },
    { id: 2, text: "New user registration milestone hit (10k).", time: "1h ago", read: false },
    { id: 3, text: "System usage spiked 15% in region EU-West.", time: "2h ago", read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-20 w-full glass-panel border-b border-slate-200/20 dark:border-slate-800/40 px-6 py-4 flex items-center justify-between text-slate-800 dark:text-slate-100">
      {/* Left section: Hamburger (mobile) & Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="p-2 rounded-lg md:hidden hover:bg-slate-200/40 dark:hover:bg-slate-800/40 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search commands, docs, stats..."
            className="w-full pl-10 pr-12 py-2 text-sm rounded-xl border border-slate-200/20 dark:border-slate-800/40 bg-slate-100/50 dark:bg-slate-900/30 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-0.5 px-1.5 py-0.5 border border-slate-200/20 dark:border-slate-800/50 bg-slate-200/50 dark:bg-slate-800/30 rounded-md text-[10px] text-slate-400 font-mono pointer-events-none">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right section: Quick actions, notifications, theme, profile */}
      <div className="flex items-center gap-4">
        {/* Quick Action Button */}
        <button className="hidden lg:flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 transition-all duration-200 cursor-pointer">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Deploy v2.4</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-slate-200/20 hover:bg-slate-200/40 dark:hover:bg-slate-800/40 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all cursor-pointer relative"
          title="Toggle Theme"
        >
          <motion.div
            animate={{ rotate: theme === 'dark' ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </motion.div>
        </button>

        {/* Notifications Dropdown Container */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileDropdown(false);
            }}
            className="p-2.5 rounded-xl border border-slate-200/20 hover:bg-slate-200/40 dark:hover:bg-slate-800/40 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all cursor-pointer relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-white dark:ring-slate-900 animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowNotifications(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-80 rounded-2xl glass-panel border border-slate-200/30 dark:border-slate-800/50 shadow-2xl p-4 z-40"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/10 dark:border-slate-800/10">
                    <h3 className="text-sm font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-[10px] text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium cursor-pointer"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map(n => (
                      <div 
                        key={n.id} 
                        className={`p-2.5 rounded-xl text-xs transition-colors flex flex-col gap-1 border border-transparent ${
                          n.read 
                            ? 'text-slate-500 hover:bg-slate-100/50 dark:hover:bg-slate-900/30' 
                            : 'bg-indigo-500/5 text-slate-800 dark:text-slate-200 border-indigo-500/10 hover:bg-indigo-500/10'
                        }`}
                      >
                        <p>{n.text}</p>
                        <span className="text-[9px] text-slate-400">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Dropdown Container */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl border border-slate-200/20 hover:bg-slate-200/40 dark:hover:bg-slate-800/40 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-semibold">
                JD
              </div>
            </div>
            <span className="text-xs font-semibold hidden md:inline-block">Jane Doe</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" />
          </button>

          <AnimatePresence>
            {showProfileDropdown && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowProfileDropdown(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-56 rounded-2xl glass-panel border border-slate-200/30 dark:border-slate-800/50 shadow-2xl p-2.5 z-40"
                >
                  <div className="p-2 border-b border-slate-200/10 dark:border-slate-800/10 mb-1.5">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="text-sm font-semibold truncate">jane.doe@gravity.ai</p>
                  </div>
                  <div className="space-y-1">
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-900/50 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left">
                      <User className="w-4 h-4 text-slate-400" />
                      <span>My Profile</span>
                    </button>
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-900/50 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left">
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>System Settings</span>
                    </button>
                    <hr className="border-slate-200/10 dark:border-slate-800/10 my-1.5" />
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-rose-500 font-semibold cursor-pointer text-left">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
