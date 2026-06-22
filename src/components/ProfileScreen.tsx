/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  ArrowLeft,
  Bell,
  Phone,
  Mail,
  PlusCircle,
  MapPin,
  Wrench,
  ShieldCheck,
  Eye,
  FileText,
  ChevronRight,
  ChevronDown,
  Star,
  Settings,
  PhoneCall,
  LogOut,
  HelpCircle,
  Menu,
} from "lucide-react";
import { Screen, PartnerProfile } from "../types";

interface ProfileScreenProps {
  profile: PartnerProfile;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  onUpdateSubscription: (amount: number) => void;
  onUpdateLocation: (newLocation: string) => void;
  onOpenMenu?: () => void;
}

export default function ProfileScreen({
  profile,
  onNavigate,
  onLogout,
  onUpdateSubscription,
  onUpdateLocation,
  onOpenMenu,
}: ProfileScreenProps) {
  const [reportsOpen, setReportsOpen] = useState(false);
  const [showAadhaar, setShowAadhaar] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionInput, setSubscriptionInput] = useState("500");

  const handleSubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(subscriptionInput);
    if (isNaN(amt) || amt <= 0) return;
    onUpdateSubscription(amt);
    setIsSubscribing(false);
    alert(`₹${amt} Subscription added successfully!`);
  };

  const handleUpdateLoc = () => {
    const fresh = prompt("Enter your current location / city coordinate:", profile.currentLocationName);
    if (fresh && fresh.trim()) {
      onUpdateLocation(fresh.trim());
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-background text-on-surface pb-24 relative">
      {/* Top Header App Bar */}
      <header className="sticky top-0 bg-linear-to-b from-primary to-primary-container text-white z-40 px-4 h-16 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMenu}
            className="hover:bg-white/10 p-1.5 rounded-full transition-transform active:scale-95 cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5.5 h-5.5 text-on-surface" />
          </button>
          <h1 className="text-lg font-bold font-headline">Profile</h1>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => alert("Ready. No unread announcements.")}
            className="hover:bg-white/10 p-1.5 rounded-full transition-all relative cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
          </button>
        </div>
      </header>

      {/* Blue Gradient Header Background */}
      <div className="relative bg-gradient-to-b from-primary-container via-primary-container/20 to-background/5 pt-6 pb-4 px-4 flex flex-col items-center">
        {/* Profile Avatar Frame with Badge */}
        <div className="relative flex items-center justify-center gap-4 mb-3">
          {/* Main User Pic */}
          <div className="relative">
            <div className="w-22 h-22 rounded-full border-3 border-white shadow-md overflow-hidden bg-surface-container">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                alt="Khan Professional Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Rating Star Badge Overlay as in image (5.0 ★) */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#006e1c] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border border-white shadow-xs">
              <span>{profile.rating.toFixed(1)}</span>
              <Star className="w-2 h-2 fill-white text-white shrink-0" />
            </div>
          </div>

          {/* Placeholder person icon adjacent (mock overlay layout reference in images) */}
          <div className="w-16 h-16 rounded-full border-2 border-white/50 bg-outline-variant/20 flex items-center justify-center text-outline-variant">
            <svg
              className="w-10 h-10 opacity-40"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.67-5-3-8-3z" />
            </svg>
          </div>
        </div>

        {/* Basic Provider Info */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold font-headline text-on-background">{profile.name}</h2>
          <div className="flex flex-col items-center gap-1 text-xs text-on-surface-variant font-medium">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-primary" />
              {profile.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-primary" />
              {profile.email}
            </span>
          </div>
        </div>
      </div>

      {/* Main Stats Block Area */}
      <div className="px-4 space-y-4">
        {/* Points & Subscription metrics grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl border border-outline-variant/30 p-3.5 text-center shadow-xs">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
              Reward Points
            </p>
            <p className="text-lg font-extrabold text-[#006399] mt-0.5">{profile.rewardPoints}</p>
          </div>
          <div className="bg-white rounded-xl border border-outline-variant/30 p-3.5 text-center shadow-xs">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
              Subscription
            </p>
            <p className="text-lg font-extrabold text-[#006e1c] mt-0.5">
              ₹{profile.subscriptionAmount}
            </p>
          </div>
        </div>

        {/* Add Subscription Action Button */}
        <button
          onClick={() => setIsSubscribing(true)}
          className="w-full bg-primary text-white text-xs font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          Add Subscription
        </button>

        {/* Covered Cities Section */}
        <div className="bg-white rounded-xl border border-outline-variant/30 p-4 space-y-2.5 shadow-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4.5 h-4.5 text-primary" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface/90">
              Covered Cities
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.coveredCities.map((city, idx) => (
              <span
                key={idx}
                className="bg-surface-container-low border border-outline-variant/50 text-[11px] font-bold text-on-surface-variant px-3 py-1.5 rounded-full"
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Offered Services Section */}
        <div className="bg-white rounded-xl border border-outline-variant/30 p-4 space-y-2.5 shadow-xs">
          <div className="flex items-center gap-2">
            <Wrench className="w-4.5 h-4.5 text-primary" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface/90">
              Offered Services
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.offeredServices.map((service, idx) => (
              <span
                key={idx}
                className="bg-surface-container-low border border-outline-variant/50 text-[11px] font-bold text-on-surface-variant px-3 py-1.5 rounded"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Current Location Section */}
        <div className="bg-white rounded-xl border border-outline-variant/30 overflow-hidden shadow-xs">
          <div className="p-3.5 flex justify-between items-center border-b border-light border-outline-variant/20">
            <div className="flex items-center gap-2">
              <MapPin className="w-4.5 h-4.5 text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface/90">
                Current Location
              </h3>
            </div>
            <button
              onClick={handleUpdateLoc}
              className="text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              Update
            </button>
          </div>
          {/* Custom mock map block matching design */}
          <div className="relative h-28 bg-slate-200">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=500&q=80"
              alt="location map details blueprint"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Superimposed Map Pin and center marker info */}
            <div className="absolute inset-x-2 bottom-2 bg-white/95 backdrop-blur-xs rounded p-2 flex items-center gap-2 border border-outline-variant/20 shadow-xs">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MapPin className="w-3.5 h-3.5 fill-primary" />
              </div>
              <span className="text-[10px] text-on-surface font-extrabold truncate">
                {profile.currentLocationName}
              </span>
            </div>
          </div>
        </div>

        {/* Document Details (Aadhaar Verified Card) */}
        <div className="bg-white rounded-xl border border-outline-variant/30 p-4 space-y-3 shadow-xs">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText className="w-4.5 h-4.5 text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface/90">
                Document Details
              </h3>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-secondary uppercase bg-secondary-container/10 px-2 py-0.5 rounded border border-secondary/15">
              <ShieldCheck className="w-3.5 h-3.5 text-secondary shrink-0" />
              Verified
            </div>
          </div>

          <div className="bg-surface-container-low rounded-lg p-3 flex justify-between items-center border border-outline-variant/20">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg text-primary">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">Aadhaar Card</p>
                <p className="text-[11px] text-on-surface-variant font-mono mt-0.5">
                  {showAadhaar ? "4527-9912-1234" : profile.aadhaarNumber}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAadhaar(!showAadhaar)}
              className="text-outline hover:text-primary transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Accordion Links List */}
        <div className="bg-white rounded-xl border border-outline-variant/30 overflow-hidden shadow-xs divide-y divide-outline-variant/20 mb-4">
          {/* Reports Accordion */}
          <div>
            <button
              onClick={() => setReportsOpen(!reportsOpen)}
              className="w-full px-4 py-3.5 flex justify-between items-center hover:bg-surface-container-low/20 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold text-on-surface">Reports</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-outline transition-transform duration-200 ${
                  reportsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {reportsOpen && (
              <div className="px-4 pb-3 pt-1 bg-surface-container-low/30 border-t border-outline-variant/10 space-y-1.5 transition-all">
                <button
                  onClick={() => onNavigate(Screen.EARNINGS)}
                  className="w-full text-left py-1.5 text-xs font-semibold text-primary hover:underline flex items-center justify-between"
                >
                  <span>📈 Earnings &amp; Monthly Trends Report</span>
                  <ChevronRight className="w-3.5 h-3.5 text-primary" />
                </button>
                <div className="text-[10px] text-outline font-medium">
                  Generating automated weekly reports based on task statuses.
                </div>
              </div>
            )}
          </div>

          {/* Terms & Conditions */}
          <button
            onClick={() => onNavigate(Screen.EARNINGS)}
            className="w-full px-4 py-3.5 flex justify-between items-center hover:bg-surface-container-low/20 transition-all text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-xs font-bold text-on-surface">My Earnings &amp; Invoices</span>
            </div>
            <ChevronRight className="w-4 h-4 text-outline" />
          </button>

          {/* Rate Joboy */}
          <button
            onClick={() => {
              alert("Thank you for positive rating! Our developers are always polishing the app.");
            }}
            className="w-full px-4 py-3.5 flex justify-between items-center hover:bg-surface-container-low/20 transition-all text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-primary" />
              <span className="text-xs font-bold text-on-surface">Rate Joboy</span>
            </div>
            <ChevronRight className="w-4 h-4 text-outline" />
          </button>

          {/* Call Us */}
          <button
            onClick={() => {
              alert("Calling Joboy Partner Support (mock line: +91 1800 22014) connected.");
            }}
            className="w-full px-4 py-3.5 flex justify-between items-center hover:bg-surface-container-low/20 transition-all text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-5 h-5 text-primary" />
              <span className="text-xs font-bold text-on-surface">Call Us</span>
            </div>
            <ChevronRight className="w-4 h-4 text-outline" />
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              if (confirm("Are you sure you want to log out?")) {
                onLogout();
              }
            }}
            className="w-full px-4 py-3.5 flex justify-between items-center hover:bg-error-container/10 transition-all text-left text-error cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-error" />
              <span className="text-xs font-bold text-error">Logout</span>
            </div>
            <ChevronRight className="w-4 h-4 text-error" />
          </button>
        </div>
      </div>

      {/* Subscription Top-up Dialog Modal */}
      {isSubscribing && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-5 border border-outline-variant/30 shadow-lg text-on-surface w-full max-w-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-primary uppercase tracking-wide">
                Add Subscription Balance
              </h3>
              <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">
                Fund your Joboy partner active account to accept high priority orders.
              </p>
            </div>
            <form onSubmit={handleSubSubmit} className="space-y-3">
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-outline">
                  ₹
                </span>
                <input
                  type="number"
                  value={subscriptionInput}
                  onChange={(e) => setSubscriptionInput(e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg pl-8 pr-4 py-2.5 text-sm font-bold focus:outline-none focus:border-primary"
                  placeholder="Enter amount (e.g. 500)"
                  min="100"
                  step="50"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubscribing(false)}
                  className="w-1/2 cursor-pointer bg-surface-container font-bold text-xs py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 cursor-pointer bg-primary text-white font-bold text-xs py-2 rounded-lg hover:opacity-90 transition-all"
                >
                  Confirm Payout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
