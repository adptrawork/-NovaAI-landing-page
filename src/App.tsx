/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ScrollVideo } from './components/ScrollVideo';
import { Navbar } from './components/Navbar';
import { SectionOne } from './components/SectionOne';
import { SectionTwo } from './components/SectionTwo';
import {
  ConsultationModal,
  MithaCallModal,
  DemoModal,
  SimpleDrawer,
} from './components/Modals';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isMithaCallOpen, setIsMithaCallOpen] = useState(false);
  const [demoFeature, setDemoFeature] = useState<string | undefined>(undefined);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  // Nav modals
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const handleRunDemo = (feature?: string) => {
    setDemoFeature(feature);
    setIsDemoOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 selection:text-white antialiased font-sans">
      {/* 1. Scroll-Scrubbed Video Background (fixed inset-0 z-0, pointer-events-none) */}
      <ScrollVideo />

      {/* 2. Relative z-10 Content Wrapper */}
      <div className="relative z-10 flex flex-col w-full min-h-screen">
        {/* Fixed Navbar */}
        <Navbar
          onOpenConsultation={() => setIsConsultationOpen(true)}
          onOpenProjects={() => setProjectsOpen(true)}
          onOpenAbout={() => setAboutOpen(true)}
          onOpenBlog={() => setBlogOpen(true)}
          onOpenContact={() => setContactOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="flex-1 w-full">
          {/* Section One: Hero */}
          <SectionOne onBookCall={() => setIsMithaCallOpen(true)} />

          {/* Spacer div h-[80vh] (aria-hidden) - critical for scroll video length */}
          <div className="h-[80vh] w-full pointer-events-none" aria-hidden="true" />

          {/* Section Two: Capability */}
          <SectionTwo
            onRunDemo={handleRunDemo}
            onOpenConsultation={() => setIsConsultationOpen(true)}
          />
        </main>
      </div>

      {/* Modals & Dialogs for Complete Interactivity */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <MithaCallModal
        isOpen={isMithaCallOpen}
        onClose={() => setIsMithaCallOpen(false)}
      />

      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        initialFeature={demoFeature}
      />

      <SimpleDrawer
        isOpen={projectsOpen}
        onClose={() => setProjectsOpen(false)}
        title="Featured Deployments (6)"
        subtitle="Nova Implementations"
      >
        <div className="space-y-4">
          <div className="border-b border-white/10 pb-3">
            <span className="font-mono text-xs text-white/50">01 / FINTECH INFRASTRUCTURE</span>
            <h4 className="text-base font-medium text-white mt-1">Autonomous Settlement Recon</h4>
            <p className="text-xs text-white/70 mt-1">
              99.98% unattended reconciliation across 42 clearing houses with zero ledger drift.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <span className="font-mono text-xs text-white/50">02 / AEROSPACE LOGISTICS</span>
            <h4 className="text-base font-medium text-white mt-1">Dynamic Avionics Allocation</h4>
            <p className="text-xs text-white/70 mt-1">
              Real-time component lifecycle forecasting with sub-minute re-routing.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <span className="font-mono text-xs text-white/50">03 / MEDTECH AUTOMATION</span>
            <h4 className="text-base font-medium text-white mt-1">Clinical Dossier Synthesis</h4>
            <p className="text-xs text-white/70 mt-1">
              High-concurrency extraction of trial metrics adhering to HIPAA and FDA compliance.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <span className="font-mono text-xs text-white/50">04 / GLOBAL TELECOM</span>
            <h4 className="text-base font-medium text-white mt-1">Network Self-Healing Agents</h4>
            <p className="text-xs text-white/70 mt-1">
              Automated load-balancer rerouting saving 340+ engineer hours per quarter.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <span className="font-mono text-xs text-white/50">05 / ENERGY GRID</span>
            <h4 className="text-base font-medium text-white mt-1">Renewable Dispatch Optimizer</h4>
            <p className="text-xs text-white/70 mt-1">
              Multi-variant battery discharge prediction models reducing peak wholesale costs by 22%.
            </p>
          </div>
          <div className="pb-1">
            <span className="font-mono text-xs text-white/50">06 / SUPPLY CHAIN</span>
            <h4 className="text-base font-medium text-white mt-1">Adaptive Port Routing Engine</h4>
            <p className="text-xs text-white/70 mt-1">
              Predictive multimodal vessel scheduling minimizing demurrage fees.
            </p>
          </div>
        </div>
      </SimpleDrawer>

      <SimpleDrawer
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
        title="About NovaAI"
        subtitle="Our Mission"
      >
        <p>
          NovaAI was founded by systems engineers and applied researchers dedicated to closing the gap between raw machine intelligence and business execution.
        </p>
        <p>
          Rather than building another generic chatbot wrapper, we craft custom, high-velocity automation engines that integrate deep into enterprise infrastructure — quietly, securely, and with zero guesswork.
        </p>
        <div className="pt-2 flex items-center gap-4 text-xs font-mono text-white/60">
          <div>HQ: SAN FRANCISCO, CA</div>
          <div>·</div>
          <div>EST. 2024</div>
        </div>
      </SimpleDrawer>

      <SimpleDrawer
        isOpen={blogOpen}
        onClose={() => setBlogOpen(false)}
        title="Dispatches & Research"
        subtitle="Engineering Log"
      >
        <div className="space-y-4">
          <div className="border-b border-white/10 pb-3">
            <span className="font-mono text-xs text-white/50">OCTOBER 2026 · 6 MIN READ</span>
            <h4 className="text-base font-medium text-white mt-1">Deterministic Guards for Non-Deterministic Agents</h4>
            <p className="text-xs text-white/70 mt-1">
              How state machines and mathematical boundary invariants guarantee reliable enterprise execution.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <span className="font-mono text-xs text-white/50">SEPTEMBER 2026 · 4 MIN READ</span>
            <h4 className="text-base font-medium text-white mt-1">Eliminating Latency in Multimodal Document Pipelines</h4>
            <p className="text-xs text-white/70 mt-1">
              Architectural lessons from ingesting 50M pages per week at sub-100ms response targets.
            </p>
          </div>
          <div>
            <span className="font-mono text-xs text-white/50">AUGUST 2026 · 8 MIN READ</span>
            <h4 className="text-base font-medium text-white mt-1">The End of Manual Process Engineering</h4>
            <p className="text-xs text-white/70 mt-1">
              Why modern automation focuses on intent capture rather than rigid rules-based scripting.
            </p>
          </div>
        </div>
      </SimpleDrawer>

      <SimpleDrawer
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        title="Get in Touch"
        subtitle="Nova Headquarters"
      >
        <p>
          Interested in partnering, exploring an automation pilot, or joining our team? Reach out directly.
        </p>
        <div className="mt-4 p-4 rounded-xl border border-white/15 bg-white/5 space-y-2 text-xs font-mono">
          <div><strong className="text-white/60">PARTNERSHIPS:</strong> partners@novaai.com</div>
          <div><strong className="text-white/60">ENGINEERING:</strong> research@novaai.com</div>
          <div><strong className="text-white/60">PRESS & INVESTORS:</strong> media@novaai.com</div>
        </div>
        <div className="pt-2">
          <button
            onClick={() => {
              setContactOpen(false);
              setIsConsultationOpen(true);
            }}
            className="w-full rounded-full bg-white py-2.5 text-xs font-medium text-black hover:bg-white/85 transition-colors cursor-pointer"
          >
            Book Free Strategy Call Instead
          </button>
        </div>
      </SimpleDrawer>
    </div>
  );
}
