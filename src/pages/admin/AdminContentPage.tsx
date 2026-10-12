import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { BackendService } from '../../services/backend';
import { SiteSettings } from '../../types';
import { Save, CheckCircle2 } from 'lucide-react';

export function AdminContentPage() {
  const [settings, setSettings] = useState<SiteSettings>(BackendService.getSiteSettings());
  const [resortName, setResortName] = useState(settings.resortName);
  const [location, setLocation] = useState(settings.location);
  const [phone, setPhone] = useState(settings.phone);
  const [instagram, setInstagram] = useState(settings.instagram);
  const [demoNoticeText, setDemoNoticeText] = useState(settings.demoNoticeText);
  const [demoNoticeEnabled, setDemoNoticeEnabled] = useState(settings.demoNoticeEnabled);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    BackendService.updateSiteSettings({
      resortName,
      location,
      phone,
      instagram,
      demoNoticeText,
      demoNoticeEnabled,
    });
    setSettings(BackendService.getSiteSettings());
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout activeTab="content">
      <div className="max-w-3xl space-y-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#17382B] dark:text-[#F4EFE8]">
            Resort Profile &amp; Notice Copy
          </h1>
          <p className="text-xs text-[#5E6963] dark:text-[#95A39B] mt-1">
            Update verified address, telephone line, Instagram handle, and portfolio demonstration disclosures.
          </p>
        </div>

        {saved && (
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Resort profile copy successfully updated!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
              Resort Business Name
            </label>
            <input
              type="text"
              value={resortName}
              onChange={(e) => setResortName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
              Verified Physical Location (NH-37)
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                Public Contact Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                Instagram Profile
              </label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
              Concept Demo Notice Text
            </label>
            <textarea
              rows={3}
              value={demoNoticeText}
              onChange={(e) => setDemoNoticeText(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={demoNoticeEnabled}
                onChange={(e) => setDemoNoticeEnabled(e.target.checked)}
                className="rounded border-[#E6DDCF] text-[#17382B]"
              />
              <span>Display top concept demo disclosure banner</span>
            </label>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612] flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Content Updates</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
