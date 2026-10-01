"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { DynamicIcon } from "@/lib/features";
import { getPanelConfig, PanelTab } from "@/lib/panel";

const Panel = () => {
  const { header, tabs } = getPanelConfig();
  const [activeTab, setActiveTab] = useState<PanelTab>(tabs[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prevTab) => {
        const currentIndex = tabs.findIndex((tab) => tab.id === prevTab.id);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [tabs, activeTab]);

  return (
    <section className="w-full py-20 relative z-10 overflow-hidden bg-black">
      <div className="max-w-360 mx-auto px-6 lg:px-10 relative">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-violet-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">
            {header.title} <span className="bg-linear-to-br from-violet-400 via-violet-600 to-violet-800 bg-clip-text text-transparent">{header.accent}</span>
          </h2>
          <p className="mt-2 text-zinc-400 text-md font-bold">
            {header.description}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border ${
                activeTab.id === tab.id
                  ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-900/20"
                  : "bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              <DynamicIcon name={tab.icon} size={18} />
              {tab.label}
            </button>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-0.5 rounded-3xl overflow-hidden bg-linear-to-tr from-zinc-900 via-violet-600/40 to-zinc-900 shadow-2xl"
        >
          <div className="relative bg-black rounded-[23px] overflow-hidden aspect-video md:aspect-21/9">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full"
              >
                <Image
                  src={activeTab.image}
                  alt={activeTab.label}
                  fill
                  className="object-cover object-top"
                  priority
                  unoptimized
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Panel;