"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Partners from "./Partners";
import Features from "./Features";
import Locations from "./Locations";
import Hardware from "./Hardware";
import Services from "./Services";
import FAQ from "./FAQ";
import Panel from "./Panel";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import heroConfig from "@/config/home/hero.json";

const HeroSection = () => {
  const { content, sections } = heroConfig;

  return (
    <>
      <section className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden pt-32 md:pt-48">
        <div className="absolute inset-0 z-0 bg-black">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src="/images/hytale-bg.webp"
              alt="Background Illustration"
              fill
              className="object-cover"
              style={{ objectPosition: 'center 10%' }}
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-b from-black via-black/20 to-black z-10" />
        </div>

        <div className="max-w-360 mx-auto px-6 lg:px-10 w-full relative z-20 text-center">
          <div className="mb-6 md:mb-8">
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-tight md:leading-none">
              {content.title} <br />
              <span className="text-blue-500">{content.accent}</span>
            </h1>
          </div>

          <p className="text-zinc-400 text-sm md:text-lg lg:text-xl max-w-5xl mx-auto mb-10 md:mb-12 font-medium leading-relaxed">
            {content.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5">
            <Link
              href={content.primaryBtn.href}
              className="w-full sm:w-auto bg-linear-to-br from-blue-400 via-blue-600 to-blue-800 px-10 md:px-12 py-4 rounded-full text-sm md:text-md font-bold text-white transition-all active:scale-95 shadow-xl shadow-blue-900/30 text-center"
            >
              {content.primaryBtn.text}
            </Link>

            <Link
              href={content.secondaryBtn.href}
              className="w-full sm:w-auto px-10 md:px-12 py-4 rounded-full text-sm md:text-md font-bold text-zinc-300 border border-zinc-800 hover:text-white hover:bg-white/5 transition-all text-center"
            >
              {content.secondaryBtn.text}
            </Link>
          </div>

          {sections.partners && (
            <div className="mt-8 md:mt-16 w-full">
              <Partners />
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full" />
      </section>

      <div className="bg-black py-5 md:py-20">
        {sections.features && <Features />}
        {sections.services && <Services />}
        {sections.locations && <Locations />}
        {sections.panel && <Panel />}
        {sections.hardware && <Hardware />}
        {sections.testimonials && <Testimonials />}
        {sections.faq && <FAQ />}
        {sections.cta && <CTA />}
      </div>
    </>
  );
};

export default HeroSection;