/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  ArrowLeft, 
  FileText, 
  Scale, 
  Award, 
  AlertTriangle, 
  DollarSign, 
  Users,
  Compass,
  ChevronRight
} from "lucide-react";
import { Screen } from "../types";

interface TermsOfUseScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function TermsOfUseScreen({ onNavigate }: TermsOfUseScreenProps) {
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
        <h1 className="text-md font-bold font-headline font-mono">Terms of Use</h1>
      </header>

      {/* Main Container */}
      <main className="flex-grow p-4 space-y-5 overflow-y-auto">
        
        {/* Intro Card */}
        <section className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100 shrink-0">
              <Scale className="w-5.5 h-5.5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-800">Joboy Partner Agreement</h2>
              <p className="text-[10px] text-zinc-400 font-mono font-bold uppercase tracking-wider">Operational Framework • v4.2</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-semibold">
            Please read these Partner Terms of Use ("Terms") carefully. By registering as an active maintenance or repair partner on Joboy, you agree to these operating standards under the laws of Kochi Jurisdiction, Kerala, India.
          </p>
        </section>

        {/* Quick Rules Summary Bullet Points */}
        <section className="bg-white rounded-xl border border-zinc-200 p-4 shadow-xs space-y-3">
          <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest pl-1">
            Core Responsibilities
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14A5FF] shrink-0 mt-1.5" />
              <span>Independent Entrepreneurship: You operate as an independent contractor, not an employee.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14A5FF] shrink-0 mt-1.5" />
              <span>Safety & Gear: Required utilization of professional electrical/mechanical isolation tools.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14A5FF] shrink-0 mt-1.5" />
              <span>Billing Integrity: No secondary unvouched cash charges besides official invoice statements.</span>
            </li>
          </ul>
        </section>

        {/* Major Articles */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest pl-1">
            Legislation & Terms Articles
          </h3>

          {/* Block 1 */}
          <div className="bg-white border border-zinc-200 p-4 rounded-xl shadow-xs space-y-2 text-left">
            <div className="flex items-center gap-2 text-slate-800">
              <Users className="w-4.5 h-4.5 text-sky-500 shrink-0" />
              <h4 className="text-xs font-bold font-headline">Article 1: Professional Conduct & Rating Floor</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Partners must project courtesy and finish items within requested timetables. Maintaining a rating minimum of <strong>4.2 ★</strong> is mandatory to secure consistent access to the Kochi premium-payout cluster. Ratings falling below 4.0 constitute immediate suspension of terminal access.
            </p>
          </div>

          {/* Block 2 */}
          <div className="bg-white border border-zinc-200 p-4 rounded-xl shadow-xs space-y-2 text-left">
            <div className="flex items-center gap-2 text-slate-800">
              <DollarSign className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
              <h4 className="text-xs font-bold font-headline">Article 2: Fee Structure, Commission & Taxes</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Joboy charges an escrow administration convenience fee on settled services (typically 12-15%). Payout distributions are processed cleanly into your ledger after Deductions of appropriate TDS and State GST files in Kerala jurisdiction.
            </p>
          </div>

          {/* Block 3 */}
          <div className="bg-white border border-zinc-200 p-4 rounded-xl shadow-xs space-y-2 text-left">
            <div className="flex items-center gap-2 text-slate-800">
              <AlertTriangle className="w-4.5 h-4.5 text-rose-500 shrink-0" />
              <h4 className="text-xs font-bold font-headline">Article 3: Guarantee, Liability & Indemnification</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              You warrant all manual inspection and hardware fixes for a strict window of 14 days after work dispatch. Partners represent and agree to protect Joboy from consumer claims arising from repair failure, damage, neglect, or non-certified components usage.
            </p>
          </div>

          {/* Block 4 */}
          <div className="bg-white border border-zinc-200 p-4 rounded-xl shadow-xs space-y-2 text-left">
            <div className="flex items-center gap-2 text-slate-800">
              <Compass className="w-4.5 h-4.5 text-indigo-500 shrink-0" />
              <h4 className="text-xs font-bold font-headline">Article 4: Disputes & Governing Law</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Any claim, dispute, or discrepancy arising under this agreement is subject to direct mediation before the legal officers of Kochi Municipal Corporation under Kochi jurisdiction, State of Kerala, India.
            </p>
          </div>
        </section>

        {/* Warning Alert banner */}
        <section className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-xs text-amber-800 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 fill-amber-55 mt-0.5" />
          <div className="space-y-1 text-left">
            <h4 className="font-bold uppercase tracking-wider text-[10px] text-amber-900">Zero Tolerance for Dis-intermediation</h4>
            <p className="leading-relaxed font-semibold text-amber-950">
              Attempting to solicit Joboy clients directly or receiving off-platform direct payouts causes immediate partner platform blacklisting and forfeit of all current unpaid wallet balances.
            </p>
          </div>
        </section>

        {/* Footer info stamp */}
        <p className="text-[10px] text-zinc-400 font-mono text-center pt-2">
          By working active jobs on site, you actively reaffirm consent to these operational terms.
        </p>

      </main>
    </div>
  );
}
