import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ChevronsLeft, 
  ChevronsRight, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  MoreVertical,
  Edit,
  Trash,
  Ban,
  CheckCircle,
  Download,
  AlertCircle
} from 'lucide-react';

interface UserRow {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  tier: 'Enterprise' | 'Pro' | 'Free';
  status: 'Active' | 'Pending' | 'Suspended';
  usage: number; // in GB
  joined: string;
}

const initialUsers: UserRow[] = [
  { id: '1', name: 'Alexander Wright', email: 'alexander@stripe.com', avatar: 'AW', role: 'CTO', tier: 'Enterprise', status: 'Active', usage: 843.2, joined: 'Feb 12, 2026' },
  { id: '2', name: 'Sarah Jenkins', email: 's.jenkins@linear.app', avatar: 'SJ', role: 'Product Manager', tier: 'Pro', status: 'Active', usage: 312.4, joined: 'Mar 03, 2026' },
  { id: '3', name: 'Marcus Aurelius', email: 'marcus@philosophy.io', avatar: 'MA', role: 'Lead Developer', tier: 'Free', status: 'Pending', usage: 48.0, joined: 'Apr 28, 2026' },
  { id: '4', name: 'Elena Rostova', email: 'elena@vercel.com', avatar: 'ER', role: 'DevOps Engineer', tier: 'Enterprise', status: 'Active', usage: 984.0, joined: 'Jan 15, 2026' },
  { id: '5', name: 'Devon Lane', email: 'devon@notion.so', avatar: 'DL', role: 'Designer', tier: 'Pro', status: 'Suspended', usage: 12.8, joined: 'May 02, 2026' },
  { id: '6', name: 'Courtney Henry', email: 'courtney@figma.com', avatar: 'CH', role: 'UI Engineer', tier: 'Pro', status: 'Active', usage: 450.5, joined: 'Dec 18, 2025' },
  { id: '7', name: 'Theresa Webb', email: 'theresa@netflix.com', avatar: 'TW', role: 'Security Analyst', tier: 'Enterprise', status: 'Active', usage: 720.0, joined: 'Oct 04, 2025' },
  { id: '8', name: 'Albert Flores', email: 'albert@discord.com', avatar: 'AF', role: 'Community Manager', tier: 'Free', status: 'Pending', usage: 82.5, joined: 'May 11, 2026' },
];

