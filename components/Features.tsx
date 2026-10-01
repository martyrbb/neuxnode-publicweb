"use client";

import React from "react";
import { motion } from "framer-motion";
import { getFeaturesConfig, DynamicIcon } from "@/lib/features";

const Features = () => {
  const { header, items } = getFeaturesConfig();

  return (
    <section className="w-full py-20 relative z-10 overflow-hidden bg-black">
      <div className="max-w-360 mx-auto px-6 lg:px-10 relative">
        {/* Original Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-lue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12 text-left"
        >
          <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">
            {header.title} <span className="bg-linear-to-br from-lue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent">{header.accent}</span>
          </h2>
          <p className="mt-2 text-zinc-400 text-md font-bold">
            {header.description}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="relative p-0.5 rounded-3xl overflow-hidden bg-linear-to-tr from-zinc-900 via-blue-600/40 to-zinc-900"
            >
              <div className="relative bg-black h-full p-8 rounded-[23px] flex flex-col gap-5 group">
                <div className="flex items-center gap-4">
                  <div className="text-blue-500 bg-blue-500/10 p-2 rounded-lg border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors duration-300">
                    <DynamicIcon name={item.icon} size={24} />
                  </div>
                  <h3 className="text-white font-bold text-lg">
                    {item.title}
                  </h3>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;