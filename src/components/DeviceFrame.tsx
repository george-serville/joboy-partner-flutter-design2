/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Maximize2, Minimize2, RefreshCw, Zap, Landmark, Award } from "lucide-react";

interface DeviceFrameProps {
  children: React.ReactNode;
  onResetData: () => void;
}

export default function DeviceFrame({ children, onResetData }: DeviceFrameProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Live synchronizing Clock in the status bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen glass-viewport flex flex-col md:flex-row items-center justify-center p-0 md:p-6 text-slate-100 overflow-x-hidden font-sans">
      
      {/* Decorative Branding Sidebar Panel - Hidden on small viewports */}
      <section className="hidden lg:flex flex-col max-w-sm w-full shrink-0 mr-8 space-y-6 text-left p-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-fixed-dim px-3 py-1.5 rounded-full border border-primary-container/20 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-primary" /> Active Simulation
          </div>
          <h1 className="text-3xl font-black font-headline text-white tracking-tight leading-none">
            Joboy Partner
          </h1>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            Professional Service Network Applet. Live interactive prototype showing orders, workflow states, and profile statistics.
          </p>
        </div>

        {/* Quick Help guide features */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4.5 space-y-3.5 shadow-sm">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Prototype Features</h4>
          <ul className="space-y-2.5 text-xs text-slate-400 font-semibold">
            <li className="flex items-start gap-2.5">
              <Award className="w-4.5 h-4.5 text-secondary shrink-0" />
              <span>Accepting raw jobs inside <strong className="text-slate-200">New</strong> orders shifts statuses to active instantly.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Zap className="w-4.5 h-4.5 text-amber-500 shrink-0" />
              <span>Start/Complete workflow commands update and generate invoices.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Landmark className="w-4.5 h-4.5 text-primary shrink-0" />
              <span>Earnings withdraw reduces active balances and logs real transactions.</span>
            </li>
          </ul>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onResetData}
            style={{ contentVisibility: "auto" }}
            className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-4 h-4 text-slate-400 animate-hover-spin" />
            Reset State Sandbox
          </button>
        </div>

        <div className="text-[10px] text-slate-500 font-mono text-center">
          Press Ctrl + R or Reset State to clear session cache.
        </div>
      </section>

      {/* Primary Mobile Container Frame casing wrapper */}
      <div className={`relative transition-all duration-300 ${
        isFullscreen 
          ? "w-full min-h-screen md:h-screen md:max-w-none" 
          : "w-full max-w-[420px] h-[860px] md:h-[840px] md:rounded-[40px] md:border-12 md:border-slate-800 md:shadow-2xl md:ring-8 md:ring-slate-900/40"
      } bg-background overflow-hidden flex flex-col`}>
        
        {/* Mock Smartphone Status Bar (Wi-Fi, cellular, clock) - Hidden when fullscreened only */}
        {!isFullscreen && (
          <div className="bg-primary text-white h-7 px-5 flex justify-between items-center text-[10px] font-bold select-none shrink-0 z-50">
            {/* Left side: Time */}
            <span className="font-mono tracking-wider">{currentTime || "10:30 AM"}</span>
            {/* Center: Fake Ear piece or dynamic island pill */}
            <div className="hidden md:block w-24 h-4 bg-slate-900 rounded-full border border-slate-850 absolute left-1/2 -translate-x-1/2 top-1.5" />
            {/* Right side: Signal bars, Wi-Fi, battery status */}
            <div className="flex items-center gap-1.5">
              {/* Cellular Signal Strength icons */}
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 22h20V2z" />
              </svg>
              {/* Wi-Fi symbol */}
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.11 12.4a5 5 0 017 0 M5.6 10a8 8 0 0111.4 0 M3 7.2a12 12 0 0116.7 0" />
              </svg>
              {/* Fake Battery pill filled */}
              <div className="flex items-center gap-0.5 border border-white/80 rounded px-0.5 py-0.2">
                <div className="w-3.5 h-1.5 bg-white rounded-xs" />
                <div className="w-0.5 h-0.5 bg-white rounded-r-xs" />
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Inner Screens content frame */}
        <div className="flex-grow flex flex-col min-h-0 relative overflow-hidden">
          {children}
        </div>

        {/* Simulator controls buttons bottom utility panel - Absolutely positioned floating buttons */}
        <div className="hidden md:flex absolute top-2 right-2 z-50 gap-1 opacity-40 hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 bg-slate-900/80 backdrop-blur-xs hover:bg-slate-950 text-white rounded-full active:scale-90 transition-all cursor-pointer border border-slate-800"
            title={isFullscreen ? "Exit Phone Sandbox" : "Enter Wide Simulator View"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Simulated iOS / Android Home swipe bar indicator at bottom - Hidden when fullscreened */}
        {!isFullscreen && (
          <div className="absolute bottom-1 inset-x-0 h-1 flex justify-center pointer-events-none z-50">
            <div className="w-28 h-1 bg-slate-400/50 rounded-full" />
          </div>
        )}
      </div>

      {/* Help Instructions Widget panel on screens where sidebar is hidden */}
      <div className="block lg:hidden w-full max-w-sm px-4 py-8 space-y-4">
        <button
          onClick={onResetData}
          className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer shadow-xs"
        >
          <RefreshCw className="w-4 h-4 text-slate-400" />
          Reset State Sandbox
        </button>
      </div>
    </div>
  );
}
