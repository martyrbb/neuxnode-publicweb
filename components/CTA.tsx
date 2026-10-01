"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, MessageSquare } from "lucide-react";
import Link from "next/link";
import ctaData from "@/config/home/cta.json";

const CTA = () => {
  const { header, primaryBtn, secondaryBtn } = ctaData;

  return (
    <section className="w-full py-20 relative overflow-hidden bg-black">
      <div className="absolute -left-24 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-360 mx-auto px-6 lg:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative p-0.5 rounded-[40px] overflow-hidden bg-linear-to-tr from-zinc-900 via-blue-600/40 to-zinc-900"
        >
          <div className="relative bg-black rounded-[38px] px-8 py-16 md:py-24 flex flex-col items-center text-center">
            <h2 className="text-white text-4xl md:text-7xl font-extrabold tracking-tight mb-6">
              {header.title}<br />
              <span className="bg-linear-to-br from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                {header.accent}
              </span>
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mb-12">
              {header.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link 
                  href={primaryBtn.href} 
                  className="flex items-center justify-center gap-2 px-10 md:px-12 py-4 rounded-full bg-linear-to-br from-blue-400 via-blue-600 to-blue-800 text-white font-bold transition-all shadow-xl shadow-blue-900/30 text-center"
                >
                  <ShoppingCart size={20} />
                  {primaryBtn.text}
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link 
                  href={secondaryBtn.href} 
                  className="flex items-center justify-center gap-2 px-10 md:px-12 py-4 rounded-full text-zinc-300 border border-zinc-800 hover:text-white hover:bg-white/5 transition-all text-center font-bold"
                >
                  <MessageSquare size={20} />
                  {secondaryBtn.text}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;