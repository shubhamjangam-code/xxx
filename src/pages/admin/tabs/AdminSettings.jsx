import React, { useState, useEffect } from 'react';
import { STUDIO_INFO } from '../../../data/photographyData';
import { Save, Phone, MapPin, User, Building, Check } from 'lucide-react';
import { InstagramIcon } from '../../../components/Icons';
import { getStudioSettings, updateStudioSettings } from '../../../services/dataService';

export default function AdminSettings() {
  const [info, setInfo] = useState({
    name: STUDIO_INFO.name,
    subtitle: STUDIO_INFO.subtitle,
    owner: STUDIO_INFO.owner,
    phone: STUDIO_INFO.phone,
    address: STUDIO_INFO.address,
    studioInstagram: STUDIO_INFO.studioInstagram,
    nanaInstagram: STUDIO_INFO.nanaInstagram
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getStudioSettings();
        if (data) {
          setInfo(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      await updateStudioSettings(info);
      setMsg('Studio details saved successfully!');
    } catch (err) {
      console.error(err);
      setMsg('Error saving studio settings.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-[#241C18]/10 shadow-sm">
        <h2 className="text-xl font-serif text-[#241C18]">Studio Information & Social Settings</h2>
        <p className="text-xs text-[#241C18]/60">Manage your studio phone number, owner details, location address and Instagram links</p>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-green-50 text-green-700 text-xs font-medium border border-green-200 flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{msg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#241C18]/10 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Studio Name */}
          <div>
            <label className="block text-xs font-semibold text-[#241C18]/80 mb-1">Studio Brand Name</label>
            <div className="relative">
              <Building className="w-4 h-4 text-[#241C18]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={info.name}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 border border-[#241C18]/15 rounded-xl text-xs focus:ring-2 focus:ring-[#8D9B7A]"
              />
            </div>
          </div>

          {/* Owner Name */}
          <div>
            <label className="block text-xs font-semibold text-[#241C18]/80 mb-1">Studio Owner</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#241C18]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={info.owner}
                onChange={(e) => setInfo({ ...info, owner: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 border border-[#241C18]/15 rounded-xl text-xs focus:ring-2 focus:ring-[#8D9B7A]"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-[#241C18]/80 mb-1">Contact Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#241C18]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={info.phone}
                onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 border border-[#241C18]/15 rounded-xl text-xs focus:ring-2 focus:ring-[#8D9B7A]"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-semibold text-[#241C18]/80 mb-1">Studio Address</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#241C18]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={info.address}
                onChange={(e) => setInfo({ ...info, address: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 border border-[#241C18]/15 rounded-xl text-xs focus:ring-2 focus:ring-[#8D9B7A]"
              />
            </div>
          </div>

          {/* Studio Instagram */}
          <div>
            <label className="block text-xs font-semibold text-[#241C18]/80 mb-1">Studio Instagram Handle URL</label>
            <div className="relative">
              <InstagramIcon className="w-4 h-4 text-[#241C18]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={info.studioInstagram}
                onChange={(e) => setInfo({ ...info, studioInstagram: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 border border-[#241C18]/15 rounded-xl text-xs focus:ring-2 focus:ring-[#8D9B7A]"
              />
            </div>
          </div>

          {/* Personal Instagram */}
          <div>
            <label className="block text-xs font-semibold text-[#241C18]/80 mb-1">Photographer Instagram Handle URL</label>
            <div className="relative">
              <InstagramIcon className="w-4 h-4 text-[#241C18]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={info.nanaInstagram}
                onChange={(e) => setInfo({ ...info, nanaInstagram: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 border border-[#241C18]/15 rounded-xl text-xs focus:ring-2 focus:ring-[#8D9B7A]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-[#241C18]/10 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-[#8D9B7A] hover:bg-[#7A8868] text-white font-medium rounded-xl text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
