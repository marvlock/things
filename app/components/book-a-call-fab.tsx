"use client"

import * as React from "react"
import { Calendar } from "lucide-react"

export function BookACallFAB() {
  return (
    <div className="fixed bottom-8 right-8 z-[100] group">
      <a
        href="https://marvlock.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-primary border-[3px] border-black px-8 py-4 rounded-full text-white font-black text-xl neobrutalism-shadow-lg transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
      >
        <Calendar className="w-6 h-6 stroke-[3]" />
        <span className="uppercase tracking-tighter">Book a call</span>
        
        {/* Subtle badge indicator */}
        <div className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
        </div>
      </a>
    </div>
  )
}
