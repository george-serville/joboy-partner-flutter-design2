/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Phone, Lock, Eye, EyeOff, Globe, Shield, CreditCard, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { Screen } from "../types";

interface LoginScreenProps {
  onNavigate: (screen: Screen) => void;
  onLoginSuccess: (phone: string) => void;
}

export default function LoginScreen({ onNavigate, onLoginSuccess }: LoginScreenProps) {
  const [country, setCountry] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("9746829891");
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      setErrorMessage("Please enter your phone number");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    // Simulate login loading delay
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(phoneNumber);
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-full bg-background text-on-surface">
      {/* Header Section */}
      <div className="relative h-60 w-full bg-linear-to-b from-primary to-background flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background Imagery Mock / Grayscale contrast */}
        <div className="absolute inset-0 opacity-15 mix-blend-overlay">
          <img
            className="w-full h-full object-cover grayscale brightness-50"
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200"
            alt="Handyman service worker"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="z-10 text-center space-y-1 mt-4">
          <h1 className="text-2xl font-bold font-headline text-white tracking-wide drop-shadow-sm">
            JOBOY PARTNER
          </h1>
          <p className="text-xs text-blue-100 opacity-95 uppercase tracking-widest font-medium">
            Professional Service Network
          </p>
        </div>
      </div>

      {/* Main Content Card container */}
      <div className="px-4 -mt-10 z-20 flex-grow">
        <div className="bg-surface-container-lowest rounded-xl shadow-lg p-5 max-w-md mx-auto border border-outline-variant/10">
          <div className="mb-6">
            <h2 className="text-xl font-bold font-headline text-primary">Login</h2>
            <p className="text-sm text-on-surface-variant font-medium mt-0.5">
              Please sign in to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {errorMessage && (
              <div className="text-xs text-error bg-error-container/20 border border-error/20 p-2.5 rounded-lg text-center font-medium">
                {errorMessage}
              </div>
            )}

            {/* Country Selection */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-on-surface-variant/85 ml-1 uppercase tracking-wider">
                Country
              </label>
              <div className="relative flex items-center bg-white border border-outline-variant rounded-lg px-3.5 py-2.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <Globe className="text-primary w-5 h-5 mr-3 shrink-0" />
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none text-sm font-medium pr-8 appearance-none cursor-pointer text-on-surface rounded-none"
                >
                  <option value="+91">India (+91)</option>
                  <option value="+971">United Arab Emirates (+971)</option>
                  <option value="+44">United Kingdom (+44)</option>
                  <option value="+1">Canada (+1)</option>
                </select>
                <ChevronDown className="text-outline w-4 h-4 absolute right-4 pointer-events-none" />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-on-surface-variant/85 ml-1 uppercase tracking-wider">
                Phone Number
              </label>
              <div className="relative flex items-center bg-white border border-outline-variant rounded-lg px-3.5 py-2.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <span className="text-outline text-sm font-semibold mr-2 shrink-0 border-r border-outline-variant pr-2">
                  {country}
                </span>
                <Phone className="text-outline w-4 h-4 mr-2 shrink-0" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-transparent border-none text-sm focus:outline-none"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="block text-xs font-bold text-on-surface-variant/85 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert("Please sign in using the prefilled mock credentials or enter any password.")}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative flex items-center bg-white border border-outline-variant rounded-lg px-3.5 py-2.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <Lock className="text-outline w-5 h-5 mr-3 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-none text-sm pr-10 focus:outline-none"
                  placeholder="Password (min 6 characters)"
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

            {/* Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white font-bold text-sm py-3.5 rounded-lg shadow-md hover:bg-primary/95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    SIGNING IN...
                  </>
                ) : (
                  <>
                    LOGIN
                    <svg
                      className="w-4.5 h-4.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Mock Login Notice */}
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setPhoneNumber("9746829891");
                setPassword("12345678");
                onLoginSuccess("9746829891");
              }}
              className="text-[11px] font-bold text-secondary bg-secondary-container/10 px-3 py-1.5 rounded-full border border-secondary/15 hover:bg-secondary-container/20 transition-all font-mono inline-block duration-100"
            >
              ⚡ Click for Guest Auto-Login
            </button>
          </div>

          {/* Bottom Action */}
          <div className="mt-5 text-center">
            <p className="text-xs text-on-surface-variant font-medium">
              Don't have an account?{" "}
              <button
                onClick={() => onNavigate(Screen.REGISTER)}
                className="text-primary font-bold hover:underline ml-1"
              >
                Register Now
              </button>
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 max-w-md mx-auto grid grid-cols-2 gap-3.5">
          <div className="bg-surface-container-low p-2.5 rounded-lg flex items-center gap-2.5 border border-outline-variant/30">
            <div className="bg-primary/10 p-1.5 rounded-full text-primary">
              <Shield className="w-4 h-4" />
            </div>
            <span className="text-xs text-on-surface-variant font-semibold leading-tight">
              Verified Partners
            </span>
          </div>
          <div className="bg-surface-container-low p-2.5 rounded-lg flex items-center gap-2.5 border border-outline-variant/30">
            <div className="bg-secondary/10 p-1.5 rounded-full text-secondary">
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="text-xs text-on-surface-variant font-semibold leading-tight">
              Fast Payouts
            </span>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <footer className="mt-auto py-5 px-4 text-center border-t border-outline-variant/10 bg-surface-container-low/50">
        <p className="text-[11px] text-outline font-medium">
          © 2024 Joboy Services Private Ltd. All rights reserved.
        </p>
        <div className="flex justify-center gap-3 mt-1.5">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Terms of service are standard for Joboy service providers.");
            }}
            className="text-[11px] text-on-surface-variant font-semibold hover:text-primary transition-colors"
          >
            Terms
          </a>
          <span className="text-outline-variant">•</span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Privacy policies are secured end-to-end.");
            }}
            className="text-[11px] text-on-surface-variant font-semibold hover:text-primary transition-colors"
          >
            Privacy
          </a>
        </div>
      </footer>
    </div>
  );
}
