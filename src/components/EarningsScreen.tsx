/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowLeft, Landmark, BarChart3, TrendingUp, Calendar, ChevronRight, Download, Filter, HelpCircle, Menu } from "lucide-react";
import { Screen, Transaction } from "../types";

interface EarningsScreenProps {
  transactions: Transaction[];
  totalEarnings: number;
  onNavigate: (screen: Screen) => void;
  onWithdraw: (amount: number) => void;
  onOpenMenu?: () => void;
}

export default function EarningsScreen({
  transactions,
  totalEarnings,
  onNavigate,
  onWithdraw,
  onOpenMenu,
}: EarningsScreenProps) {
  const [activeRange, setActiveRange] = useState<"daily" | "weekly" | "monthly">("daily");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawInput, setWithdrawInput] = useState("10000");
  const [filterQuery, setFilterQuery] = useState<string>("All");

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(withdrawInput);
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (amt > totalEarnings) {
      alert("Insufficient funds in your active balance.");
      return;
    }
    onWithdraw(amt);
    setShowWithdrawModal(false);
    alert(`Transfer of ₹${amt.toFixed(2)} completed successfully! Standard processing time is 1-2 hours.`);
  };

  const getTransactionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "plumbing service":
        return (
          <div className="w-11 h-11 rounded-lg bg-cyan-50 text-cyan-500 flex items-center justify-center shrink-0 border border-cyan-100">
            <svg className="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        );
      case "ac deep cleaning":
        return (
          <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 border border-blue-100">
            <svg className="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18m-3-6L6 18M6 6l12 12" />
            </svg>
          </div>
        );
      case "electrical repairs":
      default:
        return (
          <div className="w-11 h-11 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100">
            <svg className="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        );
    }
  };

  const filteredTrans = transactions.filter((t) => {
    if (filterQuery === "All") return true;
    return t.status === filterQuery;
  });

  return (
    <div className="flex flex-col min-h-full bg-background text-on-surface pb-24 relative">
      {/* Top Header App Bar */}
      <header className="sticky top-0 bg-gradient-to-b from-primary to-primary-container text-white z-40 px-4 h-16 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMenu}
            className="hover:bg-white/10 p-1.5 rounded-full transition-all active:scale-95 cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5.5 h-5.5 text-on-surface" />
          </button>
          <h1 className="text-lg font-bold font-headline">Earning History</h1>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => alert("Withdrawals are certified PCI-DSS secure.")}
            className="hover:bg-white/10 p-2 rounded-full cursor-pointer text-white"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Primary Month Metrics Bento Panel */}
      <main className="flex-grow p-4 space-y-4">
        <section className="relative overflow-hidden bg-primary rounded-2xl p-5 text-white shadow-lg space-y-4">
          {/* Subtle background glow bubbles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-10 -mb-10 blur-lg" />

          <div className="relative z-10 flex flex-col items-center justify-center space-y-1 text-center">
            <p className="text-[10px] uppercase font-extrabold tracking-widest text-blue-100/80">
              Total Earned this Month
            </p>
            <h2 className="text-3xl font-black font-headline tracking-tight">
              ₹{totalEarnings.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
            <div className="pt-2.5 flex items-center gap-2.5">
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="bg-white text-primary font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-xs active:scale-95 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <Landmark className="w-4 h-4 text-primary" />
                Withdraw
              </button>
              <button
                onClick={() => alert("Opening analytical breakdowns and ledger accounts.")}
                className="bg-primary-container/20 border border-white/20 text-white font-bold text-xs p-3 rounded-xl active:scale-95 transition-all cursor-pointer"
              >
                <BarChart3 className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </section>

        {/* Weekly Trend Visualizer Bar Chart */}
        <div className="bg-white border border-outline-variant/30 rounded-xl p-4 shadow-xs">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface">Weekly Trend</h3>
            <span className="text-[#006e1c] text-[11px] font-extrabold flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              <TrendingUp className="w-3.5 h-3.5" /> +12%
            </span>
          </div>

          {/* Interactive CSS Row Columns representing Mon-Sun */}
          <div className="flex items-end justify-between h-28 gap-2.5 pt-4">
            <div className="w-full flex flex-col items-center gap-1.5 h-full justify-end">
              <div className="w-full bg-surface-container rounded-t-sm h-[40%] hover:bg-primary/50 transition-colors" />
            </div>
            <div className="w-full flex flex-col items-center gap-1.5 h-full justify-end">
              <div className="w-full bg-surface-container rounded-t-sm h-[60%] hover:bg-primary/50 transition-colors" />
            </div>
            <div className="w-full flex flex-col items-center gap-1.5 h-full justify-end">
              <div className="w-full bg-surface-container rounded-t-sm h-[35%] hover:bg-primary/50 transition-colors" />
            </div>
            {/* Thursday Thursday is highlighted center focus as in images */}
            <div className="w-full flex flex-col items-center gap-1.5 h-full justify-end">
              <div className="w-full bg-primary rounded-t-sm h-[85%] relative shadow-xs">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[9px] font-bold px-1 py-0.5 rounded shadow-xs select-none">
                  85%
                </span>
              </div>
            </div>
            <div className="w-full flex flex-col items-center gap-1.5 h-full justify-end">
              <div className="w-full bg-surface-container rounded-t-sm h-[55%] hover:bg-primary/50 transition-colors" />
            </div>
            <div className="w-full flex flex-col items-center gap-1.5 h-full justify-end">
              <div className="w-full bg-surface-container rounded-t-sm h-[45%] hover:bg-primary/50 transition-colors" />
            </div>
            <div className="w-full flex flex-col items-center gap-1.5 h-full justify-end">
              <div className="w-full bg-surface-container rounded-t-sm h-[70%] hover:bg-primary/50 transition-colors" />
            </div>
          </div>

          <div className="flex justify-between mt-2 text-[10px] font-bold text-outline uppercase tracking-wider">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span className="text-primary font-black">Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Tab Range Selectors Daily/Weekly/Monthly */}
        <section className="sticky top-16 bg-background/95 backdrop-blur-md z-30 py-1">
          <div className="flex border-b border-outline-variant/30 text-center text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => setActiveRange("daily")}
              className={`flex-1 py-3 border-b-2.5 transition-all cursor-pointer ${
                activeRange === "daily"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-on-surface-variant hover:text-primary"
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setActiveRange("weekly")}
              className={`flex-1 py-3 border-b-2.5 transition-all cursor-pointer ${
                activeRange === "weekly"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-on-surface-variant hover:text-primary"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => {
                setActiveRange("monthly");
                alert("Aggregated monthly balance sheets are active.");
              }}
              className={`flex-1 py-3 border-b-2.5 transition-all cursor-pointer ${
                activeRange === "monthly"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-on-surface-variant hover:text-primary"
              }`}
            >
              Monthly
            </button>
          </div>
        </section>

        {/* Transaction Listings */}
        <section className="space-y-3.5">
          <div className="flex justify-between items-center px-1">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
              Recent Transactions
            </p>
            <div className="relative inline-block text-left">
              <select
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="bg-white border border-outline-variant rounded-lg px-2.5 py-1.5 text-xs text-primary font-bold appearance-none cursor-pointer focus:outline-none focus:border-primary shrink-0"
              >
                <option value="All">⚡ Filter Status</option>
                <option value="Settled">Settled</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Transactions Cards */}
          <div className="space-y-3">
            {filteredTrans.length === 0 ? (
              <div className="text-center py-6 text-xs text-outline font-medium">
                No transactions found matching status.
              </div>
            ) : (
              filteredTrans.map((tx) => (
                <div
                  key={tx.id}
                  className="bg-white rounded-xl border border-outline-variant/30 p-4 flex flex-col gap-3 shadow-xs hover:shadow-xs transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3.5 items-center">
                      {getTransactionIcon(tx.serviceType)}
                      <div>
                        <p className="text-sm font-bold font-headline text-on-surface">
                          {tx.serviceType}
                        </p>
                        <p className="text-[11px] text-outline font-medium">Order #{tx.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-secondary">
                        + ₹{tx.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </p>
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase mt-1 tracking-tight ${
                          tx.status === "Settled"
                            ? "bg-emerald-100 text-[#006e1c] border border-emerald-200"
                            : "bg-amber-100 text-[#795900] border border-amber-200"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-outline-variant/20 pt-2.5 flex justify-between items-center text-[11px] text-outline font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-outline" />
                      <span>
                        {tx.date} • {tx.time}
                      </span>
                    </div>
                    <button
                      onClick={() => alert(`Details ledger for transfer sequence #${tx.id} is locked.`)}
                      className="text-primary font-bold hover:underline flex items-center gap-0.5"
                    >
                      Details <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Load Older Transactions */}
          <div className="flex flex-col items-center justify-center py-6 opacity-60 gap-1.5">
            <svg
              className="w-8 h-8 opacity-40 text-on-surface"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-[11px] font-semibold text-outline">Showing last 30 days of history</p>
            <button
              onClick={() => alert("Loading ledger entries preceding October 2023...")}
              className="text-primary font-bold text-xs underline underline-offset-4 cursor-pointer"
            >
              Load Older Transactions
            </button>
          </div>
        </section>
      </main>

      {/* Cash-out withdrawal modal */}
      {showWithdrawModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-5 border border-outline-variant/30 shadow-lg text-on-surface w-full max-w-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-primary uppercase tracking-wide">
                Withdrawal Payout (IMPS/NEFT)
              </h3>
              <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">
                Instant bank transfer to your linked state bank account.
              </p>
            </div>
            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-outline-variant/20 flex justify-between items-center text-xs">
                <span className="text-on-surface-variant font-semibold">Available Ballance</span>
                <span className="font-bold text-[#006e1c]">₹{totalEarnings.toFixed(2)}</span>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-outline">Payout Amount</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-outline">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={withdrawInput}
                    onChange={(e) => setWithdrawInput(e.target.value)}
                    className="w-full bg-white border border-outline-variant rounded-lg pl-8 pr-4 py-2.5 text-sm font-bold focus:outline-none focus:border-primary"
                    placeholder="Enter amount (e.g. 5000)"
                    max={totalEarnings}
                    min="100"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="w-1/2 cursor-pointer bg-surface-container font-bold text-xs py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 cursor-pointer bg-primary text-white font-bold text-xs py-2.5 rounded-lg hover:opacity-90 transition-all text-center"
                >
                  Transfer Payout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
