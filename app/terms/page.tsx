"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Navbar } from "@/app/components/navbar"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFC] text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="fixed inset-0 dither-pattern pointer-events-none z-0 opacity-20" />
      
      <div className="relative z-10">
        <Navbar />
        
        <main className="container mx-auto px-4 py-24 md:py-32 text-balance leading-relaxed">
          <div className="mx-auto max-w-4xl border-4 border-black bg-white p-8 md:p-16 neobrutalism-shadow-lg rounded-3xl">
            <h1 className="mb-12 text-6xl font-black uppercase tracking-tighter italic text-orange-500 underline decoration-8 decoration-black/10">Terms of Use</h1>
            
            <div className="prose prose-xl font-bold space-y-12 text-muted-foreground leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-4xl font-black text-black uppercase tracking-tight border-b-4 border-black inline-block">1. Licensing</h2>
                <p>
                  "Things" is released under the **MIT License**. This means you are free to use it for personal and commercial projects, modify the code, and redistribute it. We only ask that you keep the original license notice.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-4xl font-black text-black uppercase tracking-tight border-b-4 border-black inline-block">2. Usage</h2>
                <p>
                  You are solely responsible for how you use these components. While we've built them to be accessible and robust, you should always audit your own implementation to ensure they meet your production standards.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-4xl font-black text-black uppercase tracking-tight border-b-4 border-black inline-block">3. No Warranty</h2>
                <p>
                  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. THE AUTHORS OR COPYRIGHT HOLDERS SHALL NOT BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY. 
                </p>
              </section>

              <section className="space-y-4 pt-12 border-t-4 border-black/5">
                <p className="text-sm italic">Last updated: April 2026. Stay radical.</p>
              </section>
            </div>

            <div className="mt-16 flex justify-start">
              <Link href="/">
                <Button size="lg" variant="outline" className="h-auto px-8 py-4 text-xl font-black border-4 border-black neobrutalism-shadow-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer">
                  ← BACK HOME
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
