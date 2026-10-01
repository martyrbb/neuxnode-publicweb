"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getLocationsConfig, getCountryCode } from "@/lib/locations";

const Locations = () => {
  const { header, countries } = getLocationsConfig();

  return (
    <section className="w-full py-20 relative z-10 overflow-hidden bg-black">
      <div className="max-w-360 mx-auto px-6 lg:px-10 relative">
        {/* Violet Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-violet-600/10 rounded-full blur-[140px] -z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Header Section */}
        <div className="mb-12 text-center">
          <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">
            {header.title} <span className="bg-linear-to-br from-violet-400 via-violet-600 to-violet-800 bg-clip-text text-transparent">{header.accent}</span>
          </h2>
          <p className="mt-2 text-zinc-400 text-md font-bold">
            {header.description}
          </p>
        </div>

        {/* Map and Tags Container */}
        <div className="relative w-full min-h-125 md:min-h-150 flex items-center justify-center">
          <div className="absolute inset-0 z-0 scale-110 md:scale-125 translate-y-12 md:translate-y-20">
            <Image
              src="/images/map.svg"
              alt="Map"
              fill
              className="object-contain opacity-50"
              priority
            />
          </div>

          <motion.div
            className="relative z-10 flex flex-wrap justify-center gap-4 md:gap-5 max-w-5xl px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {countries.map((name, i) => {
              const code = getCountryCode(name);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="relative p-0.5 rounded-full"
                >
                  <div className="relative bg-black/40 backdrop-blur-xl px-2 py-2 md:px-6 md:py-2 rounded-full flex items-center gap-3 md:gap-4 border border-white/5 hover:border-violet-500/50 hover:bg-black/70 transition-colors duration-200 cursor-default">
                    <div className="relative w-6 h-6 overflow-hidden rounded-full border border-zinc-800 shadow-sm shrink-0">
                      <Image
                        src={`https://flagcdn.com/${code}.svg`}
                        alt={name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <span className="text-white font-bold text-base md:text-lg tracking-tight">
                      {name}
                    </span>
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

export default Locations;