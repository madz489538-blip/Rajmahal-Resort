import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { BackendService } from '../../services/backend';
import { SiteSettings } from '../../types';
import { Save, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(BackendService.getSiteSettings());
  const [gstRatePercent, setGstRatePercent] = useState(settings.gstRatePercent);
  const [serviceChargePercent, setServiceChargePercent] = useState(settings.serviceChargePercent);
  const [currencySymbol, setCurrencySymbol] = useState(settings.currencySymbol);
  const [saved, setSaved] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    BackendService.updateSiteSettings({
      gstRatePercent,
      serviceChargePercent,
      currencySymbol,
    });
    setSettings(BackendService.getSiteSettings());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleResetDatabase = () => {
    if (window.confirm('Reset all demo reservations, leads, and room settings back to initial demonstration seed data?')) {
      localStorage.removeItem('rajmahal_resort_db_v1');
      setResetDone(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <AdminLayout activeTab="settings">
      <div className="max-w-2xl space-y-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#17382B] dark:text-[#F4EFE8]">
            System &amp; Financial Settings
          </h1>
          <p className="text-xs text-[#5E6963] dark:text-[#95A39B] mt-1">
            Configure automated taxation calculations and maintenance controls.
          </p>
        </div>

        {saved && (
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Settings updated successfully!</span>
          </div>
        )}

        {resetDone && (
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 text-xs flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
            <span>Resetting demo database to default seed state... Reloading.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
          <h2 className="font-serif text-lg font-semibold text-[#18201C] dark:text-[#F4EFE8] pb-2 border-b border-[#E6DDCF] dark:border-[#25362E]">
            Financial &amp; Pricing Rules
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                GST Rate (%)
              </label>
              <input
                type="number"
                min={0}
                max={28}
                value={gstRatePercent}
                onChange={(e) => setGstRatePercent(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                Service Fee (%)
              </label>
              <input
                type="number"
                min={0}
                max={20}
                value={serviceChargePercent}
                onChange={(e) => setServiceChargePercent(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                Currency Symbol
              </label>
              <input
                type="text"
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
              />
            </div>
          </div>

          <div className="pt-2 text-right">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612] flex items-center gap-2 ml-auto"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Financial Settings</span>
            </button>
          </div>
        </form>

        {/* Reset Database action */}
        <div className="bg-[#FFF9EE] dark:bg-[#1A261E] border border-amber-200 dark:border-amber-900/40 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-semibold text-sm">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Demonstration Sandbox Reset</span>
          </div>
          <p className="text-xs text-[#5E6963] dark:text-[#95A39B] leading-relaxed">
            Want to clear all simulated guest reservations, banquet leads, and custom room pricing back to the initial sample presentation state?
          </p>
          <button
            type="button"
            onClick={handleResetDatabase}
            className="px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-amber-700 hover:bg-amber-800 text-white flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Database to Seed State</span>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
