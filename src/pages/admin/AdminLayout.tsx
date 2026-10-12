import React, { useEffect } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { 
  LayoutDashboard, 
  BedDouble, 
  CalendarCheck, 
  PartyPopper, 
  FileText, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'rooms' | 'reservations' | 'events' | 'content' | 'settings';
}

export function AdminLayout({ children, activeTab }: AdminLayoutProps) {
  const { isAuthenticated, user, logout } = useAdminAuth();
  const { navigate } = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const navItems = [
    { id: 'dashboard', label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { id: 'reservations', label: 'Reservations', href: '/admin/reservations', icon: CalendarCheck },
    { id: 'rooms', label: 'Rooms & Rates', href: '/admin/rooms', icon: BedDouble },
    { id: 'events', label: 'Banquet & Events', href: '/admin/events', icon: PartyPopper },
    { id: 'content', label: 'Copy & Notices', href: '/admin/content', icon: FileText },
    { id: 'settings', label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] dark:bg-[#0B120F] transition-colors">
      {/* Top Admin Sub-Header */}
      <div className="bg-[#121F19] text-[#E6E1D8] border-b border-[#25362E] px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-semibold text-[#F7F2E8]">
              Rajmahal Resort
            </span>
            <span className="text-xs bg-[#B88E52]/20 border border-[#B88E52]/40 text-[#C5A880] px-2 py-0.5 rounded font-mono">
              Staff Administration
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden sm:flex items-center gap-2 text-[#A8B6AE]">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>{user?.name} ({user?.role})</span>
            </div>

            <Link
              href="/"
              className="text-[#C5A880] hover:underline flex items-center gap-1"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="p-1.5 text-[#A8B6AE] hover:text-white transition-colors rounded hover:bg-[#1B2F25] flex items-center gap-1"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-white dark:bg-[#121C17] border-b border-[#E6DDCF] dark:border-[#25362E] px-4 sm:px-6 lg:px-8 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.href)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-[#17382B] text-white dark:bg-[#C59F67] dark:text-[#0D1612] font-semibold shadow-sm'
                    : 'text-[#5E6963] dark:text-[#95A39B] hover:text-[#18201C] dark:hover:text-[#F4EFE8] hover:bg-[#F4EFE6] dark:hover:bg-[#192620]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {children}
      </main>
    </div>
  );
}
