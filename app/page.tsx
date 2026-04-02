"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Switch } from "@/app/components/ui/switch"
import { Slider } from "@/app/components/ui/slider"
import { cn } from "@/lib/utils"
import { Navbar } from "@/app/components/navbar"
import { InView } from "@/app/components/in-view"
import * as React from "react"
import { ArrowRight, Zap, Palette, Accessibility, Github, BookOpen } from "lucide-react"

export default function Home() {
  const [switchChecked, setSwitchChecked] = React.useState(true)
  const [sliderValue, setSliderValue] = React.useState([75])

  return (
    <div className="min-h-screen bg-[#FDFDFC] text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 dither-pattern pointer-events-none z-0 opacity-20" />
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#A388EE]/20 rounded-full blur-[120px] -z-10" />
      
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative pt-16 pb-12 md:pt-24 md:pb-16 overflow-hidden">
          <InView triggerOnce>
            {(inView) => (
              <div className="container mx-auto px-4">
                <div className="relative mx-auto max-w-5xl">
                  {/* Floating Badges */}
                  <div className={cn("absolute -top-12 -left-4 md:-left-12 rotate-[-12deg] bg-[#F4FD50] border-4 border-black px-4 py-2 font-black text-xl neobrutalism-shadow-sm hidden md:block opacity-0", inView && "animate-text-reveal")} style={{ animationDelay: '0.1s', '--rotation': '-12deg' } as React.CSSProperties}>
                    RADICAL UI
                  </div>
                  <div className={cn("absolute top-0 -right-4 md:-right-8 rotate-[8deg] bg-[#56E3A6] border-4 border-black px-4 py-2 font-black text-xl neobrutalism-shadow-md hidden md:block opacity-0", inView && "animate-text-reveal")} style={{ animationDelay: '0.2s', '--rotation': '8deg' } as React.CSSProperties}>
                    ZERO BLOAT
                  </div>
                  
                  <div className="text-center text-balance">
                    <h1 className="mb-4 text-6xl font-black leading-[0.9] md:text-9xl tracking-tighter uppercase whitespace-pre-line">
                      <span className={cn("block opacity-0", inView && "animate-text-reveal")} style={{ animationDelay: '0.3s' }}>Loud Shapes.</span>
                      <span className={cn("block opacity-0 text-primary italic", inView && "animate-text-reveal")} style={{ animationDelay: '0.5s' }}>Solid Lines.</span>
                    </h1>
                    
                    <p className={cn("mb-8 text-xl md:text-2xl font-bold max-w-3xl mx-auto text-muted-foreground leading-relaxed opacity-0", inView && "animate-text-reveal")} style={{ animationDelay: '0.7s' }}>
                      Opinionated components that look intentional. Give your apps that premium, hand-crafted aesthetic with a toolkit designed to be seen.
                    </p>
                    
                    <div className={cn("flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0", inView && "animate-text-reveal")} style={{ animationDelay: '0.9s' }}>
                      <Link href="/docs/installation">
                        <Button size="lg" className="h-auto px-12 py-6 text-2xl font-black border-4 border-black neobrutalism-shadow active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all group">
                          Get Started
                          <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      <Link href="/docs/components/accordion">
                        <Button variant="outline" size="lg" className="h-auto px-12 py-6 text-2xl font-black border-4 border-black neobrutalism-shadow active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
                          Browse Components
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </InView>
          
          {/* Marquee or Row of items */}
          <div className="mt-10 border-y-4 border-black bg-white py-4 overflow-hidden select-none whitespace-nowrap">
            <div className="flex animate-marquee gap-12 text-2xl font-black uppercase">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center gap-12">
                  <span>Open Source</span>
                  <span className="text-primary">✦</span>
                  <span>Typescript First</span>
                  <span className="text-primary">✦</span>
                  <span>Modern Aesthetics</span>
                  <span className="text-primary">✦</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Things Intro Section */}
        <InView triggerOnce>
          {(inView) => (
            <section className="container mx-auto px-4 py-24 md:py-32 overflow-hidden">
              <div className="max-w-6xl mx-auto space-y-6">
                <p className="text-4xl md:text-7xl font-black leading-[1.1] tracking-tight uppercase transition-all duration-500">
                  <span className={cn("block opacity-0", inView && "animate-text-reveal")} style={{ animationDelay: '0.1s' }}>
                    <span className="inline-flex items-baseline gap-4 group">
                      <span className="text-primary italic underline decoration-8 decoration-black/10 group-hover:decoration-black cursor-default transition-all">Things</span>
                      <div className="h-[0.8em] w-[0.8em] rotate-[-12deg] group-hover:rotate-0 transition-transform duration-300 ease-out" style={{ '--rotation': '-12deg' } as React.CSSProperties}>
                        <svg
                          className="h-full w-full"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="32" height="32" fill="currentColor" />
                          <rect x="6" y="6" width="20" height="20" fill="hsl(var(--background))" />
                          <rect x="10" y="10" width="12" height="12" fill="currentColor"/>
                        </svg>
                      </div>
                    </span>{" "}
                    is a radical UI library
                  </span>
                  <span className={cn("block opacity-0", inView && "animate-text-reveal")} style={{ animationDelay: '0.3s' }}>
                    that blends{" "}
                    <span className="italic text-black/40 decoration-primary decoration-4 underline underline-offset-8 hover:text-black transition-colors">Neobrutalism</span>,{" "}
                    <span className="italic transition-all hover:text-primary cursor-default underline decoration-black/10 decoration-4">Performance</span>,
                  </span>
                  <span className={cn("block opacity-0", inView && "animate-text-reveal")} style={{ animationDelay: '0.5s' }}>
                    and <span className="bg-[#56E3A6] px-4 py-1 border-4 border-black neobrutalism-shadow-xs inline-block rotate-[-2deg] hover:rotate-0 transition-transform" style={{ '--rotation': '-2deg' } as React.CSSProperties}>High-Fidelity Components</span>
                  </span>
                  <span className={cn("block opacity-0", inView && "animate-text-reveal")} style={{ animationDelay: '0.7s' }}>
                    into cohesive user experiences. We turn loud ideas into
                  </span>
                  <span className={cn("block opacity-0", inView && "animate-text-reveal")} style={{ animationDelay: '0.9s' }}>
                    <span className="inline-block bg-primary text-white px-8 py-3 rounded-full border-4 border-black neobrutalism-shadow hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">.READY_NOW</span> realities.
                  </span>
                </p>
              </div>
            </section>
          )}
        </InView>

        {/* Triple Feature Grid */}
        <section className="container mx-auto px-4 py-24">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-4 bg-[#A388EE] neobrutalism-shadow-lg group hover:-translate-y-2 transition-transform">
              <CardHeader>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg border-4 border-black bg-white text-3xl neobrutalism-shadow-sm">
                  <Zap className="h-10 w-10 fill-yellow-400 text-black" strokeWidth={3} />
                </div>
                <CardTitle className="text-3xl font-black uppercase underline decoration-4 decoration-black/20">Instant Deployment</CardTitle>
                <CardDescription className="text-black font-bold text-lg leading-snug">
                  Copy-paste components or use our CLI. No heavy dependencies, no complex setup. Just raw speed.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-4 bg-[#56E3A6] neobrutalism-shadow-lg group hover:-translate-y-2 transition-transform">
              <CardHeader>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg border-4 border-black bg-white text-3xl neobrutalism-shadow-sm">
                  <Palette className="h-10 w-10 text-black" strokeWidth={3} />
                </div>
                <CardTitle className="text-3xl font-black uppercase underline decoration-4 decoration-black/20">Styling Freedom</CardTitle>
                <CardDescription className="text-black font-bold text-lg leading-snug">
                  Fully powered by Tailwind CSS. Adjust every stroke, shadow, and corner to fit your brand exactly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-4 bg-[#FFD166] neobrutalism-shadow-lg group hover:-translate-y-2 transition-transform">
              <CardHeader>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg border-4 border-black bg-white text-3xl neobrutalism-shadow-sm">
                  <Accessibility className="h-10 w-10 text-black" strokeWidth={3} />
                </div>
                <CardTitle className="text-3xl font-black uppercase underline decoration-4 decoration-black/20">Built for All</CardTitle>
                <CardDescription className="text-black font-bold text-lg leading-snug">
                  Accessibility is baked in from the start. Screen readers, keyboard navigation, we handle it all.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Components Interactive Showcase */}
        <section id="components" className="container mx-auto px-4 py-24">
          <div className="mb-16 flex flex-col items-center md:items-start md:flex-row md:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="mb-4 text-7xl font-black uppercase leading-[0.85]">The Core <br/><span className="text-primary">Library</span></h2>
              <p className="text-2xl font-bold text-muted-foreground">
                High-fidelity components designed with radical intentionality.
              </p>
            </div>
            <Link href="/docs/components/accordion" className="self-end pb-2">
              <Button size="lg" variant="outline" className="h-auto px-8 py-4 text-xl font-black border-4 border-black neobrutalism-shadow">
                See Documentation
              </Button>
            </Link>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {/* Component Card: Button */}
            <div className="p-8 rounded-xl border-4 border-black bg-white neobrutalism-shadow-lg flex flex-col gap-8">
              <div>
                <h3 className="text-3xl font-black uppercase">Button</h3>
                <p className="font-bold text-muted-foreground">High contrast, tactile buttons.</p>
              </div>
              <div className="flex flex-wrap gap-4 items-center justify-center py-6 bg-primary/5 rounded-lg border-2 border-dashed border-black/20">
                <Button className="font-black border-2 border-black">SUBMIT</Button>
                <Button variant="outline" className="font-black border-2 border-black neobrutalism-shadow-sm h-10">CANCEL</Button>
                <Button variant="destructive" className="font-black border-2 border-black">DELETE</Button>
              </div>
            </div>

            {/* Component Card: Input */}
            <div className="p-8 rounded-xl border-4 border-black bg-white neobrutalism-shadow-lg flex flex-col gap-8">
              <div>
                <h3 className="text-3xl font-black uppercase">Input</h3>
                <p className="font-bold text-muted-foreground">Bold borders and thick shadows.</p>
              </div>
              <div className="space-y-4 py-6 px-4 bg-[#56E3A6]/10 rounded-lg border-2 border-dashed border-black/20">
                <Input placeholder="Enter your email" className="font-bold neobrutalism-shadow-sm h-12" />
              </div>
            </div>

            {/* Component Card: Controls */}
            <div className="p-8 rounded-xl border-4 border-black bg-white neobrutalism-shadow-lg flex flex-col gap-8">
              <div>
                <h3 className="text-3xl font-black uppercase">Controls</h3>
                <p className="font-bold text-muted-foreground">Tactile switches and sliders.</p>
              </div>
              <div className="space-y-6 py-6 px-4 bg-[#A388EE]/10 rounded-lg border-2 border-dashed border-black/20">
                <div className="flex items-center justify-between">
                  <span className="font-black uppercase text-xs">Enable Turbo</span>
                  <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-black">
                    <span>VOLUME</span>
                    <span>{sliderValue[0]}%</span>
                  </div>
                  <Slider value={sliderValue} onValueChange={setSliderValue} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Big CTA Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 -z-10 rounded-3xl" />
            <div className="relative border-[6px] border-black bg-white p-12 md:p-24 rounded-3xl text-center">
              <h2 className="mb-8 text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter">
                Ready to build <br/> something <span className="text-primary underline decoration-[12px] decoration-black/10">unforgettable?</span>
              </h2>
              <div className="flex flex-col md:flex-row justify-center gap-8 pt-8">
                <Link href="/docs">
                  <Button size="lg" className="w-full md:w-auto h-auto text-3xl px-16 py-10 font-black border-4 border-black neobrutalism-shadow-lg bg-primary text-white hover:bg-primary/90 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all">
                    <BookOpen className="mr-4 h-10 w-10" strokeWidth={3} />
                    READ DOCS
                  </Button>
                </Link>
                <a href="https://github.com/marvlock/things" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="w-full md:w-auto h-auto text-3xl px-16 py-10 font-black border-4 border-black neobrutalism-shadow-lg hover:bg-neutral-50 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all">
                    <Github className="mr-4 h-10 w-10" />
                    GITHUB
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Footer */}
        <footer className="border-t-[6px] border-black bg-white pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-16 md:grid-cols-4 luxury-grid">
              <div className="md:col-span-2">
                <Link href="/" className="inline-block mb-8 text-4xl font-black uppercase tracking-tighter">
                  Things<span className="text-primary">.</span>
                </Link>
                <p className="text-2xl font-bold text-muted-foreground max-w-md leading-snug">
                  The boldest toolkit for developers who aren't afraid to stand out. Built with precision and radical design.
                </p>
                <div className="mt-8 flex gap-6">
                  <a href="https://github.com/marvlock/things" target="_blank" rel="noopener noreferrer" className="h-14 w-14 flex items-center justify-center border-4 border-black bg-white neobrutalism-shadow-sm hover:bg-[#56E3A6] transition-colors active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                    <Github className="h-8 w-8" />
                  </a>
                  <a href="https://marvlock.dev" target="_blank" rel="noopener noreferrer" className="h-14 w-14 p-1 flex items-center justify-center border-4 border-black bg-white neobrutalism-shadow-sm hover:bg-[#A388EE] transition-colors active:translate-x-[2px] active:translate-y-[2px] active:shadow-none overflow-hidden">
                    <img src="/marvlock-logo.png" alt="Marvlock" className="w-full h-full object-contain" />
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="mb-6 text-xl font-black uppercase tracking-widest text-muted-foreground">Library</h3>
                <ul className="space-y-4 text-xl font-black">
                  <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
                  <li><Link href="/docs/installation" className="hover:text-primary transition-colors">Installation</Link></li>
                  <li><Link href="/docs/components/button" className="hover:text-primary transition-colors">Components</Link></li>
                  <li><Link href="/docs/examples" className="hover:text-primary transition-colors">Examples</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="mb-6 text-xl font-black uppercase tracking-widest text-muted-foreground">About</h3>
                <ul className="space-y-4 text-xl font-black">
                  <li><a href="https://github.com/marvlock/things/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">License</a></li>
                  <li><a href="https://github.com/marvlock/things" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Contribute</a></li>
                  <li><Link href="/docs/resources" className="hover:text-primary transition-colors">Design Kit</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-24 pt-12 border-t-4 border-black flex flex-col md:flex-row justify-between items-center gap-8 font-black uppercase tracking-tight text-muted-foreground">
              <p>© {new Date().getFullYear()} Things. All rights reserved.</p>
              <div className="flex gap-12 font-black uppercase tracking-tight">
                <Link href="/privacy" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-4">Privacy</Link>
                <Link href="/terms" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-4">Terms</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
