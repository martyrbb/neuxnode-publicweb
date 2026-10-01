"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  HardDrive,
  ShieldCheck,
  Network,
  Globe,
  ArrowUpRight
} from "lucide-react";
import amd from "@/config/root-servers/amd.json";
import intel from "@/config/root-servers/intel.json";
import Hardware from "@/components/Hardware";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

interface RootPlan {
  name: string;
  ram: string;
  cpu: string;
  ssd: string;
  traffic: string;
  uplink: string;
  ipv4: string;
  ddos: string;
  price: number;
  link?: string;
  orderLink?: string;
}

interface RootConfig {
  enabled?: boolean;
  name: string;
  image?: string;
  logo?: string;
  heroImage: string;
  description: string;
  accent: string;
  plans: RootPlan[];
}

const ROOT_DATA_REGISTRY: Record<string, RootConfig> = {
  amd: amd as RootConfig,
  intel: intel as RootConfig,
};

const THEMES: Record<string, string> = {
  amd: "#ff6900", 
  intel: "#0071c5",
};

export default function RootServersPage() {
  const rootIds = Object.keys(ROOT_DATA_REGISTRY).filter(id => ROOT_DATA_REGISTRY[id].enabled !== false);
  const [selectedArch, setSelectedArch] = useState(rootIds[0] || "amd");
  const config = ROOT_DATA_REGISTRY[selectedArch];
  const activeColor = THEMES[selectedArch] || "#8b5cf6";

  if (!config) return null;

  return (
    <div className="min-h-screen bg-black text-[#e2e8f0] pb-20 transition-colors duration-700">
      <section className="relative min-h-[65vh] w-full flex flex-col items-center justify-center overflow-hidden pt-40 pb-24 px-4">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedArch}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              {config.heroImage && (
                <Image
                  src={config.heroImage}
                  alt={selectedArch}
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center center' }}
                  priority
                />
              )}
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-linear-to-b from-black via-black/20 to-black z-10" />
        </div>
        <div className="relative z-20 text-center w-full max-w-4xl mx-auto flex flex-col items-center">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ color: activeColor, borderColor: `${activeColor}40`, backgroundColor: `${activeColor}10` }}
            className="text-xs md:text-sm font-bold px-4 py-1.5 rounded-full border-2 tracking-wide mb-1 inline-block"
          >
            Premium {config.name} Servers
          </motion.span>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-8xl font-extrabold leading-none"
          >
            Root <span style={{ color: activeColor }}>Servers</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 mt-4 text-sm md:text-lg max-w-2xl mx-auto"
          >
            {config.description}
          </motion.p>
        </div>
      </section>
      <main className="max-w-360 mx-auto px-6 lg:px-10 space-y-16 -mt-10 relative z-30 mb-24">
        {rootIds.length > 1 && (
          <section>
            <h3 className="text-xl font-bold text-gray-300 mb-4">1. Select CPU</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {rootIds.map(id => (
                <motion.button
                  key={id}
                  onClick={() => setSelectedArch(id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 border-2 rounded-2xl transition-all duration-300 text-left flex items-center gap-4 ${
                    selectedArch === id ? 'bg-zinc-900/40' : 'border-zinc-800 opacity-70 grayscale hover:opacity-100'
                  }`}
                  style={{ borderColor: selectedArch === id ? activeColor : '' }}
                >
                  <div className="relative w-12 h-12 shrink-0">
                    <Image 
                      src={ROOT_DATA_REGISTRY[id].logo || ROOT_DATA_REGISTRY[id].image || ""} 
                      alt={id} 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                  <div>
                    <span className="font-bold text-xl block" style={{ color: selectedArch === id ? activeColor : '' }}>
                      {ROOT_DATA_REGISTRY[id].name}
                    </span>
                    <p className="text-xs text-gray-400 font-medium line-clamp-2">{ROOT_DATA_REGISTRY[id].description}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>
        )}
        <section className="border-t-3 border-zinc-800 pt-12">
          <h3 className="text-xl font-bold text-gray-300 mb-6">2. Choose Your Server</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {config?.plans?.map((plan: RootPlan, i: number) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  key={`${selectedArch}-${i}`}
                  className="relative p-0.5 rounded-3xl overflow-hidden group"
                  style={{ background: `linear-gradient(to bottom right, #18181b, ${activeColor}40, #18181b)` }}
                >
                  <div className="relative bg-black h-full p-6 rounded-[23px] flex flex-col gap-6">
                    <div>
                      <h4 className="font-bold text-lg mb-1" style={{ color: activeColor }}>
                        {plan.name}
                      </h4>
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-extrabold text-white ">{plan.ram}</span>
                        <span className="text-zinc-500 font-bold text-sm">RAM</span>
                      </div>
                    </div>
                    <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-5 space-y-4 grow">
                      <Stat icon={<Cpu size={18} className="text-cyan-400" />} label={`${plan.cpu} vCores`} />
                      <Stat icon={<HardDrive size={18} className="text-blue-400" />} label={`${plan.ssd} NVMe SSD`} />
                      <Stat icon={<Network size={18} className="text-orange-400" />} label={`${plan.uplink} Uplink`} />
                      <Stat icon={<ShieldCheck size={18} className="text-emerald-400" />} label={`${plan.ddos} DDoS Protection`} />
                      <Stat icon={<Globe size={18} className="text-indigo-400" />} label={`${plan.ipv4} IPv4 Addresses`} />
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-zinc-900">
                      <div>
                        <p className="text-sm font-bold text-zinc-500 tracking-wider">Starting at</p>
                        <p className="text-2xl font-extrabold text-white">
                          ${Number(plan.price).toFixed(2)}<span className="text-sm text-zinc-500 font-bold">/mo</span>
                        </p>
                      </div>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={plan.link || plan.orderLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 bg-zinc-900/50 border-2 border-zinc-800 rounded-xl text-white hover:border-zinc-500 transition-all shadow-lg"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <div className="flex flex-col gap-24">
        <Hardware />
        <Testimonials />
        <CTA />
      </div>
    </div>
  );
}

function Stat({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="shrink-0 mt-0.5">{icon}</div>
      <span className="text-sm font-bold text-zinc-400 tracking-tight">{label}</span>
    </div>
  );
}