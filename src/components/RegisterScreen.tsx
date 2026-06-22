/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff, Wrench, ArrowRight, HelpCircle } from "lucide-react";
import { Screen } from "../types";

interface RegisterScreenProps {
  onNavigate: (screen: Screen) => void;
  onRegisterSuccess: (name: string, category: string) => void;
}

export default function RegisterScreen({ onNavigate, onRegisterSuccess }: RegisterScreenProps) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname.trim() || !email.trim() || !phone.trim() || !category || !password.trim()) {
      setErrorMsg("All fields are required");
      return;
    }
    if (!agreeTerms) {
      setErrorMsg("You must accept the terms & conditions");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    setTimeout(() => {
      setLoading(false);
      onRegisterSuccess(fullname, category);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-full bg-background text-on-surface">
      {/* Sticky App Header */}
      <header className="sticky top-0 bg-gradient-to-b from-primary to-primary/95 text-white z-40 px-4 py-3 h-20 shadow-sm flex items-center justify-between">
        <div className="flex flex-col justify-center">
          <h1 className="text-xl font-bold font-headline tracking-wide">JOBOY PARTNER</h1>
          <p className="text-[11px] text-blue-100/90 font-medium">Service Professional Portal</p>
        </div>
        <button
          type="button"
          onClick={() => alert("Please join our partner network to get high quality job requests near you!")}
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/15 transition-all text-white active:scale-95 cursor-pointer"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-4">
        <div className="bg-surface-container-lowest rounded-xl shadow-lg p-5 border border-outline-variant/10 max-w-md mx-auto">
          <div className="mb-5 text-center md:text-left">
            <h2 className="text-xl font-bold font-headline text-primary">Create Account</h2>
            <p className="text-xs text-on-surface-variant font-medium mt-0.5">
              Join our partner network and start earning.
            </p>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {errorMsg && (
              <div className="text-xs bg-error-container/20 text-error border border-error/25 p-2.5 rounded-lg text-center font-medium">
                {errorMsg}
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-on-surface-variant/85 ml-1 uppercase" htmlFor="fullname">
                Full Name
              </label>
              <div className="relative flex items-center bg-white border border-outline-variant rounded-lg px-3.5 py-2.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <User className="text-outline w-4.5 h-4.5 mr-2.5 shrink-0" />
                <input
                  id="fullname"
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full bg-transparent border-none text-sm focus:outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-on-surface-variant/85 ml-1 uppercase" htmlFor="email">
                Email Address
              </label>
              <div className="relative flex items-center bg-white border border-outline-variant rounded-lg px-3.5 py-2.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <Mail className="text-outline w-4.5 h-4.5 mr-2.5 shrink-0" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none text-sm focus:outline-none"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-on-surface-variant/85 ml-1 uppercase">
                Phone Number
              </label>
              <div className="flex gap-2">
                <div className="w-20 bg-surface-container border border-outline-variant rounded-lg flex items-center justify-center font-semibold text-sm select-none text-on-surface-variant">
                  +91
                </div>
                <div className="relative flex-grow flex items-center bg-white border border-outline-variant rounded-lg px-3.5 py-2.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                  <Phone className="text-outline w-4.5 h-4.5 mr-2.5 shrink-0" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent border-none text-sm focus:outline-none"
                    placeholder="9876543210"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Service Category */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-on-surface-variant/85 ml-1 uppercase" htmlFor="category">
                Service Category
              </label>
              <div className="relative flex items-center bg-white border border-outline-variant rounded-lg px-3.5 py-2.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <Wrench className="text-outline w-4.5 h-4.5 mr-2.5 shrink-0" />
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-transparent border-none text-sm focus:outline-none appearance-none cursor-pointer text-on-surface rounded-none"
                  required
                >
                  <option value="" disabled>Select your expertise</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Home Cleaning">Home Cleaning</option>
                  <option value="AC Repair & Service">AC Repair &amp; Service</option>
                  <option value="Others">Others</option>
                </select>
                <div className="absolute right-3.5 pointer-events-none text-outline">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-on-surface-variant/85 ml-1 uppercase" htmlFor="password">
                Password
              </label>
              <div className="relative flex items-center bg-white border border-outline-variant rounded-lg px-3.5 py-2.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <Lock className="text-outline w-4.5 h-4.5 mr-2.5 shrink-0" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-none text-sm focus:outline-none pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-outline hover:text-primary transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-2.5 pt-2">
              <input
                id="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-primary cursor-pointer text-primary border-outline-variant focus:ring-primary rounded"
              />
              <label htmlFor="terms" className="text-[11px] text-on-surface-variant leading-tight font-medium cursor-pointer select-none">
                I agree to the <a href="#" onClick={(e) => { e.preventDefault(); alert("Terms and conditions details"); }} className="text-primary font-bold hover:underline">Terms &amp; Conditions</a> and <a href="#" onClick={(e) => { e.preventDefault(); alert("Privacy policies parameters"); }} className="text-primary font-bold hover:underline">Privacy Policy</a> of Joboy Partner network.
              </label>
            </div>

            {/* Signup Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-primary text-white font-bold text-sm rounded-lg shadow-md hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    CREATING ACCOUNT...
                  </>
                ) : (
                  <>
                    SIGN UP
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Login Switcher */}
          <div className="mt-6 text-center">
            <p className="text-xs text-on-surface-variant font-medium">
              Already have an account?{" "}
              <button
                onClick={() => onNavigate(Screen.LOGIN)}
                className="text-primary font-bold hover:underline ml-1"
              >
                Login
              </button>
            </p>
          </div>
        </div>

        {/* Decorative Perks */}
        <div className="max-w-md mx-auto mt-6 grid grid-cols-2 gap-3 pb-4">
          <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 flex flex-col items-center text-center">
            <div className="w-8.5 h-8.5 rounded-full bg-secondary-container/10 text-on-secondary-container flex items-center justify-center mb-1.5 shadow-xs">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xs font-bold text-on-surface">Daily Payouts</p>
          </div>
          <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 flex flex-col items-center text-center">
            <div className="w-8.5 h-8.5 rounded-full bg-primary-fixed-dim/20 text-primary flex items-center justify-center mb-1.5 shadow-xs">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.954 11.954 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="text-xs font-bold text-on-surface">Verified Leads</p>
          </div>
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="mt-auto py-4 px-4 border-t border-outline-variant/20 flex flex-col items-center gap-1 bg-surface-container-low/50">
        <span className="text-[10px] font-bold uppercase tracking-wider text-outline opacity-80 decoration-dotted">
          Secure • Professional • Trusted
        </span>
        <p className="text-[10px] text-outline font-semibold">© 2024 Joboy Service Solutions Pvt Ltd</p>
      </footer>
    </div>
  );
}
