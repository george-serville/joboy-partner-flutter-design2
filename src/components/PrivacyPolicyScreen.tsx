/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Eye, 
  Lock, 
  MapPin, 
  Server, 
  Smartphone, 
  HelpCircle,
  Clock,
  ChevronRight
} from "lucide-react";
import { Screen } from "../types";

interface PrivacyPolicyScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function PrivacyPolicyScreen({ onNavigate }: PrivacyPolicyScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 pb-20 relative font-sans">
      {/* Top Header App Bar */}
      <header className="sticky top-0 bg-[#14A5FF] text-white z-40 px-4 h-16 shadow-md flex items-center gap-3">
        <button
          onClick={() => onNavigate(Screen.DASHBOARD)}
          className="hover:bg-white/10 p-1.5 rounded-full transition-all active:scale-95 cursor-pointer border-none bg-transparent text-white"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-md font-bold font-headline font-mono">Privacy Policy</h1>
      </header>

      {/* Main Container */}
      <main className="flex-grow p-4 space-y-5 overflow-y-auto">
        
        {/* Intro Card */}
        <section className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#14A5FF] flex items-center justify-center border border-sky-100 shrink-0">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-800">Joboy Partner Guard</h2>
              <p className="text-[10px] text-zinc-400 font-mono font-bold uppercase tracking-wider">Last updated: June 2026</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-semibold">
            Joboy Services Pvt Ltd ("Joboy", "we", "us", "our") respects your privacy. This policy documents how we collect, securely store, and utilize helper/technician profile coordinates, real-time location metrics, and transaction details to pair you with premium service tickets near Kochi, Kerala.
          </p>
        </section>

        {/* Highlight Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 text-center space-y-1">
            <Lock className="w-4.5 h-4.5 text-emerald-600 mx-auto" />
            <h4 className="text-[10px] font-bold text-slate-700">AES-256</h4>
            <span className="block text-[8px] text-zinc-400 font-bold uppercase">Encrypted</span>
          </div>
          <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-3 text-center space-y-1">
            <MapPin className="w-4.5 h-4.5 text-[#14A5FF] mx-auto" />
            <h4 className="text-[10px] font-bold text-slate-700">Real-time</h4>
            <span className="block text-[8px] text-zinc-400 font-bold uppercase">GPS Routing</span>
          </div>
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 text-center space-y-1">
            <Server className="w-4.5 h-4.5 text-indigo-600 mx-auto" />
            <h4 className="text-[10px] font-bold text-slate-700">Strictly 3rd</h4>
            <span className="block text-[8px] text-zinc-400 font-bold uppercase">No Selling</span>
          </div>
        </div>

        {/* Section Blocks */}
        <section className="space-y-3.5">
          <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest pl-1">
            Privacy Scope & Articles
          </h3>

          {/* Article 1 */}
          <div className="bg-white rounded-xl border border-zinc-200 p-4 space-y-2 shadow-xs text-left">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-100 font-mono text-[10px] font-bold flex items-center justify-center text-[#14A5FF]">1</span>
              <h4 className="text-xs font-bold text-slate-800">Coordinates & Active Location Tracking</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-7">
              To dispatch high-payout active AC, plumbing, or electric tasks efficiently, the Joboy Partner application collects your accurate geographical coordinates in the background even when closed. This metadata handles instant distance estimation to client venues.
            </p>
          </div>

          {/* Article 2 */}
          <div className="bg-white rounded-xl border border-zinc-200 p-4 space-y-2 shadow-xs text-left">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-100 font-mono text-[10px] font-bold flex items-center justify-center text-[#14A5FF]">2</span>
              <h4 className="text-xs font-bold text-slate-800">Partner Credentials & Verification</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-7">
              For security, verification requires collection of personal information including Aadhaar details, professional certifications, operational categories, and contact details. This data is strictly secure and matches regulatory safety guidelines.
            </p>
          </div>

          {/* Article 3 */}
          <div className="bg-white rounded-xl border border-zinc-200 p-4 space-y-2 shadow-xs text-left">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-100 font-mono text-[10px] font-bold flex items-center justify-center text-[#14A5FF]">3</span>
              <h4 className="text-xs font-bold text-slate-800">Financial Ledger Data Logs</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-7">
              Tax rules, Indian GST reporting, and settlement records require logging generated invoices, materials bills, cash payouts, and direct bank cashout withdrawals. These figures maintain standard double-entry accountability and remain private.
            </p>
          </div>

          {/* Article 4 */}
          <div className="bg-white rounded-xl border border-zinc-200 p-4 space-y-2 shadow-xs text-left">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-100 font-mono text-[10px] font-bold flex items-center justify-center text-[#14A5FF]">4</span>
              <h4 className="text-xs font-bold text-slate-800">Telemetry, Device Info & Analytics</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-7">
              We log unique hardware tags, operating system levels, active network signal quality, and telephony call durations. These logs run locally to handle crash tracking and verify customer call support quality.
            </p>
          </div>
        </section>

        {/* Security Pledge Box */}
        <section className="bg-sky-50 border border-sky-150 rounded-xl p-4 flex gap-3 text-xs text-sky-850 shadow-xs">
          <Lock className="w-5 h-5 text-[#14A5FF] shrink-0 mt-0.5" />
          <div className="space-y-1 text-left">
            <h4 className="font-extrabold uppercase tracking-wider text-[10px] text-sky-900">Partner Security Pledge</h4>
            <p className="leading-relaxed font-semibold text-slate-700">
              We never broker, lease, or distribute your personal profile information to unaffiliated organizations. Joboy uses industry-grade transport layers (TLS 1.3) to safeguard connection handshakes.
            </p>
          </div>
        </section>

        {/* Need Help CTA Button */}
        <section className="bg-white rounded-xl border border-zinc-200 p-4 text-center space-y-3">
          <HelpCircle className="w-8 h-8 text-zinc-400 mx-auto" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-800">Questions or Grievances?</h4>
            <p className="text-[11px] text-zinc-400 font-medium">For data correction queries, email our Grievance Officer.</p>
          </div>
          <button
            onClick={() => alert("Grievance email copy request: partnersupport@joboy.in")}
            className="inline-flex items-center gap-1 bg-[#14A5FF] text-white font-extrabold text-xs px-4 py-2 rounded-lg cursor-pointer transition-all active:scale-[0.98] border-none"
          >
            Email Support
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </section>

      </main>
    </div>
  );
}
