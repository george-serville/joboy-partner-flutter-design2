/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowLeft, Bell, Map, Phone, Clock, Badge, CheckCircle, Navigation, ExternalLink, CalendarDays, Menu } from "lucide-react";
import { Screen, Order, OrderStatus } from "../types";

interface OrdersScreenProps {
  orders: Order[];
  onNavigate: (screen: Screen) => void;
  onSelectOrderDetail: (orderId: string) => void;
  onAcceptOrder: (orderId: string) => void;
  onDeclineOrder: (orderId: string) => void;
  onOpenMenu?: () => void;
}

export default function OrdersScreen({
  orders,
  onNavigate,
  onSelectOrderDetail,
  onAcceptOrder,
  onDeclineOrder,
  onOpenMenu,
}: OrdersScreenProps) {
  const [activeTab, setActiveTab] = useState<"new" | "active" | "completed">("new");

  // Filter orders by tab
  const newOrders = orders.filter((o) => o.status === OrderStatus.NEW);
  const activeOrders = orders.filter((o) => o.status === OrderStatus.ACTIVE || o.status === OrderStatus.IN_PROGRESS);
  const completedOrders = orders.filter((o) => o.status === OrderStatus.COMPLETED);

  const getServiceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "ac repair":
      case "ac deep cleaning":
        return (
          <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 border border-blue-100 shadow-xs">
            {/* Ice / AC symbol */}
            <svg className="w-6.5 h-6.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18m-3-6L6 18M6 6l12 12" />
            </svg>
          </div>
        );
      case "electrical installation":
      case "electrical repairs":
        return (
          <div className="w-11 h-11 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100 shadow-xs">
            {/* Lighting bolt */}
            <svg className="w-6.5 h-6.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        );
      case "deep house cleaning":
        return (
          <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-100 shadow-xs">
            {/* Cleaning spray / Sparkles */}
            <svg className="w-6.5 h-6.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.05 15.122A2 2 0 003 17.114V21h18V17.07a2 2 0 00-1.572-1.642z M12 3v4M12 7l-2-2M12 7l2-2" />
            </svg>
          </div>
        );
      case "plumbing service":
      default:
        return (
          <div className="w-11 h-11 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 border border-cyan-100 shadow-xs">
            {/* Pipe / Wrench outline */}
            <svg className="w-6.5 h-6.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-background text-on-surface pb-24">
      {/* Top App Bar Header */}
      <header className="sticky top-0 bg-gradient-to-b from-primary to-primary-container text-white z-40 px-4 h-16 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMenu}
            className="hover:bg-white/10 p-1.5 rounded-full transition-transform active:scale-95 cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5.5 h-5.5 text-on-surface" />
          </button>
          <h1 className="text-lg font-bold font-headline">My Orders</h1>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => alert("Ready. Status is normal.")}
            className="hover:bg-white/10 p-2 rounded-full relative cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            {newOrders.length > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-[#ba1a1a] text-[9px] text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {newOrders.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Tabs navigation panel */}
      <section className="sticky top-16 bg-background/95 backdrop-blur-md z-35 py-1 z-30">
        <div className="flex border-b border-outline-variant/30 text-center text-xs font-bold leading-none tracking-wider uppercase">
          <button
            onClick={() => setActiveTab("new")}
            className={`flex-1 py-4 border-b-2.5 transition-all cursor-pointer ${
              activeTab === "new"
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-primary"
            }`}
          >
            New ({newOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 py-4 border-b-2.5 transition-all cursor-pointer ${
              activeTab === "active"
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-primary"
            }`}
          >
            Active ({activeOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`flex-1 py-4 border-b-2.5 transition-all cursor-pointer ${
              activeTab === "completed"
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-primary"
            }`}
          >
            Completed ({completedOrders.length})
          </button>
        </div>
      </section>

      {/* Main Container Orders List */}
      <main className="flex-grow p-4 space-y-4">
        {/* NEW ORDERS TAB VIEW */}
        {activeTab === "new" && (
          <div className="space-y-4">
            {newOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center opacity-60 space-y-3">
                <CheckCircle className="w-12 h-12 text-[#006e1c]" />
                <p className="text-sm font-semibold text-on-surface-variant">
                  No new pending orders!
                </p>
                <p className="text-xs text-outline max-w-xs">
                  We will notify you immediately when active jobs match your location and skills.
                </p>
              </div>
            ) : (
              newOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl border border-outline-variant/30 p-4 shadow-xs flex flex-col gap-3.5 hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden"
                  onClick={() => onSelectOrderDetail(order.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-center">
                      {getServiceIcon(order.serviceType)}
                      <div>
                        <h3 className="text-sm font-bold font-headline text-on-surface leading-tight">
                          {order.serviceType}
                        </h3>
                        <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">
                          Booking ID: #{order.id}
                        </p>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-[#006e1c] text-[9px] font-extrabold uppercase px-2 py-1 rounded border border-emerald-200 tracker-tighter shrink-0 select-none">
                      New Order
                    </span>
                  </div>

                  {/* Customer info body items */}
                  <div className="space-y-2 text-xs text-on-surface-variant font-medium">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-outline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeOpacity={0.7} />
                      </svg>
                      <span className="text-on-surface font-semibold">{order.clientName}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-outline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="truncate max-w-[150px]">{order.locationName}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Navigating to Kochi center at range: ${order.distance}.`);
                        }}
                        className="text-primary font-bold text-[11px] flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Map className="w-3.5 h-3.5" /> View Map
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-outline" />
                      <span>{order.timeSlot}</span>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-dashed border-outline-variant/20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeclineOrder(order.id);
                      }}
                      className="cursor-pointer bg-white border border-outline hover:bg-surface-container-low font-bold text-xs py-2.5 rounded-lg text-outline-variant hover:text-on-surface-variant transition-all text-center"
                    >
                      Decline
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAcceptOrder(order.id);
                      }}
                      className="cursor-pointer bg-primary text-white font-bold text-xs py-2.5 rounded-lg hover:opacity-95 transition-all text-center"
                    >
                      Accept Order
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ACTIVE ORDERS TAB VIEW */}
        {activeTab === "active" && (
          <div className="space-y-4">
            {activeOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center opacity-60 space-y-3">
                <svg className="w-12 h-12 text-outline-variant" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-2 4h.01M12 12h.01M12 16h.01" />
                </svg>
                <p className="text-sm font-semibold text-on-surface-variant">
                  No active orders right now
                </p>
                <p className="text-xs text-outline max-w-xs">
                  Go to the 'New' tab and click 'Accept Order' to start working on matching tasks near Kochi.
                </p>
              </div>
            ) : (
              activeOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl border-1.5 border-primary p-4 shadow-sm flex flex-col gap-3.5 hover:shadow-md transition-shadow cursor-pointer relative"
                  onClick={() => onSelectOrderDetail(order.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-center">
                      {getServiceIcon(order.serviceType)}
                      <div>
                        <h3 className="text-sm font-bold font-headline text-on-surface leading-tight">
                          {order.serviceType}
                        </h3>
                        <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">
                          Order ID: #{order.id}
                        </p>
                      </div>
                    </div>
                    <span className={`text-[9px] font-extrabold uppercase px-2V px-2 py-1 rounded border shrink-0 select-none ${
                      order.status === OrderStatus.IN_PROGRESS
                        ? "bg-amber-100 text-amber-700 border-amber-200 animate-pulse"
                        : "bg-primary/10 text-primary border-primary/20"
                    }`}>
                      {order.status === OrderStatus.IN_PROGRESS ? "In Progress" : "Active"}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-on-surface-variant font-medium">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-outline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-on-surface font-semibold">{order.clientName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-outline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span className="truncate">{order.locationName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-outline" />
                      <span className="font-semibold text-primary">{order.timeSlot}</span>
                    </div>
                  </div>

                  <div className="bg-primary-container/10 border border-primary/10 p-2.5 rounded-lg flex items-center justify-between text-xs font-semibold text-primary mt-1">
                    <span>⚡ Ready to start work</span>
                    <button className="flex items-center gap-1 bg-primary text-white text-[10px] px-2 py-1 rounded cursor-pointer">
                      View Details <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* COMPLETED TAB VIEW */}
        {activeTab === "completed" && (
          <div className="space-y-4">
            {completedOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center opacity-60">
                <p className="text-sm font-semibold text-on-surface-variant">
                  No completed history yet
                </p>
              </div>
            ) : (
              completedOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl border border-outline-variant/25 p-4 shadow-xs flex flex-col gap-2 relative opacity-90 hover:opacity-100 transition-all"
                  onClick={() => onSelectOrderDetail(order.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-center">
                      {getServiceIcon(order.serviceType)}
                      <div>
                        <h3 className="text-sm font-bold font-headline text-on-surface/90">
                          {order.serviceType}
                        </h3>
                        <p className="text-[10px] text-outline font-medium">
                          ID: #{order.id}
                        </p>
                      </div>
                    </div>
                    <span className="bg-[#006e1c]/10 text-[#006e1c] text-[9px] font-extrabold px-2 py-1 rounded border border-[#006e1c]/20 select-none">
                      Completed
                    </span>
                  </div>

                  <div className="text-xs text-on-surface font-semibold flex justify-between pt-1">
                    <span>Client: {order.clientName}</span>
                    <span className="text-secondary font-bold">₹{order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