export const DataTable: React.FC = () => {
  const [users, setUsers] = useState<UserRow[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Pending' | 'Suspended'>('All');
  const [tierFilter, setTierFilter] = useState<'All' | 'Enterprise' | 'Pro' | 'Free'>('All');
  const [sortField, setSortField] = useState<keyof UserRow>('joined');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const itemsPerPage = 5;

  // Sorting Handler
  const handleSort = (field: keyof UserRow) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Checkbox Handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = filteredUsers.map(u => u.id);
      setSelectedIds(new Set(allIds));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  // Filter & Sort logic
  const filteredUsers = useMemo(() => {
    return users
      .filter(user => {
        const matchesSearch = 
          user.name.toLowerCase().includes(search.toLowerCase()) || 
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.role.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
        const matchesTier = tierFilter === 'All' || user.tier === tierFilter;
        return matchesSearch && matchesStatus && matchesTier;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        // Format joined dates for correct sorting
        if (sortField === 'joined') {
          valA = new Date(a.joined).getTime();
          valB = new Date(b.joined).getTime();
        }

        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortDirection === 'asc' 
            ? valA.localeCompare(valB) 
            : valB.localeCompare(valA);
        }

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortDirection === 'asc' ? valA - valB : valB - valA;
        }

        return 0;
      });
  }, [users, search, statusFilter, tierFilter, sortField, sortDirection]);

  // Pagination logic
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setActiveMenuId(null);
    }
  };

  const deleteSelected = () => {
    setUsers(prev => prev.filter(u => !selectedIds.has(u.id)));
    setSelectedIds(new Set());
  };

  const toggleUserStatus = (id: string, newStatus: 'Active' | 'Pending' | 'Suspended') => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    setActiveMenuId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.5 }}
      className="glass-panel p-6 rounded-2xl shadow-lg flex flex-col gap-6"
    >
      {/* Header section with Action Buttons */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-800 dark:text-slate-100">Team Members & Usage</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Manage developer profiles, subscription levels, and API consumption.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {selectedIds.size > 0 && (
            <motion.button 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={deleteSelected}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Trash className="w-3.5 h-3.5" />
              <span>Delete ({selectedIds.size})</span>
            </motion.button>
          )}

          <button className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200/20 hover:bg-slate-200/40 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer flex items-center gap-1.5 ml-auto">
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Search by name, email, role..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200/20 dark:border-slate-800/40 bg-slate-100/40 dark:bg-slate-900/20 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value as any); setCurrentPage(1); }}
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200/20 dark:border-slate-800/40 bg-slate-100/40 dark:bg-slate-900/20 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>

        {/* Tier Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={tierFilter}
            onChange={(e) => { setTierFilter(e.target.value as any); setCurrentPage(1); }}
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200/20 dark:border-slate-800/40 bg-slate-100/40 dark:bg-slate-900/20 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all cursor-pointer"
          >
            <option value="All">All Tiers</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Pro">Pro</option>
            <option value="Free">Free</option>
          </select>
        </div>
      </div>

      {/* Main Table rendering */}
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle px-6">
          <div className="overflow-hidden rounded-xl border border-slate-200/10 dark:border-slate-800/20">
            <table className="min-w-full divide-y divide-slate-200/10 dark:divide-slate-800/20 text-left text-xs">
              <thead className="bg-slate-100/50 dark:bg-slate-900/50 font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <tr>
                  <th scope="col" className="p-4 w-12">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={filteredUsers.length > 0 && selectedIds.size === filteredUsers.length}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <th scope="col" className="p-4 cursor-pointer hover:text-indigo-500" onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-1">
                      <span>User</span>
                      {sortField === 'name' ? (sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />) : null}
                    </div>
                  </th>
                  <th scope="col" className="p-4 cursor-pointer hover:text-indigo-500" onClick={() => handleSort('tier')}>
                    <div className="flex items-center gap-1">
                      <span>Tier</span>
                      {sortField === 'tier' ? (sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />) : null}
                    </div>
                  </th>
                  <th scope="col" className="p-4 cursor-pointer hover:text-indigo-500" onClick={() => handleSort('status')}>
                    <div className="flex items-center gap-1">
                      <span>Status</span>
                      {sortField === 'status' ? (sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />) : null}
                    </div>
                  </th>
                  <th scope="col" className="p-4 cursor-pointer hover:text-indigo-500 text-right" onClick={() => handleSort('usage')}>
                    <div className="flex items-center justify-end gap-1">
                      <span>API Consumption</span>
                      {sortField === 'usage' ? (sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />) : null}
                    </div>
                  </th>
                  <th scope="col" className="p-4 cursor-pointer hover:text-indigo-500" onClick={() => handleSort('joined')}>
                    <div className="flex items-center gap-1">
                      <span>Date Joined</span>
                      {sortField === 'joined' ? (sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />) : null}
                    </div>
                  </th>
                  <th scope="col" className="p-4 w-12 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200/10 dark:divide-slate-800/15">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-8 h-8 text-slate-500" />
                        <span>No records found matching filters.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user) => {
                    const isSelected = selectedIds.has(user.id);
                    const isMenuOpen = activeMenuId === user.id;

                    return (
                      <tr 
                        key={user.id} 
                        className={`hover:bg-slate-100/40 dark:hover:bg-slate-900/30 transition-colors ${
                          isSelected ? 'bg-indigo-500/5 dark:bg-indigo-500/5' : ''
                        }`}
                      >
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => handleSelectRow(user.id, e.target.checked)}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 text-[10px]">
                              {user.avatar}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-slate-800 dark:text-slate-100">{user.name}</span>
                              <span className="text-[10px] text-slate-400">{user.email} &bull; {user.role}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border ${
                            user.tier === 'Enterprise' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' :
                            user.tier === 'Pro' ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' :
                            'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20'
                          }`}>
                            {user.tier}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' :
                            user.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' :
                            'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              user.status === 'Active' ? 'bg-emerald-500' :
                              user.status === 'Pending' ? 'bg-amber-500' : 'bg-rose-500'
                            }`} />
                            <span>{user.status}</span>
                          </span>
                        </td>
                        <td className="p-4 text-right font-mono font-semibold text-slate-700 dark:text-slate-300">
                          {user.usage.toFixed(1)} GB
                        </td>
                        <td className="p-4 text-slate-500 dark:text-slate-400">
                          {user.joined}
                        </td>
                        <td className="p-4 text-center relative">
                          <button 
                            onClick={() => setActiveMenuId(isMenuOpen ? null : user.id)}
                            className="p-1 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors cursor-pointer"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          <AnimatePresence>
                            {isMenuOpen && (
                              <>
                                <div className="fixed inset-0 z-30" onClick={() => setActiveMenuId(null)} />
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9, y: 5 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.9, y: 5 }}
                                  transition={{ duration: 0.1 }}
                                  className="absolute right-4 mt-1 w-32 rounded-xl glass-panel border border-slate-200/25 dark:border-slate-800/40 p-1.5 shadow-2xl z-40"
                                >
                                  <button className="w-full flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-900/50 rounded-lg cursor-pointer text-left">
                                    <Edit className="w-3.5 h-3.5" />
                                    <span>Edit Info</span>
                                  </button>
                                  {user.status !== 'Active' && (
                                    <button 
                                      onClick={() => toggleUserStatus(user.id, 'Active')}
                                      className="w-full flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-600 hover:bg-emerald-500/5 rounded-lg cursor-pointer text-left"
                                    >
                                      <CheckCircle className="w-3.5 h-3.5" />
                                      <span>Activate</span>
                                    </button>
                                  )}
                                  {user.status !== 'Suspended' && (
                                    <button 
                                      onClick={() => toggleUserStatus(user.id, 'Suspended')}
                                      className="w-full flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-semibold text-rose-500 hover:bg-rose-500/5 rounded-lg cursor-pointer text-left"
                                    >
                                      <Ban className="w-3.5 h-3.5" />
                                      <span>Suspend</span>
                                    </button>
                                  )}
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination component */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{(currentPage - 1) * itemsPerPage + 1}</strong> to <strong className="text-slate-800 dark:text-slate-200">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</strong> of <strong className="text-slate-800 dark:text-slate-200">{filteredUsers.length}</strong> members
          </span>

          <div className="flex items-center gap-1.5">
            <button 
              disabled={currentPage === 1}
              onClick={() => handlePageChange(1)}
              className="p-2 rounded-lg border border-slate-200/20 hover:bg-slate-200/40 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
            </button>
            <button 
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="p-2 rounded-lg border border-slate-200/20 hover:bg-slate-200/40 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1 mx-2">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-7 h-7 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                      currentPage === pageNum 
                        ? 'bg-indigo-600 text-white' 
                        : 'border border-slate-200/10 hover:bg-slate-200/40 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button 
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="p-2 rounded-lg border border-slate-200/20 hover:bg-slate-200/40 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(totalPages)}
              className="p-2 rounded-lg border border-slate-200/20 hover:bg-slate-200/40 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
            >
              <ChevronsRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};
