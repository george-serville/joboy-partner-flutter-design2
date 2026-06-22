/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Screen {
  LOGIN = "login",
  REGISTER = "register",
  DASHBOARD = "dashboard",
  PROFILE = "profile",
  ORDERS = "orders",
  ORDER_DETAIL = "order-detail",
  EARNINGS = "earnings",
}

export enum OrderStatus {
  NEW = "new",
  ACTIVE = "active",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface Order {
  id: string; // e.g. "JB-9042"
  serviceType: string; // e.g. "AC Repair"
  clientName: string;
  clientPhone: string;
  locationName: string;
  distance: string;
  timeSlot: string;
  status: OrderStatus;
  inspectionFee: number;
  materialCost: number;
  tax: number;
  total: number;
  instructions: string;
}

export interface Transaction {
  id: string; // e.g. "JB-90214"
  serviceType: string;
  amount: number;
  status: "Settled" | "Pending";
  date: string;
  time: string;
}

export interface PartnerProfile {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  rating: number;
  rewardPoints: number;
  subscriptionAmount: number;
  coveredCities: string[];
  offeredServices: string[];
  aadhaarNumber: string;
  currentLocationName: string;
}
