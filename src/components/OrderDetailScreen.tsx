/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Phone, 
  MapPin, 
  Wrench, 
  Shield, 
  AlertTriangle, 
  Play, 
  Pause, 
  BadgeAlert, 
  FileCheck2, 
  HelpCircle,
  Car,
  FileText,
  PhoneOff,
  MicOff,
  Volume2,
  Check,
  X
} from "lucide-react";
import { Screen, Order, OrderStatus } from "../types";

interface OrderDetailScreenProps {
  order: Order | null;
  onNavigate: (screen: Screen) => void;
  onStartWork: (orderId: string) => void;
  onPauseWork: (orderId: string) => void;
  onCompleteWork: (orderId: string, payout: number) => void;
}

export default function OrderDetailScreen({
  order,
  onNavigate,
  onStartWork,
  onPauseWork,
  onCompleteWork,
}: OrderDetailScreenProps) {
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);
  const [isTravelling, setIsTravelling] = useState(false);
  const [showCallSimulator, setShowCallSimulator] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [workTimer, setWorkTimer] = useState(0);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoicePaid, setInvoicePaid] = useState(false);

  // Timers handler
  React.useEffect(() => {
    let interval: any;
    if (showCallSimulator) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [showCallSimulator]);

  const isInProgress = order?.status === OrderStatus.IN_PROGRESS;

  React.useEffect(() => {
    let interval: any;
    if (isInProgress) {
      interval = setInterval(() => {
        setWorkTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInProgress]);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center text-on-surface-variant min-h-full">
        <AlertTriangle className="w-12 h-12 text-outline-variant mb-4" />
        <h3 className="text-sm font-bold text-slate-700">No active task selected</h3>
        <button
          onClick={() => onNavigate(Screen.ORDERS)}
          className="text-primary font-bold text-xs mt-3 hover:underline cursor-pointer bg-transparent border-none"
        >
          Back to list
        </button>
      </div>
    );
  }

  const isNew = order.status === OrderStatus.NEW;
  const isActive = order.status === OrderStatus.ACTIVE;
  const isCompleted = order.status === OrderStatus.COMPLETED;

  const handleStartOrComplete = () => {
    if (isActive) {
      onStartWork(order.id);
      alert("Work cycle started! Timer is active and running.");
    } else if (isInProgress) {
      setShowCompleteConfirm(true);
    }
  };

  const handleConfirmComplete = () => {
    onCompleteWork(order.id, order.total);
    setShowCompleteConfirm(false);
    setInvoicePaid(true);
    alert(`Excellent work! Order #${order.id} is solved. ₹${order.total.toLocaleString('en-IN')} added to your earnings balance.`);
    onNavigate(Screen.EARNINGS);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const cols = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${cols.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 text-[#0f172a] pb-32 relative">
      {/* Top Header App Bar */}
      <header className="sticky top-0 bg-[#0ea5e9] text-white z-40 px-4 h-16 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate(Screen.ORDERS)}
            className="hover:bg-white/10 p-1.5 rounded-full transition-all active:scale-95 cursor-pointer border-none bg-transparent text-white"
            aria-label="Back to order list"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-md font-bold font-headline font-mono">Order #{order.id}</h1>
        </div>
        <div className="flex items-center">
          <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs ${
            isCompleted
              ? "bg-[#006e1c] text-white"
              : isInProgress
              ? "bg-amber-500 text-white animate-pulse"
              : isTravelling
              ? "bg-sky-600 text-white animate-pulse"
              : "bg-[#0ea5e9] text-white border border-sky-300"
          }`}>
            {isCompleted ? "COMPLETED" : isInProgress ? "IN_PROGRESS" : isTravelling ? "TRAVELLING" : "ACTIVE"}
          </span>
        </div>
      </header>

      {/* Main detail sheets */}
      <main className="flex-grow p-4 space-y-4">
        
        {/* SERVICE DETAILS */}
        <section className="space-y-1.5">
          <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider ml-1">
            Service Details
          </h2>
          <div className="bg-white rounded-xl border border-zinc-200 p-4 space-y-3 shadow-xs">
            <div className="flex gap-3.5 items-center">
              <div className="w-12 h-12 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100 shrink-0">
                <Wrench className="w-6.5 h-6.5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold font-headline text-slate-800">
                  {order.serviceType}
                </h3>
                <p className="text-[11px] text-zinc-500 font-semibold">
                  Emergency Service & Inspection
                </p>
                <div className="flex gap-1.5 pt-1">
                  <span className="bg-red-50 text-red-600 text-[9px] font-extrabold px-2 py-0.5 rounded border border-red-100 uppercase select-none">
                    High Priority
                  </span>
                  <span className="bg-slate-50 text-slate-600 text-[9px] font-extrabold px-2 py-0.5 rounded border border-slate-200 uppercase select-none">
                    Resident
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-dashed border-zinc-100 pt-3 grid grid-cols-2 gap-3 divide-x divide-zinc-100">
              <div className="text-left">
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Date &amp; Time</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{order.timeSlot}</p>
              </div>
              <div className="pl-4 text-left">
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Est. Duration</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">1 - 2 Hours</p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE ACTION CENTER (SIX ACTION BUTTONS requested by user) */}
        <section className="space-y-1.5 animate-in fade-in slide-in-from-bottom-3">
          <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider ml-1">
            Service Action Center
          </h2>
          <div className="bg-white rounded-xl border border-zinc-200 p-4 space-y-4 shadow-sm">
            
            {/* Active Milestone Display */}
            <div className="flex justify-between items-center bg-slate-50 border border-zinc-150 rounded-xl p-3">
              <div className="space-y-0.5">
                <span className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">Current Milestone</span>
                <p className="text-xs font-extrabold text-[#0ea5e9]">
                  {isCompleted 
                    ? "Job Completed successfully" 
                    : isInProgress 
                    ? "Work on-site Active" 
                    : isTravelling 
                    ? "On the way to customer" 
                    : "Ready to navigate to client site"
                  }
                </p>
              </div>
              {/* Counter stopwatch indicator if in progress */}
              {isInProgress && (
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-100 font-mono text-xs font-bold shrink-0 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{formatTime(workTimer)}</span>
                </div>
              )}
            </div>

            {/* SIX TASK ACTION BUTTONS IN AN ARCHITECTURAL GRID */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* BUTTON 1: Started Travelling */}
              <button
                onClick={() => {
                  setIsTravelling(!isTravelling);
                  alert(isTravelling ? "Standby mode activated." : "🚗 GPS tracking started: On our way to Cochin customer coordinates.");
                }}
                disabled={isCompleted || isInProgress}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center gap-2 duration-150 cursor-pointer border-none ${
                  isTravelling 
                    ? "bg-sky-50 text-sky-700 font-bold border border-sky-300" 
                    : "bg-white hover:bg-slate-50 border border-zinc-200 text-slate-700 disabled:opacity-50"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isTravelling ? "bg-sky-100" : "bg-zinc-100"}`}>
                  <Car className={`w-5.5 h-5.5 ${isTravelling ? "text-sky-600" : "text-zinc-500"}`} />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs font-extrabold leading-none">Started Travelling</span>
                  <span className="text-[9px] text-zinc-400 font-bold tracking-tight uppercase">
                    {isTravelling ? "TRAVELLING" : "START"}
                  </span>
                </div>
              </button>

              {/* BUTTON 2: Call Customer */}
              <button
                onClick={() => setShowCallSimulator(true)}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-zinc-200 hover:bg-slate-50 bg-white transition-all text-center gap-2 duration-150 cursor-pointer text-slate-700"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Phone className="w-5.5 h-5.5 text-emerald-600 fill-emerald-600" />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs font-extrabold leading-none">Call Customer</span>
                  <span className="text-[9px] text-zinc-400 font-semibold tracking-normal uppercase">DIAL SMS</span>
                </div>
              </button>

              {/* BUTTON 3: Start Work */}
              <button
                onClick={() => {
                  if (isCompleted) return;
                  onStartWork(order.id);
                  alert("Work sequence started successfully! Interactive stopwatch started.");
                }}
                disabled={isCompleted || isInProgress}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center gap-2 duration-150 cursor-pointer border-none ${
                  isInProgress 
                    ? "bg-emerald-50 text-emerald-700 font-bold border border-emerald-300 opacity-60" 
                    : "bg-white hover:bg-slate-50 border border-zinc-200 text-slate-700 disabled:opacity-50"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center font-bold">
                  <Play className="w-5.5 h-5.5 text-sky-600 fill-sky-600" />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs font-extrabold leading-none">Start Work</span>
                  <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
                    {isInProgress ? "RUNNING" : "STANDBY"}
                  </span>
                </div>
              </button>

              {/* BUTTON 4: Pause Work */}
              <button
                onClick={() => {
                  if (!isInProgress) {
                    alert("No active timer running. Press 'Start Work' first!");
                    return;
                  }
                  onPauseWork(order.id);
                  alert("Job paused. Interactive timers are suspended.");
                }}
                disabled={isCompleted || !isInProgress}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-zinc-200 bg-white hover:bg-slate-50 disabled:opacity-50 transition-all text-center gap-2 duration-150 cursor-pointer text-slate-700"
              >
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                  <Pause className="w-5.5 h-5.5 text-amber-600 fill-amber-600" />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs font-extrabold leading-none">Pause Work</span>
                  <span className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wide">Break</span>
                </div>
              </button>

              {/* BUTTON 5: Complete Work */}
              <button
                onClick={() => {
                  if (isCompleted) return;
                  setShowCompleteConfirm(true);
                }}
                disabled={isCompleted}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-zinc-200 bg-white hover:bg-slate-50 disabled:opacity-50 transition-all text-center gap-2 duration-150 cursor-pointer text-slate-700"
              >
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                  <FileCheck2 className="w-5.5 h-5.5 text-red-600" />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs font-extrabold leading-none">Complete Work</span>
                  <span className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wide">SUBMIT</span>
                </div>
              </button>

              {/* BUTTON 6: Invoice */}
              <button
                onClick={() => setShowInvoiceModal(true)}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-zinc-200 bg-white hover:bg-slate-50 transition-all text-center gap-2 duration-150 cursor-pointer text-slate-700"
              >
                <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center">
                  <FileText className="w-5.5 h-5.5 text-violet-600" />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs font-extrabold leading-none">Invoice</span>
                  <span className="text-[9px] text-[#0ea5e9] font-bold uppercase tracking-wider">
                    {isCompleted || invoicePaid ? "View Paid" : "Draft bill"}
                  </span>
                </div>
              </button>

            </div>
          </div>
        </section>

        {/* CUSTOMER & LOCATION */}
        <section className="space-y-1.5">
          <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider ml-1">
            Customer &amp; Location
          </h2>
          <div className="bg-white rounded-xl border border-zinc-200 p-4 space-y-4 shadow-xs">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full border-1 border-white shadow-xs overflow-hidden bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
                    alt="Johnathan Miller Client Contact"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 leading-tight">{order.clientName}</h4>
                  <p className="text-[11px] text-zinc-500 font-medium mt-0.5">{order.clientPhone}</p>
                </div>
              </div>

              {/* Quick direct Call Button shortcut */}
              <button
                onClick={() => setShowCallSimulator(true)}
                className="w-10 h-10 rounded-full bg-sky-50 hover:bg-sky-100 transition-all text-sky-600 flex items-center justify-center p-0 cursor-pointer active:scale-95 border-none shadow-xs shrink-0"
              >
                <Phone className="w-5 h-5 fill-current text-sky-600" />
              </button>
            </div>

            {/* Simulated Map */}
            <div className="relative h-32 bg-sky-50 rounded-lg overflow-hidden border border-zinc-150">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=500&q=80"
                alt="Navigation directions map blueprint"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => {
                  setIsTravelling(true);
                  alert(`Directing you on real-time interactive route via Kochi Bypass to: ${order.locationName}`);
                }}
                className="absolute bottom-2.5 right-2.5 bg-[#0ea5e9] text-white text-[10px] font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-sm active:scale-95 duration-100 cursor-pointer border-none"
              >
                <svg className="w-3.5 h-3.5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                </svg>
                NAVIGATE
              </button>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-600 font-medium pt-1">
              <MapPin className="w-4.5 h-4.5 text-sky-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed text-slate-700/90">
                {order.locationName}
              </p>
            </div>
          </div>
        </section>

        {/* ORDER SUMMARY */}
        <section className="space-y-1.5">
          <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider ml-1">
            Order Summary
          </h2>
          <div className="bg-white rounded-xl border border-zinc-200 p-4 shadow-xs divide-y divide-zinc-100 space-y-3">
            <div className="space-y-2 text-xs text-slate-700 font-medium pt-1">
              <div className="flex justify-between">
                <span className="text-zinc-500">Inspection Fee</span>
                <span>₹{order.inspectionFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Estimated Material Cost</span>
                <span>₹{order.materialCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Tax (GST 18%)</span>
                <span>₹{order.tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-3.5 flex justify-between items-baseline">
              <span className="text-sm font-bold text-slate-800">Total Payable</span>
              <div className="text-right">
                <span className="text-lg font-extrabold text-[#0ea5e9]">₹{order.total.toFixed(2)}</span>
                <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">
                  COD / Digital Pay
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SPECIAL INSTRUCTIONS */}
        <section className="space-y-1.5">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-xs text-amber-800 shadow-xs">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 fill-amber-50" />
            <div className="space-y-1">
              <h4 className="font-bold uppercase tracking-wider text-[10px]">Special Instructions</h4>
              <p className="leading-relaxed font-semibold text-amber-900">
                {order.instructions}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Bottom Work Controls */}
      {!isCompleted && (
        <footer className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-zinc-200 p-4 z-40 grid grid-cols-12 gap-3 rounded-t-xl shadow-lg max-w-md mx-auto">
          {/* Left Pause/Resume Toggle */}
          <div className="col-span-4">
            {isInProgress ? (
              <button
                onClick={() => {
                  onPauseWork(order.id);
                  alert("Work sequence is paused! Ready to resume anytime.");
                }}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-3.5 px-2 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-[0.98] duration-100 shadow-sm border-none"
              >
                <Pause className="w-4.5 h-4.5" />
                Pause
              </button>
            ) : (
              <button
                disabled={isNew}
                onClick={() => {
                  onStartWork(order.id);
                  alert("Work sequence is active!");
                }}
                className="w-full bg-zinc-150 border border-zinc-200 text-slate-700 font-bold text-xs py-3.5 px-2 rounded-lg flex items-center justify-center gap-1 disabled:opacity-50 cursor-pointer text-center"
              >
                <Play className="w-4.5 h-4.5" />
                Resume
              </button>
            )}
          </div>

          {/* Right Action Trigger: Start or Complete */}
          <div className="col-span-8">
            <button
              onClick={handleStartOrComplete}
              className={`w-full text-white font-bold text-xs py-3.5 rounded-lg flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] duration-100 shadow-sm cursor-pointer border-none ${
                isInProgress
                  ? "bg-[#006e1c] hover:bg-[#005e17]"
                  : "bg-[#0ea5e9] hover:bg-sky-600"
              }`}
            >
              {isInProgress ? (
                <>
                  <FileCheck2 className="w-5 h-5" />
                  Complete Work
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start Work
                </>
              )}
            </button>
          </div>
        </footer>
      )}

      {/* Complete Confirmation Modal */}
      {showCompleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in-30">
          <div className="bg-white rounded-xl p-5 border border-zinc-200 shadow-lg text-[#0f172a] w-full max-w-xs space-y-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Verify Job Completion?
              </h3>
              <p className="text-[11px] text-zinc-500 font-medium">
                Are you sure the leakage repair is finished? Confirming this submission will generate an automated invoice of ₹{order.total.toFixed(2)} payable immediately.
              </p>
            </div>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setShowCompleteConfirm(false)}
                className="w-1/2 cursor-pointer bg-slate-100 font-bold text-xs py-2.5 rounded-lg text-slate-700 hover:bg-slate-200 transition-all border-none"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmComplete}
                className="w-1/2 cursor-pointer bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-lg hover:bg-emerald-700 transition-all text-center border-none"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- TELEPHONY CALL MODAL OVERLAY ----------------- */}
      {showCallSimulator && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-zinc-950 rounded-3xl p-6 text-white w-full max-w-xs h-[450px] flex flex-col justify-between shadow-2xl relative border border-zinc-850">
            {/* Call Status label */}
            <div className="text-center space-y-2 mt-4">
              <span className="text-[9px] font-extrabold tracking-widest text-[#0ea5e9] uppercase animate-pulse">
                JOBOY TELEPHONY NETWORK
              </span>
              <h4 className="text-xl font-black text-white">{order.clientName}</h4>
              <p className="text-xs text-zinc-400 font-mono">{order.clientPhone}</p>
              <span className="inline-block px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800/80 text-[10px] font-mono text-emerald-400">
                Connected • {formatTime(callDuration)}
              </span>
            </div>

            {/* Client avatar display */}
            <div className="flex justify-center my-4">
              <div className="w-24 h-24 rounded-full border-2 border-sky-500/35 overflow-hidden relative shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
                  alt={order.clientName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute inset-0 bg-emerald-500/10 animate-ping rounded-full pointer-events-none" />
              </div>
            </div>

            {/* Custom Interactive Settings Dial keys */}
            <div className="grid grid-cols-3 gap-3 justify-items-center mb-4">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border border-zinc-800 cursor-pointer ${
                  isMuted ? "bg-red-500 text-white border-red-500" : "bg-zinc-900 text-zinc-300 hover:bg-zinc-850"
                }`}
              >
                <MicOff className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => alert("DTMF Signal dial tones: Joboy Active")}
                className="w-12 h-12 rounded-full bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 flex items-center justify-center cursor-pointer text-xs font-bold"
              >
                Keypad
              </button>
              <button
                type="button"
                onClick={() => setIsSpeaker(!isSpeaker)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border border-zinc-800 cursor-pointer ${
                  isSpeaker ? "bg-sky-500 text-white border-sky-500" : "bg-zinc-900 text-zinc-300 hover:bg-zinc-850"
                }`}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Disconnect red circle dial */}
            <div className="flex justify-center pb-4">
              <button
                type="button"
                onClick={() => setShowCallSimulator(false)}
                className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-700 flex items-center justify-center text-white active:scale-95 duration-100 shadow-lg border-none cursor-pointer"
                aria-label="Hang up call"
              >
                <PhoneOff className="w-6 h-6 text-white text-center" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- DYNAMIC TAX INVOICE OVERLAY ----------------- */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-2xl text-slate-900 w-full max-w-sm space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-100">
              <div className="text-left">
                <span className="text-[9px] font-black uppercase text-sky-600 tracking-widest font-mono">Joboy Invoice</span>
                <h4 className="text-sm font-bold text-slate-800 tracking-tight">TAX INVOICE</h4>
              </div>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Invoice Meta */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-500 pt-1">
              <div>
                <p>INVOICE NO: <strong className="text-slate-700">#INV-JB{order.id.replace("JO-", "")}</strong></p>
                <p>DATE: <strong className="text-slate-700">{new Date().toLocaleDateString()}</strong></p>
              </div>
              <div className="text-right">
                <p>CLIENT: <strong className="text-slate-700">{order.clientName}</strong></p>
                <p>ZIP: <strong className="text-slate-700">Kochi, Kerala</strong></p>
              </div>
            </div>

            {/* Bill Entries List */}
            <div className="border border-zinc-150 rounded-xl p-3 bg-zinc-50/50 space-y-2.5">
              <div className="flex justify-between text-xs pb-1.5 border-b border-zinc-200/60 font-bold text-zinc-400">
                <span>ITEM DESCRIPTION</span>
                <span>AMOUNT</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Inspection & Visit Fee</span>
                <span>₹{order.inspectionFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Material Cost Split</span>
                <span>₹{order.materialCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Work Tax Charges (GST 18%)</span>
                <span>₹{order.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-dashed border-zinc-200 pt-2 flex justify-between items-baseline font-bold text-sm">
                <span className="text-slate-800">Grand Total Payable</span>
                <span className="text-sky-600 text-semibold">₹{order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Status Stamp */}
            <div className="flex justify-between items-center py-2 px-3.5 rounded-xl border border-zinc-100 bg-zinc-50">
              <span className="text-xs font-bold text-zinc-500">PAYMENT STATUS</span>
              <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                isCompleted || invoicePaid
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-rose-50 text-rose-600 border border-rose-200 animate-pulse"
              }`}>
                {isCompleted || invoicePaid ? "PAID & SETTLED" : "UNPAID / COD"}
              </span>
            </div>

            {/* User Signature placeholder */}
            <div className="pt-2 text-center">
              <div className="border border-dashed border-zinc-300 rounded-lg p-3 bg-zinc-50 relative h-16 flex items-center justify-center">
                {isCompleted || invoicePaid ? (
                  <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase rotate-[-3deg] tracking-wider border border-emerald-500/30 px-2.5 py-0.5 rounded-md">
                    Verified Signature • Joboy Digital Pay
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-zinc-400 italic">
                    Customer signature required on completion
                  </span>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-2.5 pt-1">
              {!(isCompleted || invoicePaid) && (
                <button
                  onClick={() => {
                    setInvoicePaid(true);
                    alert("Invoice marked as PAID! Underwritten via Cash-On-Delivery transaction.");
                  }}
                  className="w-full bg-[#0ea5e9] text-white font-extrabold text-xs py-3 rounded-xl hover:bg-sky-600 cursor-pointer border-none text-center"
                >
                  Mark Cash Received
                </button>
              )}
              <button
                onClick={() => {
                  alert("Invoice PDF download initiated. Sent digital receipt copies to customer via SMS.");
                }}
                className={`text-xs font-bold py-3 rounded-xl cursor-pointer text-center border ${
                  isCompleted || invoicePaid
                    ? "w-full bg-slate-900 border-slate-950 text-white hover:bg-slate-800"
                    : "w-1/2 bg-white border-zinc-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Send Receipt SMS
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
