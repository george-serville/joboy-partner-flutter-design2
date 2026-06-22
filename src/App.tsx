/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  initialOrders, 
  initialTransactions, 
  initialProfile 
} from "./mockData";
import { 
  Screen, 
  OrderStatus, 
  Order, 
  Transaction, 
  PartnerProfile 
} from "./types";

import DeviceFrame from "./components/DeviceFrame";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import ProfileScreen from "./components/ProfileScreen";
import OrdersScreen from "./components/OrdersScreen";
import OrderDetailScreen from "./components/OrderDetailScreen";
import EarningsScreen from "./components/EarningsScreen";
import DashboardScreen from "./components/DashboardScreen";
import PrivacyPolicyScreen from "./components/PrivacyPolicyScreen";
import TermsOfUseScreen from "./components/TermsOfUseScreen";

import { Home, History, User, Menu, X, ClipboardList, LayoutDashboard, ShieldCheck, Scale, Trophy, Wallet, Bell } from "lucide-react";

export default function App() {
  const [screen, setScreen] = useState<Screen>(Screen.LOGIN);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Core synchronized state sheets
  const [orders, setOrders] = useState<Order[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [profile, setProfile] = useState<PartnerProfile | null>(null);
  const [totalEarnings, setTotalEarnings] = useState(48250.0);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("JO-12345");
  const [ordersTab, setOrdersTab] = useState<"new" | "active" | "completed">("new");

  // Notifications central states
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Local storage caching recovery
  useEffect(() => {
    const cachedOrders = localStorage.getItem("joboy_orders");
    const cachedTx = localStorage.getItem("joboy_transactions");
    const cachedProfile = localStorage.getItem("joboy_profile");
    const cachedEarnings = localStorage.getItem("joboy_earnings");
    const cachedScreen = localStorage.getItem("joboy_screen");
    const cachedAuth = localStorage.getItem("joboy_auth");
    const cachedNotif = localStorage.getItem("joboy_notifications");

    if (cachedOrders) {
      setOrders(JSON.parse(cachedOrders));
    } else {
      setOrders(initialOrders);
    }

    if (cachedTx) {
      setTransactions(JSON.parse(cachedTx));
    } else {
      setTransactions(initialTransactions);
    }

    if (cachedProfile) {
      setProfile(JSON.parse(cachedProfile));
    } else {
      setProfile(initialProfile);
    }

    if (cachedEarnings) {
      setTotalEarnings(parseFloat(cachedEarnings));
    } else {
      setTotalEarnings(48250.0);
    }

    if (cachedNotif) {
      setNotifications(JSON.parse(cachedNotif));
    } else {
      setNotifications([
        {
          id: "nt-1",
          title: "Weekly Bonus Tracker",
          message: "🎉 Complete 3 more high priority service jobs this week to qualify for active ₹1,500 incentive bonus payout.",
          time: "10 mins ago",
          read: false,
          type: "bonus"
        },
        {
          id: "nt-2",
          title: "Urgent Booking Alert",
          message: "💼 New emergency Plumbing service request initiated near Kakkanad. Tap to view requirements.",
          time: "1 hour ago",
          read: false,
          type: "job",
          targetScreen: Screen.ORDERS,
          targetTab: "new"
        },
        {
          id: "nt-3",
          title: "Cleared Settlement Success",
          message: "💸 Regular weekly earnings disbursement of ₹4,130 processed successfully to your bank ledger.",
          time: "Yesterday",
          read: true,
          type: "earning",
          targetScreen: Screen.EARNINGS
        }
      ]);
    }

    if (cachedScreen) {
      setScreen(cachedScreen as Screen);
    }

    if (cachedAuth === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Write changes back to localStorage cache dynamically
  const saveState = (
    updatedOrders: Order[],
    updatedTx: Transaction[],
    updatedProfile: PartnerProfile,
    updatedEarnings: number
  ) => {
    localStorage.setItem("joboy_orders", JSON.stringify(updatedOrders));
    localStorage.setItem("joboy_transactions", JSON.stringify(updatedTx));
    localStorage.setItem("joboy_profile", JSON.stringify(updatedProfile));
    localStorage.setItem("joboy_earnings", updatedEarnings.toString());
  };

  const saveNotificationsState = (notifs: any[]) => {
    setNotifications(notifs);
    localStorage.setItem("joboy_notifications", JSON.stringify(notifs));
  };

  const addNotification = (
    title: string,
    message: string,
    type: "job" | "bonus" | "info" | "earning",
    targetScreen?: Screen,
    targetTab?: string,
    targetParams?: string
  ) => {
    const newNotif = {
      id: "nt-" + Date.now() + Math.floor(Math.random() * 1000),
      title,
      message,
      time: "Just now",
      read: false,
      type,
      targetScreen,
      targetTab,
      targetParams
    };
    saveNotificationsState([newNotif, ...notifications]);
  };

  // Nav routing handler
  const handleNavigate = (target: Screen, tab?: "new" | "active" | "completed") => {
    setScreen(target);
    localStorage.setItem("joboy_screen", target);
    if (tab) {
      setOrdersTab(tab);
    }
  };

  // Login session verification
  const handleLoginSuccess = (phone: string) => {
    setIsLoggedIn(true);
    localStorage.setItem("joboy_auth", "true");
    
    // Auto restore customized username if registered earlier
    if (profile) {
      const freshProf = { ...profile, phone: phone.includes("+91") ? phone : `+91 - ${phone}` };
      setProfile(freshProf);
      saveState(orders, transactions, freshProf, totalEarnings);
    }

    addNotification("Welcome Back!", "Logged into Joboy partner terminal. Your network status is safe & operational.", "info", Screen.DASHBOARD);
    handleNavigate(Screen.DASHBOARD);
  };

  // Register state handler
  const handleRegisterSuccess = (name: string, category: string) => {
    if (profile) {
      const freshProf = {
        ...profile,
        name: name,
        offeredServices: [category, ...profile.offeredServices.filter((s) => s !== category)],
      };
      setProfile(freshProf);
      localStorage.setItem("joboy_profile", JSON.stringify(freshProf));
    }
    alert(`Account created successfully for ${name}! Please login with your details.`);
    handleNavigate(Screen.LOGIN);
  };

  // Shift order state to ACTIVE
  const handleAcceptOrder = (orderId: string) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return { ...o, status: OrderStatus.ACTIVE };
      }
      return o;
    });
    setOrders(updated);
    if (profile) saveState(updated, transactions, profile, totalEarnings);
    
    addNotification(
      "Job Assignment Accepted",
      `💼 Accepted booking #${orderId} (${targetOrder?.serviceType || "Inspection"}). Tap to view address details and map route.`,
      "job",
      Screen.ORDER_DETAIL,
      undefined,
      orderId
    );
    alert(`Order accepted! It is now listed inside the 'Active' queue.`);
  };

  // Filters out declined order
  const handleDeclineOrder = (orderId: string) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    const updated = orders.filter((o) => o.id !== orderId);
    setOrders(updated);
    if (profile) saveState(updated, transactions, profile, totalEarnings);
    
    addNotification(
      "Job Declined",
      `⚠️ You declined service call #${orderId} for ${targetOrder?.clientName || "Client"}.`,
      "info",
      Screen.ORDERS,
      "new"
    );
  };

  // Starts active job work tracker
  const handleStartWork = (orderId: string) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return { ...o, status: OrderStatus.IN_PROGRESS };
      }
      return o;
    });
    setOrders(updated);
    if (profile) saveState(updated, transactions, profile, totalEarnings);
    
    addNotification(
      "Service Cycle Started",
      `⏱️ Interactive timers activated on-site for customer: ${targetOrder?.clientName || "Resident"}.`,
      "job",
      Screen.ORDER_DETAIL,
      undefined,
      orderId
    );
  };

  // Pauses work sequence
  const handlePauseWork = (orderId: string) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return { ...o, status: OrderStatus.ACTIVE };
      }
      return o;
    });
    setOrders(updated);
    if (profile) saveState(updated, transactions, profile, totalEarnings);
    
    addNotification(
      "Service Cycle Suspended",
      `⏸️ Clock break recorded on job #${orderId}. Click to quickly resume.`,
      "job",
      Screen.ORDER_DETAIL,
      undefined,
      orderId
    );
  };

  // Solves active job and payouts balance
  const handleCompleteWork = (orderId: string, payout: number) => {
    // 1. Update order status to completed
    const targetOrder = orders.find((o) => o.id === orderId);
    const updatedOrders = orders.map((o) => {
      if (o.id === orderId) {
        return { ...o, status: OrderStatus.COMPLETED };
      }
      return o;
    });
    setOrders(updatedOrders);

    // 2. Add payout to total balance
    const updatedEarnings = totalEarnings + payout;
    setTotalEarnings(updatedEarnings);

    // 3. Prepend task item to transactions logs
    const newTx: Transaction = {
      id: orderId,
      serviceType: targetOrder?.serviceType || "Emergency Service",
      amount: payout,
      status: "Settled",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
    const updatedTx = [newTx, ...transactions];
    setTransactions(updatedTx);

    // 4. Update profile stats reward points incrementally
    if (profile) {
      const updatedProfile = {
        ...profile,
        rewardPoints: profile.rewardPoints + 25, // bonus 25 points on completion
      };
      setProfile(updatedProfile);
      saveState(updatedOrders, updatedTx, updatedProfile, updatedEarnings);
    }

    addNotification(
      "Service Order Competed 🎉",
      `💸 Solved problem successfully! ₹${payout.toLocaleString('en-IN')} added as payout credit to your wallet balance ledger.`,
      "earning",
      Screen.EARNINGS
    );
  };

  // Subscribing top-up handler
  const handleUpdateSubscription = (amount: number) => {
    if (profile) {
      const updatedProfile = {
        ...profile,
        subscriptionAmount: profile.subscriptionAmount + amount,
      };
      setProfile(updatedProfile);
      saveState(orders, transactions, updatedProfile, totalEarnings);
      
      addNotification(
        "Subscription Credit Topped up",
        `💳 Added ₹${amount.toLocaleString('en-IN')} successfully to support subscription reserves.`,
        "info",
        Screen.PROFILE
      );
    }
  };

  // Current location updater handler
  const handleUpdateLocation = (newLoc: string) => {
    if (profile) {
      const updatedProfile = {
        ...profile,
        currentLocationName: newLoc,
      };
      setProfile(updatedProfile);
      saveState(orders, transactions, updatedProfile, totalEarnings);
      
      addNotification(
        "Operating Coordinates Shifted",
        `📍 Active sector shifted to: ${newLoc}. Listening to emergency orders.`,
        "info",
        Screen.DASHBOARD
      );
    }
  };

  // Profile fields updater handler
  const handleUpdateProfile = (updated: PartnerProfile) => {
    setProfile(updated);
    saveState(orders, transactions, updated, totalEarnings);
    
    addNotification(
      "Profile Settings Overhaul",
      "📝 Changed operating profile, credential details, and offered services list.",
      "info",
      Screen.PROFILE
    );
  };

  // Cash-out balance transfer handler
  const handleWithdraw = (amount: number) => {
    const updatedEarnings = totalEarnings - amount;
    setTotalEarnings(updatedEarnings);

    const payoutTx: Transaction = {
      id: `WD-${Math.floor(10000 + Math.random() * 90000)}`,
      serviceType: "Withdrawal Payment",
      amount: amount,
      status: "Settled",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedTx = [payoutTx, ...transactions];
    setTransactions(updatedTx);

    if (profile) saveState(orders, updatedTx, profile, updatedEarnings);
    
    addNotification(
      "Instant Cash-Out Dispatched",
      `💸 Your withdrawal of ₹${amount.toLocaleString('en-IN')} has been cleared instantly to your registers bank card.`,
      "earning",
      Screen.EARNINGS
    );
  };

  // Reset simulated state sandbox cache
  const handleResetData = () => {
    localStorage.clear();
    setOrders(initialOrders);
    setTransactions(initialTransactions);
    if (profile) setProfile(initialProfile);
    setTotalEarnings(48250.0);
    setScreen(Screen.LOGIN);
    setIsLoggedIn(false);
    alert("Sandbox data cached states have been successfully cleared.");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("joboy_auth");
    handleNavigate(Screen.LOGIN);
  };

  // Locate the currently selected active order
  const getSelectedOrder = (): Order | null => {
    return orders.find((o) => o.id === selectedOrderId) || null;
  };

  const currentActiveOrder = getSelectedOrder();

  // Helper check to show bottom simulated mobile nav bar
  const displayBottomNav = 
    isLoggedIn && 
    (screen === Screen.DASHBOARD || screen === Screen.PROFILE || screen === Screen.ORDERS || screen === Screen.EARNINGS);

  return (
    <DeviceFrame onResetData={handleResetData}>
      {/* Dynamic Screen Routing Render */}
      <div className="h-full w-full flex flex-col relative bg-background overflow-hidden">
        <div className="flex-grow overflow-y-auto min-h-0 relative pb-20">
          {screen === Screen.LOGIN && (
            <LoginScreen
              onNavigate={handleNavigate}
              onLoginSuccess={handleLoginSuccess}
            />
          )}

          {screen === Screen.REGISTER && (
            <RegisterScreen
              onNavigate={handleNavigate}
              onRegisterSuccess={handleRegisterSuccess}
            />
          )}

          {profile && screen === Screen.DASHBOARD && (
            <DashboardScreen
              orders={orders}
              profile={profile}
              totalEarnings={totalEarnings}
              onNavigate={handleNavigate}
              onOpenMenu={() => setIsMenuOpen(true)}
              onSelectOrderDetail={(id) => {
                setSelectedOrderId(id);
                handleNavigate(Screen.ORDER_DETAIL);
              }}
              onAcceptOrder={handleAcceptOrder}
              onDeclineOrder={handleDeclineOrder}
              onToggleNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
              unreadNotificationsCount={notifications.filter((n) => !n.read).length}
            />
          )}

          {profile && screen === Screen.PROFILE && (
            <ProfileScreen
              profile={profile}
              onNavigate={handleNavigate}
              onLogout={handleLogout}
              onUpdateSubscription={handleUpdateSubscription}
              onUpdateLocation={handleUpdateLocation}
              onUpdateProfile={handleUpdateProfile}
              onOpenMenu={() => setIsMenuOpen(true)}
            />
          )}

          {screen === Screen.ORDERS && (
            <OrdersScreen
              orders={orders}
              onNavigate={handleNavigate}
              initialTab={ordersTab}
              onSelectOrderDetail={(id) => {
                setSelectedOrderId(id);
                handleNavigate(Screen.ORDER_DETAIL);
              }}
              onAcceptOrder={handleAcceptOrder}
              onDeclineOrder={handleDeclineOrder}
              onOpenMenu={() => setIsMenuOpen(true)}
              onToggleNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
              unreadNotificationsCount={notifications.filter((n) => !n.read).length}
            />
          )}

          {screen === Screen.ORDER_DETAIL && (
            <OrderDetailScreen
              order={currentActiveOrder}
              onNavigate={handleNavigate}
              onStartWork={handleStartWork}
              onPauseWork={handlePauseWork}
              onCompleteWork={handleCompleteWork}
            />
          )}

          {screen === Screen.EARNINGS && (
            <EarningsScreen
              transactions={transactions}
              totalEarnings={totalEarnings}
              onNavigate={handleNavigate}
              onWithdraw={handleWithdraw}
              onOpenMenu={() => setIsMenuOpen(true)}
            />
          )}

          {screen === Screen.PRIVACY_POLICY && (
            <PrivacyPolicyScreen onNavigate={handleNavigate} />
          )}

          {screen === Screen.TERMS_OF_USE && (
            <TermsOfUseScreen onNavigate={handleNavigate} />
          )}
        </div>

        {/* Slide-over Hamburger Side Drawer Panel */}
        {isLoggedIn && (
          <div className={`absolute inset-0 z-50 transition-all duration-300 pointer-events-none`}>
            {/* Dark glass backdrop layout */}
            <div 
              onClick={() => setIsMenuOpen(false)}
              className={`absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-300 pointer-events-auto ${
                isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`} 
            />
            {/* Milky Frosted Drawer List Sheet */}
            <aside className={`absolute top-0 left-0 h-full w-4/5 max-w-[280px] bg-white backdrop-blur-2xl border-r border-outline-variant/30 shadow-2xl flex flex-col justify-between p-6 z-50 transition-transform duration-300 ease-out pointer-events-auto ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}>
              <div className="space-y-6">
                {/* Header Close button and title */}
                <div className="flex items-center justify-between pb-2">
                  <span className="text-xs font-bold tracking-widest uppercase text-primary font-mono">JOBOY PARTNER Menu</span>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1.5 rounded-full hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-on-surface" />
                  </button>
                </div>

                {/* User profile brief */}
                <div className="flex items-center gap-3 pb-5 border-b border-outline-variant/20">
                  <div className="w-11 h-11 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0 border border-primary/20">
                    {profile?.name?.charAt(0) || "J"}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold tracking-tight text-on-surface line-clamp-1">{profile?.name || "Professional Partner"}</h4>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{profile?.category || "Registered Partner"}</p>
                  </div>
                </div>

                {/* Navigation list */}
                <nav className="flex flex-col gap-1 border-none bg-transparent !p-0 shadow-none !border-t-0 !backdrop-filter-none">
                  <button
                    onClick={() => {
                      handleNavigate(Screen.DASHBOARD);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-bold transition-all text-left border-none cursor-pointer outline-none bg-transparent ${
                      screen === Screen.DASHBOARD 
                        ? "bg-primary-container/15 text-primary" 
                        : "hover:bg-black/5 text-on-surface"
                    }`}
                  >
                    <LayoutDashboard className="w-4.5 h-4.5" />
                    <span>Home</span>
                  </button>

                  <button
                    onClick={() => {
                      handleNavigate(Screen.ORDERS);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-bold transition-all text-left border-none cursor-pointer outline-none bg-transparent ${
                      screen === Screen.ORDERS 
                        ? "bg-primary-container/15 text-primary" 
                        : "hover:bg-black/5 text-on-surface"
                    }`}
                  >
                    <ClipboardList className="w-4.5 h-4.5" />
                    <span>Order</span>
                  </button>

                  <button
                    onClick={() => {
                      handleNavigate(Screen.EARNINGS);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-bold transition-all text-left border-none cursor-pointer outline-none bg-transparent ${
                      screen === Screen.EARNINGS 
                        ? "bg-primary-container/15 text-primary" 
                        : "hover:bg-black/5 text-on-surface"
                    }`}
                  >
                    <History className="w-4.5 h-4.5" />
                    <span>Earnings</span>
                  </button>

                  <button
                    onClick={() => {
                      handleNavigate(Screen.PROFILE);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-bold transition-all text-left border-none cursor-pointer outline-none bg-transparent ${
                      screen === Screen.PROFILE 
                        ? "bg-primary-container/15 text-primary" 
                        : "hover:bg-black/5 text-on-surface"
                    }`}
                  >
                    <User className="w-4.5 h-4.5" />
                    <span>Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      handleNavigate(Screen.PRIVACY_POLICY);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-bold transition-all text-left border-none cursor-pointer outline-none bg-transparent ${
                      screen === Screen.PRIVACY_POLICY 
                        ? "bg-primary-container/15 text-primary" 
                        : "hover:bg-black/5 text-on-surface"
                    }`}
                  >
                    <ShieldCheck className="w-4.5 h-4.5" />
                    <span>Privacy Policy</span>
                  </button>

                  <button
                    onClick={() => {
                      handleNavigate(Screen.TERMS_OF_USE);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-bold transition-all text-left border-none cursor-pointer outline-none bg-transparent ${
                      screen === Screen.TERMS_OF_USE 
                        ? "bg-primary-container/15 text-primary" 
                        : "hover:bg-black/5 text-on-surface"
                    }`}
                  >
                    <Scale className="w-4.5 h-4.5" />
                    <span>Terms of Use</span>
                  </button>
                </nav>
              </div>

              {/* Drawer footer utility options */}
              <div className="space-y-2 pt-5 border-t border-outline-variant/20">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleResetData();
                  }}
                  className="flex items-center gap-3 text-xs w-full px-4 py-2.5 rounded-xl hover:bg-neutral-100 text-amber-700 transition-all font-bold text-left bg-transparent border-none cursor-pointer"
                >
                  <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18" />
                  </svg>
                  Reset Simulation Data
                </button>

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 text-xs w-full px-4 py-2.5 rounded-xl hover:bg-neutral-100 text-rose-600 transition-all font-bold text-left bg-transparent border-none cursor-pointer"
                >
                  <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log Out Partner
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Global Slide-over Notification Center Panel */}
        {isLoggedIn && (
          <div className={`absolute inset-0 z-50 transition-all duration-300 pointer-events-none`}>
            {/* Backdrop overlay */}
            <div 
              onClick={() => setIsNotificationsOpen(false)}
              className={`absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 pointer-events-auto ${
                isNotificationsOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`} 
            />
            
            {/* Right-aligned interactive sliding Drawer panel */}
            <aside className={`absolute top-0 right-0 h-full w-4/5 max-w-[320px] bg-white border-l border-zinc-200 shadow-2xl flex flex-col justify-between z-50 transition-transform duration-300 ease-out pointer-events-auto ${
              isNotificationsOpen ? "translate-x-0" : "translate-x-full"
            }`}>
              {/* Drawer Header */}
              <div className="p-4 border-b border-zinc-100 bg-[#14A5FF] text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="p-1 px-2 rounded-md bg-white/20 text-white flex items-center justify-center font-extrabold text-xs">
                    {notifications.filter(n => !n.read).length}
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-white">
                    Notifications
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {notifications.length > 0 && (
                    <button
                      onClick={() => {
                        const cleared = notifications.map(n => ({...n, read: true}));
                        saveNotificationsState(cleared);
                      }}
                      className="text-[10px] uppercase tracking-wider text-white hover:text-sky-105 font-black bg-transparent border-none cursor-pointer hover:underline outline-none"
                    >
                      Read All
                    </button>
                  )}
                  <button 
                    onClick={() => setIsNotificationsOpen(false)}
                    className="p-1.5 rounded-full hover:bg-white/10 transition-all cursor-pointer border-none bg-transparent flex items-center justify-center text-white"
                    aria-label="Close notification panel"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Central Notification Listing Area */}
              <div className="flex-grow overflow-y-auto p-3 space-y-2.5 bg-slate-50/50">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center h-full text-zinc-400 space-y-1 my-auto">
                    <Bell className="w-10 h-10 stroke-[1.5] text-sky-200 mb-2 fill-sky-50/30" />
                    <p className="text-xs font-bold text-slate-700">All caught up!</p>
                    <p className="text-[10px] leading-tight text-slate-400 max-w-[180px] mx-auto">No incoming notifications or active service alerts right now.</p>
                  </div>
                ) : (
                  notifications.map((n) => {
                    const isUnread = !n.read;
                    return (
                      <div 
                        key={n.id}
                        onClick={() => {
                          // Mark targeted notification item as read
                          const updated = notifications.map(notif => notif.id === n.id ? {...notif, read: true} : notif);
                          saveNotificationsState(updated);
                          
                          // Trigger redirect/navigation triggers if specified
                          if (n.targetScreen) {
                            if (n.targetScreen === Screen.ORDER_DETAIL && n.targetParams) {
                              setSelectedOrderId(n.targetParams);
                            }
                            handleNavigate(n.targetScreen, n.targetTab);
                          }
                          setIsNotificationsOpen(false);
                        }}
                        className={`p-3 rounded-xl border transition-all text-left cursor-pointer flex gap-3 shadow-xs ${
                          isUnread 
                            ? "bg-white border-[#14A5FF]/30 hover:border-[#14A5FF]/60 hover:bg-sky-50/10 ring-1 ring-[#14A5FF]/10" 
                            : "bg-white border-zinc-100 hover:bg-slate-50"
                        }`}
                      >
                        {/* Custom Category Colored Frame Icons */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          n.type === 'job' 
                            ? "bg-blue-50 text-[#14A5FF] border border-blue-100/60" 
                            : n.type === 'bonus' 
                            ? "bg-amber-50 text-amber-600 border border-amber-100/60" 
                            : n.type === 'earning' 
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100/60" 
                            : "bg-slate-55 text-slate-500 border border-slate-100"
                        }`}>
                          {n.type === 'job' ? (
                            <ClipboardList className="w-4 h-4" />
                          ) : n.type === 'bonus' ? (
                            <Trophy className="w-4 h-4" />
                          ) : n.type === 'earning' ? (
                            <Wallet className="w-4 h-4" />
                          ) : (
                            <Bell className="w-4 h-4" />
                          )}
                        </div>

                        {/* Contents description block */}
                        <div className="space-y-0.5 min-w-0 flex-grow">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className={`text-xs truncate leading-tight ${isUnread ? "font-bold text-[#14A5FF]" : "font-semibold text-slate-700"}`}>
                              {n.title}
                            </h4>
                            {isUnread && (
                              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 animate-pulse" />
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 leading-normal break-words">
                            {n.message}
                          </p>
                          <span className="block text-[8px] text-zinc-400 font-mono mt-1">
                            {n.time}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Utility Clear Actions Drawer footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t border-zinc-100 bg-slate-50 flex justify-between items-center text-[9px] font-bold text-zinc-400 shrink-0">
                  <span className="tracking-wide uppercase">Joboy Partner Hub</span>
                  <button
                    onClick={() => {
                      saveNotificationsState([]);
                    }}
                    className="text-rose-600 hover:text-rose-800 hover:underline border-none bg-transparent cursor-pointer font-extrabold text-[9px] uppercase tracking-wider outline-none"
                  >
                    Wipe History
                  </button>
                </div>
              )}
            </aside>
          </div>
        )}

        {/* Global Bottom Navigation Tab Bar for authorized sheets */}
        {displayBottomNav && (
          <nav className="absolute bottom-0 inset-x-0 w-full z-40 flex justify-around items-center px-4 py-3 bg-white border-t border-outline-variant/30 shadow-lg rounded-t-2xl select-none shrink-0">
            {/* Dashboard / Home Tab */}
            <button
              onClick={() => handleNavigate(Screen.DASHBOARD)}
              className={`flex flex-col items-center justify-center gap-1 transition-all px-4 py-1.5 rounded-full cursor-pointer border-none bg-transparent ${
                screen === Screen.DASHBOARD
                  ? "bg-primary-container/15 text-[#14A5FF]"
                  : "text-on-surface-variant hover:bg-slate-50"
              }`}
            >
              <LayoutDashboard className="w-5.5 h-5.5" strokeWidth={screen === Screen.DASHBOARD ? 2.5 : 2} />
              <span className="text-[10px] font-extrabold tracking-wide">Home</span>
            </button>

            {/* Order List Tab */}
            <button
              onClick={() => handleNavigate(Screen.ORDERS)}
              className={`flex flex-col items-center justify-center gap-1 transition-all px-4 py-1.5 rounded-full cursor-pointer border-none bg-transparent ${
                screen === Screen.ORDERS
                  ? "bg-primary-container/15 text-[#14A5FF]"
                  : "text-on-surface-variant hover:bg-slate-50"
              }`}
            >
              <ClipboardList className="w-5.5 h-5.5" strokeWidth={screen === Screen.ORDERS ? 2.5 : 2} />
              <span className="text-[10px] font-extrabold tracking-wide">Orders</span>
            </button>

            {/* PROFILE Tab */}
            <button
              onClick={() => handleNavigate(Screen.PROFILE)}
              className={`flex flex-col items-center justify-center gap-1 transition-all px-4 py-1.5 rounded-full cursor-pointer border-none bg-transparent ${
                screen === Screen.PROFILE
                  ? "bg-primary-container/15 text-[#14A5FF]"
                  : "text-on-surface-variant hover:bg-slate-50"
              }`}
            >
              <User className="w-5.5 h-5.5" strokeWidth={screen === Screen.PROFILE ? 2.5 : 2} />
              <span className="text-[10px] font-extrabold tracking-wide">Profile</span>
            </button>
          </nav>
        )}
      </div>
    </DeviceFrame>
  );
}
