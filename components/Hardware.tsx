"use client";

import React from "react";
import { Cpu, HardDrive, Shield, MemoryStick, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import hardwareData from "@/config/home/hardware.json";

const IconMap: Record<string, LucideIcon> = {
  Cpu,
  HardDrive,
  Shield,
  MemoryStick,
};

const Hardware = () => {
  const { header, specs } = hardwareData;

  return (
    <section className="w-full py-24 relative overflow-hidden bg-black">
      <div className="max-w-360 mx-auto px-6 lg:px-10 relative">
        <div className="absolute -right-24 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-6"
          >
            <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">
              {header.title}<br />
              <span className="bg-linear-to-br from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                {header.accent}
              </span>
            </h2>
            <p className="text-zinc-400 text-lg font-medium leading-relaxed max-w-md">
              {header.description}
            </p>
            <div className="pt-4 flex gap-4">
               <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-full bg-linear-to-br from-blue-400 via-blue-600 to-blue-800 text-white font-bold transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                href={header.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
               >
                 {header.ctaText}
               </motion.a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {specs.map((spec, i) => {
              const IconComponent = IconMap[spec.icon] || Cpu;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="relative p-0.5 rounded-3xl overflow-hidden bg-linear-to-tr from-zinc-900 via-blue-600/40 to-zinc-900"
                >
                  <div className="relative bg-black p-6 rounded-[23px] h-full flex flex-col gap-4 group">
                    <div className="p-2 w-fit bg-blue-500/10 rounded-lg border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors duration-300">
                      <IconComponent className="text-blue-500" size={20} />
                    </div>
                    <div>
                      <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{spec.label}</p>
                      <h4 className="text-white text-lg font-bold mt-1">{spec.value}</h4>
                      <p className="text-zinc-500 text-sm mt-1">{spec.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hardware;