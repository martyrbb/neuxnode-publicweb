"use client";

import React from "react";
import { useParams } from "next/navigation";
import tos from "@/config/legal/terms-of-service.json";
import privacy from "@/config/legal/privacy-policy.json";
import sla from "@/config/legal/service-level-agreement.json";
import refund from "@/config/legal/refund-policy.json";

type PolicyItem = {
  title: string;
  desc: string;
};

type PolicyData = {
  title: string;
  lastUpdated: string;
  description: string;
  policies: PolicyItem[];
};

const policyMap: Record<string, PolicyData> = {
  "terms-of-service": tos,
  "privacy-policy": privacy,
  "service-level-agreement": sla,
  "refund-policy": refund,
};

export default function PolicyDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const data = policyMap[slug];

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-zinc-600 flex items-center justify-center">
        <p className="text-base">Policy not found</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-[#e2e8f0] pt-48 pb-24 px-6">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="bg-zinc-900/50 rounded-xl p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            {data.title}
          </h1>
          <p className="text-zinc-500 text-sm mb-6">
            Last updated: {data.lastUpdated}
          </p>
          <p className="text-zinc-300 text-lg leading-relaxed">
            {data.description}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {data.policies.map((item, i) => (
            <div
              key={i}
              className="bg-zinc-900/50 p-8 md:p-10 rounded-xl"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                {item.title}
              </h2>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}