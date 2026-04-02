"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Navbar } from "@/app/components/navbar"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFC] text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="fixed inset-0 dither-pattern pointer-events-none z-0 opacity-20" />
      
      <div className="relative z-10">
        <Navbar />
        
        <main className="container mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl border-4 border-black bg-white p-8 md:p-16 neobrutalism-shadow-lg rounded-3xl">
            <h1 className="mb-8 text-6xl font-black uppercase tracking-tighter italic text-primary underline decoration-8 decoration-black/10">Privacy Policy</h1>
            
            <div className="prose prose-xl font-bold space-y-8 text-muted-foreground leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-3xl font-black text-black uppercase tracking-tight border-b-4 border-black inline-block">1. Data Collection</h2>
                <p>
                  "Things" is a collection of open-source UI components. When you visit this website, we do not collect any personal data. We don't use cookies, and we don't track you across the web.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-3xl font-black text-black uppercase tracking-tight border-b-4 border-black inline-block">2. Local Storage</h2>
                <p>
                  Some of our components (like the search or theme switchers) may use your browser's local storage to remember your preferences. This data never leaves your machine.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-3xl font-black text-black uppercase tracking-tight border-b-4 border-black inline-block">3. Third Parties</h2>
                <p>
                  Our documentation may link to external sites like GitHub or Figma. Once you leave our domain, their respective privacy policies apply.
                </p>
              </section>

              <section className="space-y-4 pt-8">
                <p className="text-sm italic">Last updated: April 2026. Keep it loud.</p>
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
