"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Switch } from "@/app/components/ui/switch"
import { Slider } from "@/app/components/ui/slider"
import { Navbar } from "@/app/components/navbar"
import * as React from "react"

export default function Home() {
  const [switchChecked, setSwitchChecked] = React.useState(false)
  const [sliderValue, setSliderValue] = React.useState([50])

  return (
    <div className="min-h-screen bg-background relative">
      {/* Dithering overlay */}
      <div className="fixed inset-0 dither-pattern pointer-events-none z-0 opacity-50" />
      
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
              The Blocky Toolkit for Modern Web Apps
            </h1>
            
            <p className="mb-8 text-lg md:text-xl max-w-3xl mx-auto">
              Loud shapes, strong lines, zero fluff. These components give you a solid, opinionated starting point 
              for any design system that wants to look intentional, crafted, and delightfully bold.
            </p>
            
            <div className="flex items-center justify-center">
              <Link href="/docs/components/button">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 font-bold">
                  View Components
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-4">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border-2 border-foreground bg-primary text-2xl font-bold text-primary-foreground neobrutalism-shadow-sm">
                ⚡
              </div>
              <CardTitle>Copy & Paste</CardTitle>
              <CardDescription>
                No npm installs. Just copy components directly into your project.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-4">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border-2 border-foreground bg-primary text-2xl font-bold text-primary-foreground neobrutalism-shadow-sm">
                🎨
              </div>
              <CardTitle>Fully Customizable</CardTitle>
              <CardDescription>
                Built with Tailwind CSS. Style it however you want.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-4">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border-2 border-foreground bg-primary text-2xl font-bold text-primary-foreground neobrutalism-shadow-sm">
                ♿
              </div>
              <CardTitle>Accessible</CardTitle>
              <CardDescription>
                Accessible by default.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Components Showcase */}
      <section id="components" className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-5xl font-bold">Components</h2>
          <p className="text-xl text-muted-foreground">
            Beautiful, accessible components ready to use
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-4">
            <CardHeader>
              <CardTitle>Button</CardTitle>
              <CardDescription>
                Clickable button component with things styling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-4">
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>
                Form input with bold borders and shadow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Enter your email" />
              <Input type="password" placeholder="Password" />
            </CardContent>
          </Card>

          <Card className="border-4">
            <CardHeader>
              <CardTitle>Card</CardTitle>
              <CardDescription>
                Container component with things styling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Cards have bold borders and shadows that create depth.
              </p>
            </CardContent>
          </Card>

          <Card className="border-4">
            <CardHeader>
              <CardTitle>Textarea</CardTitle>
              <CardDescription>
                Multi-line text input with blocky styling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea placeholder="Enter your message..." />
            </CardContent>
          </Card>

          <Card className="border-4">
            <CardHeader>
              <CardTitle>Switch</CardTitle>
              <CardDescription>
                Toggle switch with blocky styling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold">Enable feature</label>
                <Switch checked={switchChecked} onChange={(e) => setSwitchChecked(e.target.checked)} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-4">
            <CardHeader>
              <CardTitle>Slider</CardTitle>
              <CardDescription>
                Range slider with blocky styling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold">Value</label>
                  <span className="text-sm font-bold">{sliderValue[0]}%</span>
                </div>
                <Slider value={sliderValue} onValueChange={setSliderValue} />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="border-4 bg-primary text-primary-foreground">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl">Ready to get started?</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Start building beautiful interfaces with Things
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-4">
            <Link href="/docs">
              <Button variant="outline" size="lg" className="bg-background text-foreground">
                Read the Docs
              </Button>
            </Link>
            <Link href="https://github.com/marvlock/things" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="bg-secondary text-secondary-foreground">
                View on GitHub
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-foreground bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-bold">Things</h3>
              <p className="text-sm text-muted-foreground">
                A collection of things-styled components.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/docs" className="hover:text-primary font-bold">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/docs/components/button" className="hover:text-primary font-bold">
                    Components
                  </Link>
                </li>
                <li>
                  <a href="https://github.com/marvlock/things" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-bold">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">License</h3>
              <p className="text-sm text-muted-foreground">
                Released under MIT License. Free to use for personal and commercial projects.
              </p>
            </div>
          </div>
          <div className="mt-8 border-t-2 border-foreground pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Things. Built with Next.js and Tailwind CSS.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}
