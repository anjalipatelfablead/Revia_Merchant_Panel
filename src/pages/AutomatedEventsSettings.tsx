import React, { useState } from 'react';
import { CalendarHeart, Gift, PartyPopper, CheckCircle2, Plus, Trash2 } from 'lucide-react';

export const AutomatedEventsSettings: React.FC = () => {
  const [birthdayEnabled, setBirthdayEnabled] = useState(true);
  const [birthdayTiming, setBirthdayTiming] = useState('30_days_before');
  const [birthdayCampaign, setBirthdayCampaign] = useState('Free Birthday Coffee');

  const [birthdayDeleted, setBirthdayDeleted] = useState(false);

  const [anniversaryEnabled, setAnniversaryEnabled] = useState(true);
  const [anniversaryTiming, setAnniversaryTiming] = useState('30_days_before');
  const [anniversaryCampaign, setAnniversaryCampaign] = useState('Anniversary 20% Off');
  const [anniversaryDeleted, setAnniversaryDeleted] = useState(false);

  const [customEvents, setCustomEvents] = useState<{id: number, name: string, enabled: boolean, timing: string, campaign: string}[]>([]);

  const addCustomEvent = () => {
    setCustomEvents([...customEvents, { 
      id: Date.now(), 
      name: 'New Custom Event', 
      enabled: true, 
      timing: 'on_day', 
      campaign: 'Double Stamps Day' 
    }]);
  };

  const updateCustomEvent = (id: number, field: string, value: any) => {
    setCustomEvents(customEvents.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const deleteCustomEvent = (id: number) => {
    setCustomEvents(customEvents.filter(e => e.id !== id));
  };

  const [saving, setSaving] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast('Automated events saved successfully.');
    }, 700);
  };

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-[#E5E0D8] bg-white shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E0D8] bg-[#FAF8F5] px-4 py-3">
        <div>
          <div className="flex items-center gap-2">
            <CalendarHeart className="h-4 w-4 text-[#B7842C]" />
            <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#1A1615]">Life Events & Automations</span>
          </div>
          <h2 className="mt-1 text-[22px] font-bold tracking-tight text-[#1A1615]">Automated Milestone Campaigns</h2>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-[#B7842C] px-4 py-2 text-[13px] font-bold text-white hover:bg-[#9E782F] transition-colors disabled:opacity-70 cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="p-4 space-y-6">
        <p className="text-sm text-[#6E6A66]">
          Configure campaigns to automatically send to your customers based on their milestones. These will be sent automatically based on the timing you select.
        </p>

        {/* Birthday Settings */}
        {!birthdayDeleted && (
          <div className={`relative rounded-xl border ${birthdayEnabled ? 'border-[#B7842C] shadow-sm' : 'border-[#E5E0D8]'} p-4 sm:p-5 bg-white transition-all`}>
            <button 
              onClick={() => setBirthdayDeleted(true)} 
              className="absolute top-4 right-16 p-1.5 text-[#9E9A93] hover:text-[#DC2626] hover:bg-[#FEE2E2] rounded-md transition-colors cursor-pointer"
              title="Remove Automation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="flex items-start justify-between gap-4 mb-4 pr-[70px]">
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-lg ${birthdayEnabled ? 'bg-[#FCF1DF] text-[#B7842C]' : 'bg-[#F5F1EA] text-[#9E9A93]'}`}>
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#1A1615]">Customer Birthday Automation</h3>
                  <p className="text-xs text-[#6E6A66] mt-0.5">Send a reward leading up to the customer's special day.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer absolute right-4 top-4">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={birthdayEnabled}
                  onChange={() => setBirthdayEnabled(!birthdayEnabled)}
                />
                <div className="w-9 h-5 bg-[#E5E0D8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D7A53]"></div>
              </label>
            </div>

            <div className={`grid sm:grid-cols-2 gap-4 ${birthdayEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#6E6A66] uppercase tracking-wider">Send Timing</label>
                <select 
                  value={birthdayTiming}
                  onChange={(e) => setBirthdayTiming(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3 py-2 text-[13px] font-semibold text-[#1A1615] focus:outline-none focus:border-[#B7842C] transition-colors"
                >
                  <option value="on_day">On their birthday</option>
                  <option value="7_days_before">7 days before</option>
                  <option value="14_days_before">14 days before</option>
                  <option value="30_days_before">30 days before</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#6E6A66] uppercase tracking-wider">Campaign to Send</label>
                <select 
                  value={birthdayCampaign}
                  onChange={(e) => setBirthdayCampaign(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3 py-2 text-[13px] font-semibold text-[#1A1615] focus:outline-none focus:border-[#B7842C] transition-colors"
                >
                  <option value="Free Birthday Coffee">Free Birthday Coffee</option>
                  <option value="Birthday 50% Off">Birthday 50% Off</option>
                  <option value="Double Stamps Day">Double Stamps Day</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Anniversary Settings */}
        {!anniversaryDeleted && (
          <div className={`relative rounded-xl border ${anniversaryEnabled ? 'border-[#B7842C] shadow-sm' : 'border-[#E5E0D8]'} p-4 sm:p-5 bg-white transition-all`}>
            <button 
              onClick={() => setAnniversaryDeleted(true)} 
              className="absolute top-4 right-16 p-1.5 text-[#9E9A93] hover:text-[#DC2626] hover:bg-[#FEE2E2] rounded-md transition-colors cursor-pointer"
              title="Remove Automation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="flex items-start justify-between gap-4 mb-4 pr-[70px]">
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-lg ${anniversaryEnabled ? 'bg-[#FCF1DF] text-[#B7842C]' : 'bg-[#F5F1EA] text-[#9E9A93]'}`}>
                  <PartyPopper className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#1A1615]">Membership Anniversary Automation</h3>
                  <p className="text-xs text-[#6E6A66] mt-0.5">Celebrate the anniversary of when the customer joined your loyalty program.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer absolute right-4 top-4">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={anniversaryEnabled}
                  onChange={() => setAnniversaryEnabled(!anniversaryEnabled)}
                />
                <div className="w-9 h-5 bg-[#E5E0D8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D7A53]"></div>
              </label>
            </div>

            <div className={`grid sm:grid-cols-2 gap-4 ${anniversaryEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#6E6A66] uppercase tracking-wider">Send Timing</label>
                <select 
                  value={anniversaryTiming}
                  onChange={(e) => setAnniversaryTiming(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3 py-2 text-[13px] font-semibold text-[#1A1615] focus:outline-none focus:border-[#B7842C] transition-colors"
                >
                  <option value="on_day">On the anniversary date</option>
                  <option value="7_days_before">7 days before</option>
                  <option value="14_days_before">14 days before</option>
                  <option value="30_days_before">30 days before</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#6E6A66] uppercase tracking-wider">Campaign to Send</label>
                <select 
                  value={anniversaryCampaign}
                  onChange={(e) => setAnniversaryCampaign(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3 py-2 text-[13px] font-semibold text-[#1A1615] focus:outline-none focus:border-[#B7842C] transition-colors"
                >
                  <option value="Anniversary 20% Off">Anniversary 20% Off</option>
                  <option value="Anniversary Free Upgrade">Anniversary Free Upgrade</option>
                  <option value="Double Stamps Day">Double Stamps Day</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Custom Settings */}
        {customEvents.map((evt) => (
          <div key={evt.id} className={`rounded-xl border ${evt.enabled ? 'border-[#B7842C] shadow-sm' : 'border-[#E5E0D8]'} p-4 sm:p-5 bg-white transition-all relative`}>
            <button 
              onClick={() => deleteCustomEvent(evt.id)} 
              className="absolute top-4 right-16 p-1.5 text-[#9E9A93] hover:text-[#DC2626] hover:bg-[#FEE2E2] rounded-md transition-colors cursor-pointer"
              title="Remove Automation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="flex items-start justify-between gap-4 mb-4 pr-[70px]">
              <div className="flex items-start gap-3 w-full max-w-sm">
                <div className={`p-2.5 rounded-lg ${evt.enabled ? 'bg-[#FCF1DF] text-[#B7842C]' : 'bg-[#F5F1EA] text-[#9E9A93]'}`}>
                  <CalendarHeart className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <input 
                    type="text" 
                    value={evt.name}
                    onChange={(e) => updateCustomEvent(evt.id, 'name', e.target.value)}
                    className="text-[15px] font-bold text-[#1A1615] bg-transparent border-b border-transparent hover:border-[#E5E0D8] focus:border-[#B7842C] focus:outline-none w-full pb-0.5 placeholder:text-[#9E9A93] transition-colors"
                    placeholder="Event Name (e.g. VIP Status)"
                  />
                  <p className="text-xs text-[#6E6A66] mt-0.5">Custom milestone trigger</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer absolute right-4 top-4">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={evt.enabled}
                  onChange={() => updateCustomEvent(evt.id, 'enabled', !evt.enabled)}
                />
                <div className="w-9 h-5 bg-[#E5E0D8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D7A53]"></div>
              </label>
            </div>

            <div className={`grid sm:grid-cols-2 gap-4 ${evt.enabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#6E6A66] uppercase tracking-wider">Send Timing</label>
                <select 
                  value={evt.timing}
                  onChange={(e) => updateCustomEvent(evt.id, 'timing', e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3 py-2 text-[13px] font-semibold text-[#1A1615] focus:outline-none focus:border-[#B7842C]"
                >
                  <option value="on_day">On the date</option>
                  <option value="7_days_before">7 days before</option>
                  <option value="14_days_before">14 days before</option>
                  <option value="30_days_before">30 days before</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#6E6A66] uppercase tracking-wider">Campaign to Send</label>
                <select 
                  value={evt.campaign}
                  onChange={(e) => updateCustomEvent(evt.id, 'campaign', e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3 py-2 text-[13px] font-semibold text-[#1A1615] focus:outline-none focus:border-[#B7842C]"
                >
                  <option value="Free Birthday Coffee">Free Birthday Coffee</option>
                  <option value="Birthday 50% Off">Birthday 50% Off</option>
                  <option value="Anniversary 20% Off">Anniversary 20% Off</option>
                  <option value="Anniversary Free Upgrade">Anniversary Free Upgrade</option>
                  <option value="Double Stamps Day">Double Stamps Day</option>
                  <option value="Custom Event Promo">Custom Event Promo</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={addCustomEvent}
          className="w-full rounded-xl border border-dashed border-[#B7842C] bg-[#FCF1DF] py-4 text-[13px] font-bold text-[#B7842C] hover:bg-[#F5E6CD] transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Custom Event Automation
        </button>
      </div>
      
      {feedbackToast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm shadow-xl z-50 animate-in fade-in slide-in-from-bottom-4 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#0D7A53]" />
          {feedbackToast}
        </div>
      )}
    </div>
  );
};
