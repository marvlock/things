import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
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
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 font-bold">
                View Components
              </Button>
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
            <Button variant="outline" size="lg" className="bg-background text-foreground">
              Read the Docs
            </Button>
            <Button size="lg" variant="secondary" className="bg-secondary text-secondary-foreground">
              View on GitHub
            </Button>
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
                  <a href="#docs" className="hover:text-primary font-bold">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#components" className="hover:text-primary font-bold">
                    Components
                  </a>
                </li>
                <li>
                  <a href="https://github.com" className="hover:text-primary font-bold">
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
  )
}
