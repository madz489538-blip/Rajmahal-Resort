import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, KeyRound } from 'lucide-react';

export function AdminLoginPage() {
  const { navigate } = useRouter();
  const { login, isAuthenticated } = useAdminAuth();

  const [email, setEmail] = useState('admin@rajmahalresort.com');
  const [password, setPassword] = useState('rajmahal2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect
  if (isAuthenticated) {
    navigate('/admin/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.error || 'Authentication failed');
    }
  };

  const handlePrefillDemo = () => {
    setEmail('admin@rajmahalresort.com');
    setPassword('rajmahal2026');
    setError(null);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#17382B] text-white p-6 sm:p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-[#B88E52]/20 border border-[#B88E52]/50 flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-[#C5A880]" />
          </div>
          <h1 className="font-serif text-2xl text-[#F7F2E8]">
            Resort Staff Portal
          </h1>
          <p className="text-xs text-[#A8B6AE] mt-1">
            Rajmahal Resort &amp; Banquets Management Console
          </p>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#B88E52]" />
                Staff Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620] text-[#18201C] dark:text-[#F4EFE8]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#B88E52]" />
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620] text-[#18201C] dark:text-[#F4EFE8]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612] transition-colors flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo account quick fill button */}
          <div className="pt-4 border-t border-[#E6DDCF] dark:border-[#25362E] space-y-2 text-center">
            <span className="text-[11px] text-[#5E6963] dark:text-[#95A39B] block">
              Demo Credentials: <code>admin@rajmahalresort.com</code> / <code>rajmahal2026</code>
            </span>
            <button
              type="button"
              onClick={handlePrefillDemo}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B88E52] dark:text-[#C59F67] hover:underline"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Auto-Fill Demo Credentials</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
