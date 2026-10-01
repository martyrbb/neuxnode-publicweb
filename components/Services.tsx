"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getServicesConfig, DynamicIcon } from "@/lib/services";

const Services = () => {
  const { header, items } = getServicesConfig();

  return (
    <section className="w-full py-20 relative z-10 overflow-hidden bg-black">
      <div className="max-w-360 mx-auto px-6 lg:px-10 relative">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-violet-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"
          aria-hidden="true"
        />

        <div className="mb-12 text-center">
          <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">
            {header.title} <span className="bg-linear-to-br from-violet-400 via-violet-600 to-violet-800 bg-clip-text text-transparent">{header.accent}</span>
          </h2>
          <p className="mt-2 text-zinc-400 text-md font-bold">
            {header.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25}}
              whileHover={!service.comingSoon ? { scale: 1.02, y: -4 } : {}}
              className={`relative p-px rounded-3xl overflow-hidden bg-linear-to-b from-violet-500/40 to-zinc-800/50 ${service.comingSoon ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
            >
              <Link
                href={service.href}
                className={`block h-full ${service.comingSoon ? 'pointer-events-none' : ''}`}
              >
                <div className="relative bg-black h-full p-8 rounded-[23px] flex flex-col gap-5 overflow-hidden group">
                  {service.comingSoon && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-900/50 border border-purple-600/25 backdrop-blur-md">
                      <span className="text-sm font-semibold text-purple-200/90">
                        Coming Soon
                      </span>
                    </div>
                  )}
                  <div className="text-violet-500 bg-violet-500/10 p-3 w-fit rounded-xl border border-violet-500/20 group-hover:bg-violet-500/20 transition-colors duration-300">
                    <DynamicIcon name={service.icon} />
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-xl mb-2 group-hover:text-violet-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;