/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order, OrderStatus, Transaction, PartnerProfile } from "./types";

export const initialOrders: Order[] = [
  {
    id: "JB-9042",
    serviceType: "AC Repair",
    clientName: "Arjun Kumar",
    clientPhone: "+91 91234 56789",
    locationName: "Kochi, Kerala (2.5 km)",
    distance: "2.5 km",
    timeSlot: "Today, 02:30 PM - 03:30 PM",
    status: OrderStatus.NEW,
    inspectionFee: 250,
    materialCost: 0,
    tax: 45,
    total: 295,
    instructions: "Please clean filters thoroughly and inspect gas level."
  },
  {
    id: "JB-8812",
    serviceType: "Electrical Installation",
    clientName: "Sarah Williams",
    clientPhone: "+91 98765 01234",
    locationName: "Aluva (4.8 km)",
    distance: "4.8 km",
    timeSlot: "Tomorrow, 10:00 AM - 11:30 AM",
    status: OrderStatus.NEW,
    inspectionFee: 300,
    materialCost: 150,
    tax: 81,
    total: 531,
    instructions: "Need new fan regulators installed in bedroom and living area."
  },
  {
    id: "JB-9105",
    serviceType: "Deep House Cleaning",
    clientName: "Michel D'Souza",
    clientPhone: "+91 93456 78901",
    locationName: "Kadavanthra (1.2 km)",
    distance: "1.2 km",
    timeSlot: "Today, 04:00 PM",
    status: OrderStatus.NEW,
    inspectionFee: 1500,
    materialCost: 200,
    tax: 306,
    total: 2006,
    instructions: "Requires special focus on kitchen tiles and balconies."
  },
  {
    id: "JO-12345",
    serviceType: "Plumbing Service",
    clientName: "Johnathan Miller",
    clientPhone: "+91 98765 43210",
    locationName: "Flat 4B, Skyline Apartments, MG Road, Kochi, Kerala - 682016",
    distance: "0.8 km",
    timeSlot: "Oct 24, 10:30 AM",
    status: OrderStatus.ACTIVE,
    inspectionFee: 299.00,
    materialCost: 0.00,
    tax: 53.82,
    total: 352.82,
    instructions: "Please check the kitchen sink leak first. Customer reported water pressure issues in the guest bathroom as well."
  },
  {
    id: "JB-90188",
    serviceType: "AC Deep Cleaning",
    clientName: "Abhilash Thomas",
    clientPhone: "+91 99887 76655",
    locationName: "Vyttila, Kochi (3.1 km)",
    distance: "3.1 km",
    timeSlot: "Oct 23, 04:15 PM",
    status: OrderStatus.COMPLETED,
    inspectionFee: 3500.00,
    materialCost: 0,
    tax: 630.00,
    total: 4130.00,
    instructions: "Deep sanitization of commercial cassette AC units."
  },
  {
    id: "JB-89952",
    serviceType: "Electrical Repairs",
    clientName: "Reena Joseph",
    clientPhone: "+91 94433 22110",
    locationName: "Kakkayad, Kochi (5.0 km)",
    distance: "5.0 km",
    timeSlot: "Oct 22, 09:00 AM",
    status: OrderStatus.COMPLETED,
    inspectionFee: 850.00,
    materialCost: 100.00,
    tax: 171.00,
    total: 1121.00,
    instructions: "Fuse socket sparks and burnt wiring replacement."
  }
];

export const initialTransactions: Transaction[] = [
  {
    id: "JB-90214",
    serviceType: "Plumbing Service",
    amount: 1250.00,
    status: "Settled",
    date: "Oct 24, 2023",
    time: "10:30 AM"
  },
  {
    id: "JB-90188",
    serviceType: "AC Deep Cleaning",
    amount: 3500.00,
    status: "Pending",
    date: "Oct 23, 2023",
    time: "04:15 PM"
  },
  {
    id: "JB-89952",
    serviceType: "Electrical Repairs",
    amount: 850.00,
    status: "Settled",
    date: "Oct 22, 2023",
    time: "09:00 AM"
  }
];

export const initialProfile: PartnerProfile = {
  name: "Khan",
  email: "khan@gmail.com",
  phone: "+91 - 9746829891",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqSvacdgC1UVEEHosMeNgjjk07UpOLs3R6n0Y33cj2-Eb7aLTaThtY3r0k6lPP-bgWKgPLz-KXpDm8P_1z93Hz2klTq-XlXzjNraf1TEBdrqFDBWXXlLVSlKivATHS-yegSgNeiaFXHanr-u1fm-Djb3JB9W4JXcnrzlNjON7_uECLJDTHtNqGlOIyGCJ_QoF-T3-_R7pOnWtdwKrD7SATYs6NCxNUlIfgKKUoqSwRQzLC9xkpqOIbeKMv94By5RZUX6SUg5gu8zsF", // Hotlinked avatar or premium placeholder
  rating: 5.0,
  rewardPoints: 150,
  subscriptionAmount: 1000,
  coveredCities: ["Kochi", "Near Me"],
  offeredServices: ["Electrician", "Taxi Service"],
  aadhaarNumber: "XXXXXXXX1234",
  currentLocationName: "Corrazone Coworking Space, Kochi"
};
