"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Cpu,
  HardDrive,
  ShieldCheck,
  Network,
  Zap,
  Lock,
  ArrowUpRight
} from "lucide-react";
import dedicatedData from "@/config/dedicated-servers/plans.json";
import Hardware from "@/components/Hardware";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

interface DedicatedPlan {
  name: string;
  ram: string;
  cpu: string;
  ssd: string;
  uplink: string;
  bandwidth: string;
  protection: string;
  price: number;
  location: string;
  link?: string;
}

const ACCENT_COLOR = "#8b5cf6";

export default function DedicatedServersPage() {
  const config = dedicatedData;

  return (
    <div className="min-h-screen bg-black text-[#e2e8f0] pb-20 transition-colors duration-700">
      <section className="relative min-h-[65vh] w-full flex flex-col items-center justify-center overflow-hidden pt-40 pb-24 px-4">
        <div className="absolute inset-0 z-0 opacity-40">
          {config.heroImage && (
            <Image src={config.heroImage} alt="Map" fill className="object-cover" priority />
          )}
          <div className="absolute inset-0 bg-linear-to-b from-black via-black/20 to-black z-10" />
        </div>
        <div className="relative z-20 text-center w-full max-w-4xl mx-auto flex flex-col items-center">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ color: ACCENT_COLOR, borderColor: `${ACCENT_COLOR}40`, backgroundColor: `${ACCENT_COLOR}10` }}
            className="text-xs md:text-sm font-bold px-4 py-1.5 rounded-full border-2 tracking-wide mb-1 inline-block"
          >
            Premium {config.name}
          </motion.span>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-8xl font-extrabold leading-none"
          >
            Dedicated <span style={{ color: ACCENT_COLOR }}>Servers</span>
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
      <main className="max-w-360 mx-auto px-6 lg:px-10 relative z-30 mb-24 -mt-10">
        <div className="flex flex-col gap-4 w-full">
          {config.plans.map((plan: DedicatedPlan, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="relative p-0.5 rounded-3xl overflow-hidden group w-full"
              style={{ background: `linear-gradient(to right, #18181b, ${ACCENT_COLOR}40, #18181b)` }}
            >
              <div className="relative bg-black rounded-[23px] flex flex-col lg:flex-row items-center w-full px-8 py-7 lg:py-6 gap-8 lg:gap-0">
                <div className="flex items-center gap-5 lg:w-[25%] lg:border-r border-zinc-900 pr-6">
                  <div className="relative w-8 h-8 overflow-hidden rounded-full border border-zinc-800 shrink-0">
                    <Image
                      src={`https://flagcdn.com/${plan.location.toLowerCase()}.svg`}
                      alt={plan.location}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 uppercase tracking-tight" style={{ color: ACCENT_COLOR }}>{plan.name}</h4>
                    <div className="flex items-baseline gap-1.5 leading-none">
                      <span className="text-5xl font-extrabold text-white">{plan.ram}</span>
                      <span className="text-zinc-500 font-bold text-sm uppercase">RAM</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 px-2 lg:px-10 w-full">
                  <Stat icon={<Cpu size={18} className="text-cyan-400" />} label={plan.cpu} />
                  <Stat icon={<HardDrive size={18} className="text-blue-400" />} label={plan.ssd} />
                  <Stat icon={<Network size={18} className="text-orange-400" />} label={plan.uplink} />
                  <Stat icon={<Zap size={18} className="text-yellow-400" />} label={plan.bandwidth} />
                  <Stat icon={<Lock size={18} className="text-emerald-400" />} label={plan.protection} />
                  <Stat icon={<ShieldCheck size={18} className="text-indigo-400" />} label="Dedicated IPMI" />
                </div>
                <div className="flex items-center justify-between lg:justify-end gap-10 lg:w-[22%] w-full border-t lg:border-t-0 lg:border-l border-zinc-900 pt-6 lg:pt-0 lg:pl-10">
                  <div className="text-left lg:text-right">
                    <p className="text-sm font-bold text-zinc-500 tracking-wider">Starting at</p>
                    <p className="text-3xl font-extrabold text-white leading-none">
                      ${Number(plan.price).toFixed(2)}
                    </p>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={plan.link || "#"}
                    target="_blank"
                    className="flex items-center justify-center w-12 h-12 bg-zinc-900/50 border-2 border-zinc-800 rounded-xl text-white hover:border-zinc-500 transition-all shadow-lg"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.a>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
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