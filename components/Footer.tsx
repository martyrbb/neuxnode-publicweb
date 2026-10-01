"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  getFooterConfig, 
  SocialIcon, 
  SocialLink, 
  FooterSection, 
  FooterLink,
  getAppConfig
} from "@/lib/footer";

const Footer = () => {
  const appConfig = getAppConfig();
  const config = getFooterConfig();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black relative border-t border-blue-500/30">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_20px_rgba(139,92,246,0.3)]" />
      <div className="w-full px-6 md:px-12 lg:px-20 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-y-12 gap-x-8 items-start">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/images/neuxnode-logo.png"
                alt="{`${appConfig.site.name} Logo`}"
                width={200}
                height={40}
                className="object-contain"
              />
              <h3 className="text-white text-2xl font-bold leading-none">
                
              </h3>
            </div>
            <p className="text-zinc-400 text-md font-medium max-w-md">
              {config.brand.description}
            </p>
            <div className="flex gap-5">
              {config.socials.map((social: SocialLink) => social.enabled && (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, color: "#8B5CF6" }}
                  className="text-zinc-400 transition-colors"
                >
                  <SocialIcon platform={social.platform} />
                </motion.a>
              ))}
            </div>
          </div>
          {config.sections?.map((section: FooterSection) => (
            <div key={section.title} className="space-y-2">
              <h4 className="text-blue-100 font-bold text-lg md:text-2xl">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link: FooterLink) => (
                  <li key={link.label} className="relative group w-fit">
                    <Link href={link.url} className="group flex items-center text-zinc-500 hover:text-blue-300 transition-all duration-300 text-md font-semibold min-h-8">
                    <span className="capitalize group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 border-t-2 border-zinc-800">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-zinc-400 text-md font-semibold">
              © {currentYear} {appConfig.site.name}. All rights reserved.
            </p>
            {config.watermark.enabled && (
               <p className="text-zinc-500 text-sm font-medium">
               We are not affiliated with{" "}
               <a
                 href={config.watermark.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-blue-500 hover:text-blue-400 transition-colors font-semibold"
               >
                 Mojang AB or Microsoft Corp
               </a>
             </p>
            )}
          </div>
          <Link
            href={config.status.url}
            className="flex items-center gap-2 bg-emerald-900/40 px-3 py-1.5 rounded-full border-2 border-emerald-500/50 hover:bg-emerald-950/15 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="text-emerald-400 text-xs font-bold">
              {config.status.text}
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;