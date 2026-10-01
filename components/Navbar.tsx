"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Activity } from "lucide-react"; // Imported Activity icon here
import { FaWhatsapp, FaDiscord } from "react-icons/fa";
import { getNavbarConfig, AlertIcon } from "@/lib/navbar";

const Navbar = () => {
  const config = getNavbarConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileLegalOpen, setMobileLegalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-zinc-800/50 ${
          isScrolled
            ? "bg-zinc-950/80 backdrop-blur-xl py-2.5 shadow-2xl"
            : "bg-transparent py-0"
        }`}
      >
        <div
          className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${
            config.alert.enabled && !isScrolled
              ? "max-h-20 opacity-100"
              : "max-h-0 opacity-0"
          } ${config.alert.bgStyle} ${config.alert.borderStyle}`}
        >
          <div className="py-2 px-6 lg:px-10">
            <div className="max-w-360 mx-auto flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <span className="text-white opacity-90">
                  <AlertIcon type={config.alert.promo.iconType} />
                </span>
                <p className={`text-xs lg:text-sm font-medium ${config.alert.promo.textColor}`}>
                  {config.alert.promo.fullMessage}
                </p>
              </div>
              <div className="flex items-center gap-6">
                {config.alert.socials.whatsapp.enabled && (
                  <a href={`https://wa.me/${config.alert.socials.whatsapp.number}`} className="flex items-center gap-2 text-zinc-200 hover:text-white transition-colors text-sm font-medium">
                    <FaWhatsapp size={16} className={config.alert.socials.whatsapp.iconColor} />
                    <span className="hidden lg:inline">{config.alert.socials.whatsapp.label}</span>
                  </a>
                )}
                
                {/* Node Status Hooked Here */}
                {config.alert.socials.status?.enabled && (
                  <a href={config.alert.socials.status.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-200 hover:text-white transition-colors text-sm font-medium">
                    <Activity size={15} className={config.alert.socials.status.iconColor} />
                    <span className="hidden lg:inline">{config.alert.socials.status.label}</span>
                  </a>
                )}

                {config.alert.socials.discord.enabled && (
                  <a href={config.alert.socials.discord.url} className="flex items-center gap-2 text-zinc-200 hover:text-white transition-colors text-sm font-medium">
                    <FaDiscord size={16} className={config.alert.socials.discord.iconColor} />
                    <span className="hidden lg:inline">{config.alert.socials.discord.label}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={`max-w-360 mx-auto flex items-center justify-between px-6 lg:px-10 transition-all duration-500 ${!isScrolled ? 'py-5' : 'py-2.5'}`}>
          <div className="flex items-center md:flex-1">
            <Link href="/" className="flex items-center gap-3.5 group">
              <Image src={config.brand.logoPath} alt="Neuxnode" width={300} height={100} className="w-80 h-8 md:w-40 md:h-10 object-contain transition-transform group-hover:scale-105" />
              <span className="font-bold text-lg md:text-xl tracking-tight text-white">{config.brand.name}</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-center gap-8 lg:gap-10 text-sm font-medium text-zinc-400">
            {config.navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <>
                    <button className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer py-2">
                      {link.name}
                      <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                      <div className="bg-zinc-950 border-2 border-zinc-800/50 rounded-[23px] p-1.5 w-52">
                        {link.items?.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-3 text-zinc-400 hover:text-blue-400 hover:bg-zinc-900/50 rounded-xl transition-all font-medium"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href={link.href!} className="hover:text-white transition-colors relative py-2">
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-5 md:gap-6 md:flex-1 justify-end">
            {config.buttons.login.enabled && (
              <Link href={config.buttons.login.href} className="hidden lg:block text-zinc-400 hover:text-white text-sm font-medium transition-colors">
                {config.buttons.login.label}
              </Link>
            )}
            {config.buttons.signup.enabled && (
              <Link href={config.buttons.signup.href} className="hidden md:flex bg-linear-to-br from-blue-400 via-blue-600 to-blue-800 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all active:scale-95 whitespace-nowrap shadow-lg shadow-blue-900/20">
                {config.buttons.signup.label}
              </Link>
            )}
            <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>
      <div className={`fixed inset-0 z-100 bg-zinc-950 transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Image src={config.brand.logoPath} alt="Logo" width={100} height={132} className="w-7 h-7" />
            <span className="font-bold text-xl text-white uppercase tracking-tight">{config.brand.name}</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-zinc-400"><X size={32} /></button>
        </div>
        <div className="flex flex-col px-10 mt-6 overflow-y-auto max-h-[calc(100dvh-120px)]">
          {config.navLinks.map((link, i) => (
            <div key={link.name} className={`border-b border-white/5 transition-all ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`} style={{ transitionDelay: `${i * 40}ms` }}>
              {link.dropdown ? (
                <>
                  <button onClick={() => setMobileLegalOpen(!mobileLegalOpen)} className="w-full text-base font-bold py-5 text-white flex justify-between items-center">
                    {link.name}
                    <ChevronDown size={20} className={`transition-transform duration-300 ${mobileLegalOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${mobileLegalOpen ? 'max-h-60 pb-4' : 'max-h-0'}`}>
                    {link.items?.map((sub) => (
                      <Link key={sub.name} href={sub.href} onClick={() => setIsOpen(false)} className="block py-3 text-zinc-500 font-medium hover:text-blue-400 transition-colors">
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link href={link.href!} onClick={() => setIsOpen(false)} className="text-base font-bold py-5 text-white flex justify-between items-center">
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          <div className={`flex flex-col gap-4 mt-8 pb-10 transition-all duration-500 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <Link href={config.buttons.signup.href} onClick={() => setIsOpen(false)} className="w-full bg-linear-to-br from-blue-400 via-blue-600 to-blue-800 py-4 rounded-full text-center text-sm font-bold text-white shadow-lg shadow-blue-900/20">
              {config.buttons.signup.label}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;