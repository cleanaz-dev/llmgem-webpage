
import {
  Search,
  ChartArea,
  Lightbulb,
  Cog,
  ClipboardList,
  Network,
} from "lucide-react";

import { FaEthereum, FaBitcoin, FaMonero } from "react-icons/fa";
import { SiTether, SiSolana, SiLitecoin, SiDogecoin } from "react-icons/si";
import { RiXrpFill, RiBnbFill } from "react-icons/ri";

export const chartData = [
    { efficiency: 200, costReduction: 180 },
    { efficiency: 280, costReduction: 240 },
    { efficiency: 240, costReduction: 200 },
    { efficiency: 320, costReduction: 250 },
    { efficiency: 300, costReduction: 230 },
    { efficiency: 400, costReduction: 350 },
  ];

export const tasks = [
  { name: "RAG Search Optimization", status: "Pending" },
  { name: "Workflow Improvements", status: "Complete" },
  { name: "Enhanced AI Context", status: "In Progress" },
  { name: "CRM Integration", status: "Pending" },
];


export const pricingTiers = [
  {
    title: "Kickstart Your AI Journey",
    price: "$0",
    subtext: "",
    description:
      "Explore how AI can transform your business with our expert consultation.",
    buttonText: "Get Started",
    features: [
      "AI Readiness Assessment",
      "Use Case Brainstorming",
      "ROI Projection",
      "Technology Stack Review",
      "Strategy Outline",
    ],
  },
  {
    title: "Launch Your AI Solution",
    price: "$500-$2,000",
    subtext: "starting at",
    description:
      "Ideal for businesses looking to implement their first AI solution.",
    buttonText: "Get Started",
    features: [
      "Custom Chatbots",
      "Content Generation",
      "Multi-platform Deployment",
      "CRM Integration",
      "Admin Dashboard",
      "3 Months Training & Support",
    ],
  },
  {
    title: "Maximize AI Potential",
    price: "Contact Us",
    subtext: "",
    description:
      "Comprehensive AI solution with advanced chatbot, voice assistant, and deep CRM integration.",
    buttonText: "Get Started",
    features: [
      "Advanced AI Solutions",
      "Chat & Voice Assistant Integration",
      "Deep CRM Integration",
      "Omnichannel Integration",
      "12 Months Dedicated Support",
    ],
  },
];

export const analyzeIcons = [
  { id: 1, position: "translate-x-16", icon: <Search /> }, // Left side, first row
  { id: 2, position: "", icon: <ChartArea /> }, // Left side, second row
  { id: 3, position: "translate-x-16", icon: <Lightbulb /> }, // Left side, third row
  { id: 4, position: "-translate-x-16", icon: <Cog /> }, // Right side, first row
  { id: 5, position: "", icon: <ClipboardList /> }, // Right side, second row
  { id: 6, position: "-translate-x-16", icon: <Network /> }, // Right side, third row
];


export const CRYPTOS = [
  { id: "BTC", name: "Bitcoin", icon: FaBitcoin, color: "text-orange-500", gasFee: "0.0005" },
  { id: "ETH", name: "Ethereum", icon: FaEthereum, color: "text-purple-500", gasFee: "0.01" },
  { id: "USDT", name: "Tether", icon: SiTether, color: "text-green-500", gasFee: "1" },
  { id: "SOL", name: "Solana", icon: SiSolana, color: "text-teal-500", gasFee: "0.05" },
  { id: "XRP", name: "XRP", icon: RiXrpFill, color: "text-blue-500", gasFee: "0.002" },
  { id: "XMR", name: "Monero", icon: FaMonero, color: "text-gray-500", gasFee: "0.001" },
  { id: "LTC", name: "Litecoin", icon: SiLitecoin, color: "text-silver-500", gasFee: "0.003" },
  { id: "DOGE", name: "Dogecoin", icon: SiDogecoin, color: "text-yellow-500", gasFee: "0.1" },
  { id: "BNB", name: "BNB", icon: RiBnbFill, color: "text-yellow-600", gasFee: "0.02" },
];

export const WALLET_ADDRESS = "0x1234...5678";
export const RECEIVER_ADDRESS = "0x9876...5432";