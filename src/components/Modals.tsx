import { useState } from 'react';
import { X, Check, Calendar, Clock, Sparkles, Send, ArrowRight } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'AI Automation',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/20 bg-[#111111]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors cursor-pointer p-1"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className="border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md inline-block mb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white">
                Consultation
              </span>
            </div>
            <h3 className="text-2xl font-normal tracking-tight text-white mb-2">
              Get Free Consultation
            </h3>
            <p className="text-sm text-white/70 mb-6">
              Tell us about your operational bottlenecks. Our team will review your systems and map out an automation blueprint.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Chen"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                    Work Email
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                    Company
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                    Focus Area
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full rounded-lg border border-white/15 bg-[#1a1a1a] px-3.5 py-2.5 text-sm text-white focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                  >
                    <option value="AI Automation">AI Automation</option>
                    <option value="AI Integration">AI Integration</option>
                    <option value="AI Agent Development">AI Agent Development</option>
                    <option value="Custom Infrastructure">Custom Infrastructure</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                  Goals or Questions (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your current workflow or target automation scope..."
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-full bg-white py-3 text-sm font-medium text-black hover:bg-white/85 transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Request Consultation</span>
                  <Send size={15} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-white/15 border border-white/30 flex items-center justify-center mx-auto mb-4 text-white">
              <Check size={28} />
            </div>
            <h4 className="text-xl font-medium text-white mb-2">Request Confirmed</h4>
            <p className="text-sm text-white/70 max-w-sm mx-auto mb-6">
              Thank you, {formData.name || 'there'}. We have queued your brief and will send a calendar invite to {formData.email || 'your email'} within 4 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="rounded-full bg-white px-6 py-2.5 text-xs font-medium text-black hover:bg-white/85 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function MithaCallModal({ isOpen, onClose }: ModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>('Today 3:30 PM');
  const [booked, setBooked] = useState(false);

  if (!isOpen) return null;

  const slots = [
    { label: 'Today', time: '3:30 PM' },
    { label: 'Today', time: '5:00 PM' },
    { label: 'Tomorrow', time: '10:00 AM' },
    { label: 'Tomorrow', time: '1:30 PM' },
    { label: 'Thursday', time: '11:00 AM' },
    { label: 'Thursday', time: '4:15 PM' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl border border-white/20 bg-[#111111]/90 p-6 backdrop-blur-xl shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors cursor-pointer p-1"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {!booked ? (
          <div>
            <div className="flex items-center gap-3.5 mb-5">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85"
                alt="Mitha"
                className="h-14 w-12 rounded-lg object-cover border border-white/20"
              />
              <div>
                <h3 className="text-lg font-medium text-white">Mitha</h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                  Co-founder of NovaAI
                </p>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for 15-min discovery call</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-white/70 mb-4 leading-relaxed">
              Direct conversation with Mitha about your architecture, automation feasibility, and pilot deployment roadmap.
            </p>

            <div className="mb-6">
              <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                Select Time Slot (EST)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {slots.map((s) => {
                  const val = `${s.label} ${s.time}`;
                  const isSelected = selectedSlot === val;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setSelectedSlot(val)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs cursor-pointer transition-all ${
                        isSelected
                          ? 'border-white bg-white/20 text-white font-medium'
                          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                      }`}
                    >
                      <span className="text-white/60">{s.label}</span>
                      <span>{s.time}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setBooked(true)}
              className="w-full rounded-full bg-white py-2.5 text-xs font-medium text-black hover:bg-white/85 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>Confirm {selectedSlot}</span>
              <Calendar size={14} />
            </button>
          </div>
        ) : (
          <div className="py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-white/15 border border-white/30 flex items-center justify-center mx-auto mb-3 text-white">
              <Check size={24} />
            </div>
            <h4 className="text-lg font-medium text-white mb-1">Call Confirmed</h4>
            <p className="text-xs text-white/70 max-w-xs mx-auto mb-5 leading-relaxed">
              Mitha has reserved <strong>{selectedSlot}</strong>. A Google Meet invitation and agenda have been dispatched.
            </p>
            <button
              onClick={() => {
                setBooked(false);
                onClose();
              }}
              className="rounded-full bg-white px-5 py-2 text-xs font-medium text-black hover:bg-white/85 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function DemoModal({
  isOpen,
  onClose,
  initialFeature,
}: ModalProps & { initialFeature?: string }) {
  const [activeTab, setActiveTab] = useState(initialFeature || 'Real-time vision');
  const [isProcessing, setIsProcessing] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  if (!isOpen) return null;

  const features: Record<string, { label: string; desc: string; sample: string }> = {
    'Real-time vision': {
      label: 'Real-time vision',
      desc: 'Reads context as it happens and surfaces what matters before you ask.',
      sample: 'Incoming context stream: 84 enterprise log streams across Kubernetes clusters. Anomaly detected in telemetry signature 42B prior to customer disruption.',
    },
    'Layered insight': {
      label: 'Layered insight',
      desc: 'Moves from rough outline to sharp output without losing the thread.',
      sample: 'Intent abstraction: Translating vague multi-page RFC into 3 atomic state-machine specifications with formal invariant validation.',
    },
    'Adaptive speed': {
      label: 'Adaptive speed',
      desc: 'Learns your cadence and tightens every pass as you work.',
      sample: 'Cadence calibration: Team review speed increased by 3.8x. Latency budget reduced from 820ms to 48ms through intent caching.',
    },
  };

  const handleRun = () => {
    setIsProcessing(true);
    setOutput(null);
    setTimeout(() => {
      setIsProcessing(false);
      setOutput(features[activeTab]?.sample || 'Signal processed successfully.');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-2xl border border-white/20 bg-[#111111]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors cursor-pointer p-1"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md inline-block mb-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white">
            Interactive Engine Demo
          </span>
        </div>
        <h3 className="text-2xl font-normal tracking-tight text-white mb-2">
          Experience NovaAI
        </h3>
        <p className="text-sm text-white/70 mb-5">
          Select a core capability to inspect how Nova processes raw company intent into operational decisions.
        </p>

        {/* Feature selection tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {Object.keys(features).map((feat) => (
            <button
              key={feat}
              onClick={() => {
                setActiveTab(feat);
                setOutput(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === feat
                  ? 'border border-white bg-white/20 text-white'
                  : 'border border-white/10 bg-white/5 text-white/60 hover:text-white'
              }`}
            >
              {feat}
            </button>
          ))}
        </div>

        {/* Feature detail box */}
        <div className="rounded-xl border border-white/15 bg-white/5 p-4 mb-5">
          <span className="text-xs font-mono text-white/50 uppercase tracking-widest block mb-1">
            Capability Engine
          </span>
          <p className="text-sm text-white/90 mb-3">{features[activeTab].desc}</p>

          <button
            onClick={handleRun}
            disabled={isProcessing}
            className="rounded-full bg-white px-4 py-2 text-xs font-medium text-black hover:bg-white/85 transition-colors cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-60"
          >
            {isProcessing ? (
              <>
                <Clock size={13} className="animate-spin" />
                <span>Synthesizing signal...</span>
              </>
            ) : (
              <>
                <Sparkles size={13} />
                <span>Execute Signal Run</span>
              </>
            )}
          </button>
        </div>

        {/* Output */}
        {output && (
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 animate-fadeIn">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
              Nova Engine Result:
            </span>
            <p className="text-xs text-white/90 leading-relaxed font-mono">
              {output}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function SimpleDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}: ModalProps & { title: string; subtitle: string; children: React.ReactNode }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/20 bg-[#111111]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl text-white max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors cursor-pointer p-1"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md inline-block mb-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white">
            {subtitle}
          </span>
        </div>
        <h3 className="text-2xl font-normal tracking-tight text-white mb-4">
          {title}
        </h3>
        <div className="text-sm text-white/80 space-y-4 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
