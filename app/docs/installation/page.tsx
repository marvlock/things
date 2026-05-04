"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { CodeBlock } from "@/app/components/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Markdown } from "@/app/components/ui/markdown"

export default function InstallationPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Installation</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Get started with Things in your project.
        </p>

        <div className="max-w-none space-y-6">
          <Markdown className="text-xl">
            {`Things components are built with **shadcn/ui** standards. You can install them via our CLI registry or copy the code manually.`}
          </Markdown>

          <h2 className="text-4xl font-bold mt-12 mb-4 tracking-tight border-b-4 border-foreground pb-2 inline-block">Option 1: CLI (Recommended)</h2>
          <p>
            The fastest way to install components. This automatically handles dependencies and places files in your `components/ui` folder.
          </p>
          
          <Tabs defaultValue="npm" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              <TabsTrigger value="yarn">yarn</TabsTrigger>
              <TabsTrigger value="bun">bun</TabsTrigger>
            </TabsList>
            <TabsContent value="npm">
              <div className="space-y-4">
                <p className="text-sm font-bold opacity-80">Initialize shadcn (if not already done):</p>
                <CodeBlock code="npx shadcn@latest init" language="bash" />
                <p className="text-sm font-bold opacity-80">Add a component (e.g. Button):</p>
                <CodeBlock code="npx shadcn@latest add https://things.marvlock.dev/registry/ui/button.json" language="bash" />
              </div>
            </TabsContent>
            <TabsContent value="pnpm">
              <div className="space-y-4">
                <p className="text-sm font-bold opacity-80">Initialize shadcn:</p>
                <CodeBlock code="pnpm dlx shadcn@latest init" language="bash" />
                <p className="text-sm font-bold opacity-80">Add a component:</p>
                <CodeBlock code="pnpm dlx shadcn@latest add https://things.marvlock.dev/registry/ui/button.json" language="bash" />
              </div>
            </TabsContent>
            <TabsContent value="yarn">
              <div className="space-y-4">
                <p className="text-sm font-bold opacity-80">Initialize shadcn:</p>
                <CodeBlock code="yarn dlx shadcn@latest init" language="bash" />
                <p className="text-sm font-bold opacity-80">Add a component:</p>
                <CodeBlock code="yarn dlx shadcn@latest add https://things.marvlock.dev/registry/ui/button.json" language="bash" />
              </div>
            </TabsContent>
            <TabsContent value="bun">
              <div className="space-y-4">
                <p className="text-sm font-bold opacity-80">Initialize shadcn:</p>
                <CodeBlock code="bunx --bun shadcn@latest init" language="bash" />
                <p className="text-sm font-bold opacity-80">Add a component:</p>
                <CodeBlock code="bunx --bun shadcn@latest add https://things.marvlock.dev/registry/ui/button.json" language="bash" />
              </div>
            </TabsContent>
          </Tabs>

          <h2 className="text-4xl font-bold mt-16 mb-4 tracking-tight border-b-4 border-foreground pb-2 inline-block">Option 2: Manual</h2>
          
          <h3 className="text-2xl font-bold mt-6 mb-3">1. Install core dependencies</h3>
          <p>Choose your preferred package manager to install the required styling utilities:</p>
          <Tabs defaultValue="npm" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              <TabsTrigger value="yarn">yarn</TabsTrigger>
              <TabsTrigger value="bun">bun</TabsTrigger>
            </TabsList>
            <TabsContent value="npm">
              <CodeBlock code="npm install class-variance-authority clsx tailwind-merge lucide-react" language="bash" />
            </TabsContent>
            <TabsContent value="pnpm">
              <CodeBlock code="pnpm add class-variance-authority clsx tailwind-merge lucide-react" language="bash" />
            </TabsContent>
            <TabsContent value="yarn">
              <CodeBlock code="yarn add class-variance-authority clsx tailwind-merge lucide-react" language="bash" />
            </TabsContent>
            <TabsContent value="bun">
              <CodeBlock code="bun add class-variance-authority clsx tailwind-merge lucide-react" language="bash" />
            </TabsContent>
          </Tabs>

          <h3 className="text-2xl font-bold mt-8 mb-3">2. Add the utils helper</h3>
          <p>
            Create <code className="bg-muted px-1 py-0.5 rounded">lib/utils.ts</code>:
          </p>
          <CodeBlock
            code={`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
            language="typescript"
          />

          <h3 className="text-2xl font-bold mt-8 mb-3">3. Copy and Paste</h3>
          <Markdown>
            {`Browse the documentation for any component and copy either the **TypeScript** or **JavaScript** code into your project.`}
          </Markdown>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs">
            <Button variant="outline" size="lg">
              ← Introduction
            </Button>
          </Link>
          <Link href="/docs/changelog">
            <Button variant="outline" size="lg">
              Changelog →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
