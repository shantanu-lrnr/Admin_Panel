import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Key, 
  Eye, 
  EyeOff, 
  UploadCloud, 
  Check, 
  Copy,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export const SettingsUI: React.FC = () => {
  // Profile settings state
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@gravity.ai',
    company: 'Gravity AI Labs',
    tier: 'Enterprise'
  });
  
  // Security settings state
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Feature toggles
  const [toggles, setToggles] = useState({
    autoscaling: true,
    mfa: false,
    analytics: true,
  });

  // API Key state
  const [apiKey, setApiKey] = useState('gr_live_51Nv2jD9eKls92kdS20dKl93dJ9FlsP27d');
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  // Profile image upload state
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { label: 'Empty', color: 'bg-slate-200 dark:bg-slate-800', width: '0%', val: 0 };
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    switch (strength) {
      case 1:
        return { label: 'Weak', color: 'bg-rose-500', width: '25%', val: 1 };
      case 2:
        return { label: 'Fair', color: 'bg-amber-500', width: '50%', val: 2 };
      case 3:
        return { label: 'Good', color: 'bg-indigo-500', width: '75%', val: 3 };
      case 4:
        return { label: 'Strong', color: 'bg-emerald-500', width: '100%', val: 4 };
      default:
        return { label: 'Weak', color: 'bg-rose-500', width: '10%', val: 1 };
    }
  };

  const strength = getPasswordStrength();

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerateKey = () => {
    setRegenerating(true);
    setTimeout(() => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = 'gr_live_';
      for (let i = 0; i < 28; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setApiKey(result);
      setRegenerating(false);
    }, 1000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-slate-800 dark:text-slate-100"
    >
      {/* 1. Account Settings Card (Spans 2 cols) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="glass-panel p-6 rounded-2xl shadow-lg space-y-6">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Account Configuration</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Update your account name, email address, and platform affiliation details.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 pb-4 border-b border-slate-200/10 dark:border-slate-800/10">
            {/* Avatar uploader */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-dashed border-indigo-500/40 p-1 flex items-center justify-center overflow-hidden">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center text-slate-400 text-[10px]">
                    <UploadCloud className="w-6 h-6 text-slate-400 mb-1" />
                    <span>Upload</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </div>
            
            <div className="flex-1 space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-semibold">Profile Photo</h4>
              <p className="text-xs text-slate-400">PNG, JPG, or GIF. Max size 2MB. Drag & drop image directly to upload.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name input */}
            <div className="relative">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase absolute left-3.5 top-2.5">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full pl-3.5 pr-4 pt-7 pb-2.5 text-xs rounded-xl border border-slate-200/20 dark:border-slate-800/40 bg-slate-100/40 dark:bg-slate-900/20 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
              />
            </div>

            {/* Email input */}
            <div className="relative">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase absolute left-3.5 top-2.5">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full pl-3.5 pr-4 pt-7 pb-2.5 text-xs rounded-xl border border-slate-200/20 dark:border-slate-800/40 bg-slate-100/40 dark:bg-slate-900/20 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
              />
            </div>

            {/* Company input */}
            <div className="relative">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase absolute left-3.5 top-2.5">
                Affiliation / Company
              </label>
              <input
                type="text"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                className="w-full pl-3.5 pr-4 pt-7 pb-2.5 text-xs rounded-xl border border-slate-200/20 dark:border-slate-800/40 bg-slate-100/40 dark:bg-slate-900/20 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
              />
            </div>

            {/* Tier Select */}
            <div className="relative">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase absolute left-3.5 top-2">
                Subscription Tier
              </label>
              <select
                value={profile.tier}
                onChange={(e) => setProfile({ ...profile, tier: e.target.value })}
                className="w-full pl-3.5 pr-4 pt-6 pb-2 text-xs rounded-xl border border-slate-200/20 dark:border-slate-800/40 bg-slate-100/40 dark:bg-slate-900/20 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all cursor-pointer"
              >
                <option value="Free">Free Tier</option>
                <option value="Pro">Pro ($49/mo)</option>
                <option value="Enterprise">Enterprise (Custom)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/10 active:scale-95 transition-all cursor-pointer">
              Save Account Changes
            </button>
          </div>
        </div>

        {/* 2. API Keys Management Card */}
        <div className="glass-panel p-6 rounded-2xl shadow-lg space-y-6">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">API Credentials</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Authenticating access tokens to integrate Gravity AI with external applications.</p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/20 dark:border-slate-800/40 bg-slate-100/50 dark:bg-slate-900/40">
            <Key className="w-5 h-5 text-indigo-500 flex-shrink-0" />
            <div className="flex-1 overflow-hidden">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Live API Token</p>
              <p className="text-xs font-mono font-bold truncate text-slate-700 dark:text-slate-200 mt-0.5">{apiKey}</p>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={handleCopyKey}
                className="p-2 rounded-lg border border-slate-200/20 hover:bg-slate-200/40 dark:hover:bg-slate-800/40 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-all cursor-pointer relative"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500 animate-pulse" /> : <Copy className="w-4 h-4" />}
              </button>
              <button 
                onClick={handleRegenerateKey}
                disabled={regenerating}
                className="p-2 rounded-lg border border-slate-200/20 hover:bg-slate-200/40 dark:hover:bg-slate-800/40 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-all cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${regenerating ? 'animate-spin text-indigo-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Security Settings & Toggles (Spans 1 col) */}
      <div className="space-y-6">
        {/* Password update */}
        <div className="glass-panel p-6 rounded-2xl shadow-lg space-y-6">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Security Credentials</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Regularly update your credentials to safeguard system assets.</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase absolute left-3.5 top-2.5">
                New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-3.5 pr-10 pt-7 pb-2.5 text-xs rounded-xl border border-slate-200/20 dark:border-slate-800/40 bg-slate-100/40 dark:bg-slate-900/20 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[26px] text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password strength bar */}
            {password && (
              <div className="space-y-1.5 px-0.5">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="text-slate-400">Complexity:</span>
                  <span className={
                    strength.val <= 1 ? 'text-rose-500' :
                    strength.val === 2 ? 'text-amber-500' :
                    strength.val === 3 ? 'text-indigo-500' : 'text-emerald-500'
                  }>{strength.label}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: strength.width }}
                    className={`h-full ${strength.color} rounded-full`}
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase absolute left-3.5 top-2.5">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-3.5 pr-4 pt-7 pb-2.5 text-xs rounded-xl border border-slate-200/20 dark:border-slate-800/40 bg-slate-100/40 dark:bg-slate-900/20 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
              />
            </div>
            
            {password && confirmPassword && password !== confirmPassword && (
              <div className="flex items-center gap-1.5 text-[10px] text-rose-500 font-bold px-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Passwords do not match.</span>
              </div>
            )}
          </div>

          <button 
            disabled={!password || password !== confirmPassword || strength.val < 2}
            className="w-full py-2.5 text-xs font-semibold rounded-xl bg-indigo-600 disabled:opacity-40 disabled:hover:bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/10 active:scale-95 transition-all cursor-pointer"
          >
            Update Credentials
          </button>
        </div>

        {/* Feature toggles */}
        <div className="glass-panel p-6 rounded-2xl shadow-lg space-y-6">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Preferences</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Configure alert thresholds and experimental system traits.</p>
          </div>

          <div className="space-y-4">
            {/* Toggle 1 */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold">Auto-scaling alerts</span>
                <span className="text-[10px] text-slate-400 leading-tight">SMS alerts when clusters exceed 95% usage limit.</span>
              </div>
              <button 
                onClick={() => handleToggle('autoscaling')}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${toggles.autoscaling ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-800'}`}
              >
                <motion.div 
                  layout
                  className="w-4 h-4 rounded-full bg-white shadow-sm"
                  animate={{ x: toggles.autoscaling ? 16 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold">Multi-Factor Auth (MFA)</span>
                <span className="text-[10px] text-slate-400 leading-tight">Enforces Yubikey or Authenticator code entry.</span>
              </div>
              <button 
                onClick={() => handleToggle('mfa')}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${toggles.mfa ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-800'}`}
              >
                <motion.div 
                  layout
                  className="w-4 h-4 rounded-full bg-white shadow-sm"
                  animate={{ x: toggles.mfa ? 16 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            {/* Toggle 3 */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold">Beta Features Access</span>
                <span className="text-[10px] text-slate-400 leading-tight">Unlock experimental features and new AI model layers.</span>
              </div>
              <button 
                onClick={() => handleToggle('analytics')}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${toggles.analytics ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-800'}`}
              >
                <motion.div 
                  layout
                  className="w-4 h-4 rounded-full bg-white shadow-sm"
                  animate={{ x: toggles.analytics ? 16 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
