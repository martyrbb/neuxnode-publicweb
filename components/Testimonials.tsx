"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import testimonialsData from "@/config/home/testimonials.json";

const getStarColor = (rating: number) => {
  if (rating <= 1) return "text-[#FF3722]";
  if (rating === 2) return "text-[#FF8622]";
  if (rating === 3) return "text-[#FFCE00]";
  if (rating === 4) return "text-[#73CF11]";
  return "text-[#00B67A]";
};

const Testimonials = () => {
  const { header, reviews, trustpilotUrl } = testimonialsData;
  const [currentPage, setCurrentPage] = useState(0);
  
  const cardsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / cardsPerPage);

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  const currentReviews = reviews.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  return (
    <section className="w-full py-20 bg-black relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-violet-600/10 rounded-full blur-[140px] -z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-360 mx-auto px-6 lg:px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="text-left">
            <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">
              {header.title} <span className="bg-linear-to-br from-violet-400 via-violet-600 to-violet-800 bg-clip-text text-transparent">{header.accent}</span>
            </h2>
            <p className="mt-2 text-zinc-400 text-md font-bold max-w-xl">
              {header.description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={prevPage}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-violet-500/50 flex items-center justify-center text-zinc-500 hover:text-white hover:border-violet-500/50 hover:bg-black/80 transition-all bg-black/40 backdrop-blur-xl group shadow-sm"
            >
              <FaChevronLeft size={14} className="group-active:scale-90 transition-transform" />
            </button>
            <button 
              onClick={nextPage}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-violet-500/50 flex items-center justify-center text-zinc-500 hover:text-white hover:border-violet-500/50 hover:bg-black/80 transition-all bg-black/40 backdrop-blur-xl group shadow-sm"
            >
              <FaChevronRight size={14} className="group-active:scale-90 transition-transform" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <AnimatePresence mode="popLayout">
            {currentReviews.map((review, i) => (
              <motion.div
                key={`${currentPage}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="relative p-0.5 rounded-3xl"
              >
                <div className="relative bg-black/40 backdrop-blur-xl p-8 rounded-[23px] h-full flex flex-col gap-6 border-2 border-zinc-800/50 hover:border-violet-500/50 transition-colors duration-200">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 overflow-hidden rounded-full border border-zinc-800 bg-zinc-900 shrink-0 flex items-center justify-center">
                      <svg 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-8 h-8 text-white/90 translate-y-1"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg tracking-tight">{review.name}</h4>
                      <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest">{review.handle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, starIndex) => (
                      <FaStar 
                        key={starIndex} 
                        size={20} 
                        className={starIndex < review.rating ? getStarColor(review.rating) : "text-zinc-800"} 
                      />
                    ))}
                  </div>
                  <p className="text-zinc-400 font-bold text-base leading-relaxed">
                    {review.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-12 flex flex-col items-center gap-10">
          <div className="flex items-center gap-3">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentPage === i ? "w-8 bg-violet-400" : "w-2 bg-zinc-800"
                }`}
              />
            ))}
          </div>
          <motion.a
            href={trustpilotUrl}
            target="_blank"
            whileHover={{ y: -4 }}
            className="relative bg-emerald-900/50 backdrop-blur-xl px-6 py-3 rounded-xl flex items-center gap-3 border-2 border-emerald-500/50 transition-all group"
          >
            <FaStar className="text-emerald-500" size={16} />
            <span className="text-emerald-500 font-semibold text-base sm:text-lg">
              Read all reviews on Trustpilot
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;