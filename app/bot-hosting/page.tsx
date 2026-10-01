"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Cpu,
  HardDrive,
  ShieldCheck,
  Network,
  Globe,
  ArrowUpRight,
  Zap
} from "lucide-react";
import botHostingConfig from "@/config/bot-hosting/plans.json";
import Hardware from "@/components/Hardware";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

interface BotPlan {
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

interface BotHostingConfig {
  name: string;
  heroImage: string;
  description: string;
  accent: string;
  plans: BotPlan[];
}

const config = botHostingConfig as BotHostingConfig;

export default function BotHostingPage() {
  const activeColor = config.accent || "#5865F2";

  if (!config) return null;

  return (
    <div className="min-h-screen bg-black text-[#e2e8f0] pb-20">
      <section className="relative min-h-[60vh] w-full flex flex-col items-center justify-center overflow-hidden pt-40 pb-24 px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-20">
            {config.heroImage && (
              <Image
                src={config.heroImage}
                alt={`${config.name} Hosting`}
                fill
                className="object-cover"
                style={{ objectPosition: 'center center' }}
                priority
              />
            )}
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-black via-black/40 to-black z-10" />
        </div>

        <div className="relative z-20 text-center w-full max-w-4xl mx-auto flex flex-col items-center">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ 
              color: activeColor, 
              borderColor: `${activeColor}40`, 
              backgroundColor: `${activeColor}10` 
            }}
            className="text-xs md:text-sm font-bold px-4 py-1.5 rounded-full border-2 tracking-wide mb-4 inline-flex items-center gap-2"
          >
            <Zap size={14} /> High-Performance Hosting
          </motion.span>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
          >
            {config.name} <span style={{ color: activeColor }}>Hosting</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 mt-6 text-sm md:text-lg max-w-2xl mx-auto"
          >
            {config.description}
          </motion.p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 lg:px-10 space-y-16 -mt-10 relative z-30 mb-24">
        <section className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.plans?.map((plan: BotPlan, i: number) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                key={i}
                className="relative p-0.5 rounded-3xl overflow-hidden group transition-all duration-300"
                style={{ background: `linear-gradient(to bottom right, #18181b, ${activeColor}30, #18181b)` }}
              >
                <div className="relative bg-black h-full p-6 rounded-[23px] flex flex-col gap-6">
                  <div>
                    <h4 className="font-bold text-lg mb-1" style={{ color: activeColor }}>
                      {plan.name}
                    </h4>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-extrabold text-white">{plan.ram}</span>
                      <span className="text-zinc-500 font-bold text-sm">RAM</span>
                    </div>
                  </div>

                  <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-5 space-y-4 grow">
                    <Stat icon={<Cpu size={18} className="text-cyan-400" />} label={`${plan.cpu} vCPU Core`} />
                    <Stat icon={<HardDrive size={18} className="text-blue-400" />} label={`${plan.ssd} NVMe SSD`} />
                    <Stat icon={<Network size={18} className="text-orange-400" />} label={`${plan.uplink} Uplink Port`} />
                    <Stat icon={<ShieldCheck size={18} className="text-emerald-400" />} label={`${plan.ddos} DDoS Mitigation`} />
                    <Stat icon={<Globe size={18} className="text-indigo-400" />} label={`${plan.ipv4} Configuration`} />
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-zinc-900">
                    <div>
                      <p className="text-sm font-bold text-zinc-500 tracking-wider">Starting at</p>
                      <p className="text-2xl font-extrabold text-white">
                        ${Number(plan.price).toFixed(2)}<span className="text-sm text-zinc-500 font-bold">/mo</span>
                      </p>
                    </div>
                    
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
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