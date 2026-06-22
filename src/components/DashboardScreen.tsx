/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Menu, 
  Bell, 
  Wallet, 
  CheckCircle, 
  Star, 
  ChevronRight, 
  TrendingUp, 
  Headphones, 
  Trophy, 
  Gift, 
  Navigation,
  X,
  Send,
  UserCheck
} from "lucide-react";
import { Screen, Order, PartnerProfile, OrderStatus } from "../types";

interface DashboardScreenProps {
  orders: Order[];
  profile: PartnerProfile;
  totalEarnings: number;
  onNavigate: (screen: Screen) => void;
  onOpenMenu: () => void;
  onSelectOrderDetail: (orderId: string) => void;
}

export default function DashboardScreen({
  orders,
  profile,
  totalEarnings,
  onNavigate,
  onOpenMenu,
  onSelectOrderDetail,
}: DashboardScreenProps) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [supportMessage, setSupportMessage] = useState("");
  const [supportChat, setSupportChat] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: "Hello! Joboy Partner Support here. How can we help you with your jobs or earnings today?" },
  ]);

  // Find an active order in current state, or fallback to beautiful AC Repair mockup
  const activeOrder = orders.find(
    (o) => o.status === OrderStatus.ACTIVE || o.status === OrderStatus.IN_PROGRESS
  );

  const handleSendSupportMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;

    const userMsg = supportMessage;
    setSupportChat((prev) => [...prev, { sender: "user", text: userMsg }]);
    setSupportMessage("");

    // Simulated supportive bot feedback response
    setTimeout(() => {
      let reply = "Thanks for contacting Joboy! Our support executive has been assigned and will call you in 2 minutes.";
      if (userMsg.toLowerCase().includes("payment") || userMsg.toLowerCase().includes("earning")) {
        reply = "About payouts: Joboy issues weekly bank deposits on Monday mornings. Transferred settlements reflect within 24 hours.";
      } else if (userMsg.toLowerCase().includes("location") || userMsg.toLowerCase().includes("city")) {
        reply = "You can update your covered cities and active coordinates dynamically via your Profile sheet.";
      }
      setSupportChat((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 800);
  };

  // Mock leaderboard users
  const leaderboardPartners = [
    { rank: 1, name: "Pradeep Nair", jobs: 48, rating: 5.0, earnings: "₹45,200", current: false },
    { rank: 2, name: `${profile?.name || "Premium Partner"} (You)`, jobs: 42, rating: profile?.rating || 4.9, earnings: `₹${totalEarnings.toLocaleString('en-IN')}`, current: true },
    { rank: 3, name: "Anish Jacob", jobs: 39, rating: 4.8, earnings: "₹38,150", current: false },
    { rank: 4, name: "Suresh Pillai", jobs: 35, rating: 4.7, earnings: "₹31,400", current: false },
    { rank: 5, name: "Rahul Krishna", jobs: 31, rating: 4.8, earnings: "₹28,950", current: false },
  ];

  // Simulated notification list
  const notifications = [
    { id: 1, text: "🎉 Dynamic Bonus unlocked! Complete 3 more jobs.", time: "10 mins ago" },
    { id: 2, text: "💼 New emergency PLUMBING request near Kadavanthra.", time: "1 hour ago" },
    { id: 3, text: "💸 Settlement of ₹4,130 processed successfully.", time: "Yesterday" },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-[#efefef] scroll-smooth overflow-x-hidden relative text-slate-900 font-sans">
      
      {/* Top Application Header */}
      <header className="sticky top-0 bg-[#14A5FF] text-white z-40 px-4 h-16 shadow-md flex items-center justify-between border-b border-sky-450/45">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMenu}
            className="hover:bg-white/10 p-2 rounded-full transition-all active:scale-95 cursor-pointer border-none bg-transparent"
            aria-label="Open Navigation Drawer"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold tracking-tight font-headline text-white select-none">Joboy Partner</h1>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowNotification(!showNotification)}
            className="hover:bg-white/10 p-2 rounded-full transition-all active:scale-95 cursor-pointer relative border-none bg-transparent"
            aria-label="View notifications"
          >
            <Bell className="w-6 h-6 text-white" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-sky-500" />
          </button>

          {/* Toast / Notification dropdown overlay */}
          {showNotification && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-zinc-200 py-3 z-50 text-slate-800 animate-in fade-in slide-in-from-top-3">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-zinc-100">
                <span className="font-bold text-xs text-zinc-500 uppercase tracking-widest">Joboy Updates</span>
                <button 
                  onClick={() => setShowNotification(false)}
                  className="text-zinc-400 hover:text-zinc-600 text-xs font-bold bg-transparent border-none cursor-pointer"
                >
                  Clear
                </button>
              </div>
              <div className="divide-y divide-zinc-50 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors">
                    <p className="text-xs text-slate-800 font-medium">{n.text}</p>
                    <span className="text-[10px] text-zinc-400 font-semibold">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Greeting Segment & Switch */}
      <section className="bg-white p-5 shadow-sm border-b border-zinc-100">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black font-headline text-slate-900 tracking-tight leading-none mb-1">
              Good morning,
              <span className="block text-[#14A5FF] mt-1">{profile?.name || "Partner"}!</span>
            </h2>
            <p className="text-xs text-zinc-500 font-medium">Ready for a productive day in Kochi?</p>
          </div>
          
          {/* Reactive Switch / Pill */}
          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
              isAvailable 
                ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                : "bg-zinc-100 border-zinc-300 text-zinc-500"
            }`}
          >
            <div className={`w-2.5 h-2.5 rounded-full ${isAvailable ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"}`} />
            <span>{isAvailable ? "Available" : "Offline"}</span>
          </button>
        </div>
      </section>

      {/* Quick metrics row widgets */}
      <div className="px-4 py-4 grid grid-cols-3 gap-3">
        {/* Metric 1 - Today's Earnings */}
        <div className="bg-white p-3 rounded-2xl border border-zinc-100 shadow-xs flex flex-col justify-between h-24">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Wallet className="w-4 h-4 text-[#14A5FF]" />
          </div>
          <div>
            <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Today's Earnings</p>
            <h4 className="text-sm font-extrabold text-slate-800">
              ₹{(isAvailable ? 1250 : 0).toLocaleString('en-IN')}
            </h4>
          </div>
        </div>

        {/* Metric 2 - Jobs Completed */}
        <div className="bg-white p-3 rounded-2xl border border-zinc-100 shadow-xs flex flex-col justify-between h-24">
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Jobs Completed</p>
            <h4 className="text-sm font-extrabold text-slate-800">
              {orders.filter(o => o.status === OrderStatus.COMPLETED).length || "4"}
            </h4>
          </div>
        </div>

        {/* Metric 3 - Avg Rating */}
        <div className="bg-white p-3 rounded-2xl border border-zinc-100 shadow-xs flex flex-col justify-between h-24">
          <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div>
            <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Avg Rating</p>
            <h4 className="text-sm font-extrabold text-slate-800">
              {profile?.rating?.toFixed(1) || "4.9"}
            </h4>
          </div>
        </div>
      </div>

      {/* Daily Overview Bar Chart section */}
      <section className="mx-4 bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-800">Daily Overview</h3>
          <button className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-1 rounded bg-slate-100 text-zinc-500 border-none cursor-pointer">
            7 Days
          </button>
        </div>

        {/* Vertical visual chart */}
        <div className="grid grid-cols-7 gap-2 pt-6 items-end justify-items-center h-32 relative">
          <div className="absolute inset-x-0 bottom-6 border-b border-zinc-100" />
          
          {[
            { label: "MON", height: "h-8", value: "₹200", highlighted: false },
            { label: "TUE", height: "h-16", value: "₹650", highlighted: false },
            { label: "WED", height: "h-12", value: "₹450", highlighted: false },
            { label: "THU", height: "h-20", value: "₹1,100", highlighted: false },
            { label: "FRI", height: "h-18", value: "₹900", highlighted: false },
            { label: "SAT", height: "h-10", value: "₹350", highlighted: false },
            { label: "SUN", height: "h-22", value: "₹1,250", highlighted: true },
          ].map((bar, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 w-full z-10">
              <span className="text-[8px] text-zinc-400 font-bold opacity-0 hover:opacity-100 transition-opacity bg-slate-800 text-white px-1 rounded absolute -top-5">
                {bar.value}
              </span>
              <div 
                className={`w-4.5 rounded-t-md transition-all duration-500 ${bar.height} ${
                  bar.highlighted ? "bg-[#14A5FF]" : "bg-slate-100 hover:bg-slate-200"
                }`} 
              />
              <span className="text-[9px] font-extrabold text-zinc-400 tracking-tighter shrink-0">{bar.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Active Job Card */}
      <section className="mx-4 mt-4">
        <div className="bg-[#14A5FF] p-5 rounded-2xl relative overflow-hidden shadow-md text-white border border-[#14A5FF]/30">
          <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 opacity-10">
            <svg className="w-32 h-32 text-white fill-current" viewBox="0 0 24 24">
              <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.3C.5 6.7.9 9.7 2.9 11.7c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.4-2.4c.4-.4.4-1.1 0-1.4z" />
            </svg>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-bold tracking-widest uppercase bg-sky-600/55 px-2 py-1 rounded-full border border-sky-200/20">
              ACTIVE NOW
            </span>
            <button className="text-white hover:bg-white/10 p-1.5 rounded-full bg-transparent border-none cursor-pointer">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            </button>
          </div>

          <h4 className="text-lg font-black tracking-tight mb-1 font-headline">
            {activeOrder ? activeOrder.serviceType : "AC Repair & Maintenance"}
          </h4>
          <p className="text-xs text-sky-100/85 mb-5 flex items-center gap-1.5 font-medium">
            <Navigation className="w-3.5 h-3.5 fill-current" />
            {activeOrder 
              ? activeOrder.locationName 
              : "Aluva, Kochi • 2:30 PM Today"
            }
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (activeOrder) {
                  onSelectOrderDetail(activeOrder.id);
                } else {
                  // Fallback detail
                  onSelectOrderDetail("JO-12345");
                }
              }}
              className="flex-grow bg-white text-[#14A5FF] font-extrabold text-xs py-3 rounded-xl hover:bg-sky-50 shadow-sm select-none border-none cursor-pointer text-center"
            >
              View Details
            </button>
            <button 
              onClick={() => alert("Launching integrated map navigation coordinates...")}
              className="w-11 h-11 bg-sky-600 hover:bg-sky-700/80 rounded-xl flex items-center justify-center border border-sky-400 cursor-pointer shadow-sm"
              aria-label="Map Route Coordinates"
            >
              <svg className="w-4.5 h-4.5 text-white stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9yM3 9h18" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Resources segment */}
      <section className="mx-4 mt-5 space-y-2">
        <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">RESOURCES</h3>
        <div className="grid grid-cols-3 gap-3">
          {/* Resource 1: Earning Ledger */}
          <button
            onClick={() => onNavigate(Screen.EARNINGS)}
            className="bg-white p-3 rounded-2xl border border-zinc-100 flex flex-col items-center text-center gap-2 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold text-slate-700 leading-tight">Earning History</span>
          </button>

          {/* Resource 2: Support Bot */}
          <button
            onClick={() => setShowSupportModal(true)}
            className="bg-white p-3 rounded-2xl border border-zinc-100 flex flex-col items-center text-center gap-2 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer border-none bg-transparent"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold text-slate-700 leading-tight">Partner Support</span>
          </button>

          {/* Resource 3: Leaderboard */}
          <button
            onClick={() => setShowLeaderboardModal(true)}
            className="bg-white p-3 rounded-2xl border border-zinc-100 flex flex-col items-center text-center gap-2 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer border-none bg-transparent"
          >
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold text-slate-700 leading-tight">Leaderboard</span>
          </button>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="mx-4 mt-5">
        <div className="bg-amber-100 p-4 rounded-2xl border border-amber-200/50 flex gap-3.5 items-center">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h5 className="text-xs font-black text-amber-900 tracking-tight">Earn ₹500 Bonus!</h5>
            <p className="text-[10px] text-amber-800 font-medium leading-normal mt-0.5">
              Complete 10 jobs this weekend and unlock your loyalty bonus.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------- SUPPORT CHAT MODAL OVERLAY ----------------- */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-sm h-[400px] flex flex-col justify-between shadow-2xl relative animate-in slide-in-from-bottom-5">
            {/* Header */}
            <div className="px-5 py-3 border-b border-zinc-100 flex items-center justify-between bg-emerald-50 text-emerald-800 rounded-t-3xl sm:rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-emerald-600" />
                <span className="font-extrabold text-xs uppercase tracking-widest">Support Conversation</span>
              </div>
              <button 
                onClick={() => setShowSupportModal(false)}
                className="p-1 rounded-full hover:bg-emerald-100 text-emerald-800 border-none cursor-pointer bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3 scroll-hide">
              {supportChat.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs font-medium ${
                    msg.sender === "user" 
                      ? "bg-emerald-600 text-white rounded-br-none" 
                      : "bg-zinc-100 text-slate-800 rounded-bl-none border border-zinc-100"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendSupportMessage} className="p-3 border-t border-zinc-100 flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                className="flex-grow text-xs rounded-xl px-3 py-2.5 border border-zinc-300 focus:outline-[#14A5FF] text-slate-800"
              />
              <button 
                type="submit"
                className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 cursor-pointer border-none"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- LEADERBOARD MODAL OVERLAY ----------------- */}
      {showLeaderboardModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-sm max-h-[450px] flex flex-col shadow-2xl relative animate-in slide-in-from-bottom-5">
            {/* Header */}
            <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between bg-amber-50 text-amber-800 rounded-t-3xl sm:rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="font-extrabold text-xs uppercase tracking-widest">Joboy Kerala Leaderboard</span>
              </div>
              <button 
                onClick={() => setShowLeaderboardModal(false)}
                className="p-1 rounded-full hover:bg-amber-100 text-amber-800 border-none cursor-pointer bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Leaderboard content */}
            <div className="p-4 overflow-y-auto space-y-2.5 divide-y divide-zinc-50 flex-grow">
              <p className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest text-center mt-2 pb-2">
                Weekly ratings and performance rankings
              </p>
              {leaderboardPartners.map((user) => (
                <div 
                  key={user.rank} 
                  className={`flex items-center justify-between py-2 px-3 rounded-xl transition-all ${
                    user.current ? "bg-amber-100/40 border border-amber-200/50" : "bg-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-extrabold text-xs shrink-0 ${
                      user.rank === 1 ? "bg-amber-500 text-white" :
                      user.rank === 2 ? "bg-slate-400 text-white" :
                      "bg-zinc-100 text-slate-500"
                    }`}>
                      {user.rank}
                    </span>
                    <div>
                      <h6 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                        {user.name}
                        {user.current && <span className="text-[8px] bg-[#14A5FF] text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold">Me</span>}
                      </h6>
                      <p className="text-[10px] text-zinc-500 font-medium">{user.jobs} Jobs completed • ★ {user.rating}</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-slate-800 tracking-tight">{user.earnings}</span>
                </div>
              ))}
            </div>

            {/* Footer informational */}
            <div className="text-[10px] text-zinc-400 text-center font-medium py-3 bg-zinc-50 rounded-b-3xl sm:rounded-b-2xl border-t border-zinc-100">
              Rewards reflect at 12:00 AM every Sunday. Keep completing jobs!
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
