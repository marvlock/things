import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { CodeBlock } from "@/app/components/code-block"

export default function InstallationPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Installation</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Get started with Things in your project.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            Things components are designed to be copied directly into your project. There&apos;s no 
            npm package to install, no UI library dependencies. Just copy the component code and customize 
            it to your needs. All components are built from scratch using React and native HTML elements.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Requirements</h2>
          <p>
            Before using Things components, make sure you have:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>React 18+</strong> Installed in your project</li>
            <li><strong>Tailwind CSS</strong> Configured and set up</li>
            <li><strong>TypeScript</strong> (recommended but not required)</li>
          </ul>

          <h2 className="text-3xl font-bold mt-8 mb-4">Install Dependencies</h2>
          <p>
            Components use minimal dependencies. Install these packages:
          </p>
          <div className="rounded-lg border-2 border-foreground bg-muted p-6 neobrutalism-shadow">
            <pre className="text-sm font-mono">
              <code>{`npm install class-variance-authority clsx tailwind-merge`}</code>
            </pre>
          </div>
          <p className="text-sm text-muted-foreground">
            <code className="bg-muted px-1 py-0.5 rounded">class-variance-authority</code> For component variants
            <br />
            <code className="bg-muted px-1 py-0.5 rounded">clsx</code> For className utilities
            <br />
            <code className="bg-muted px-1 py-0.5 rounded">tailwind-merge</code> For merging Tailwind classes
          </p>
          <p className="mt-4">
            No UI library dependencies required. Everything is built from scratch.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Installation Steps</h2>
          
          <h3 className="text-2xl font-bold mt-6 mb-3">Step 1: Copy the utils file</h3>
          <p>
            First, copy the utility function file. Create a <code className="bg-muted px-1 py-0.5 rounded">lib/utils.ts</code> or <code className="bg-muted px-1 py-0.5 rounded">lib/utils.js</code> file in your project:
          </p>
          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
                language="ts"
              />
            </div>
            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}`}
                language="js"
              />
            </div>
          </div>

          <h3 className="text-2xl font-bold mt-6 mb-3">Step 2: Copy component code</h3>
          <p>
            Copy the component code from the documentation pages. For example, to use the Button component:
          </p>
          <div className="rounded-lg border-2 border-foreground bg-muted p-6 neobrutalism-shadow">
            <pre className="text-sm font-mono">
              <code>{`1. Go to the Button component docs
2. Copy the entire component code
3. Create components/ui/button.tsx in your project
4. Paste the code`}</code>
            </pre>
          </div>

          <h3 className="text-2xl font-bold mt-6 mb-3">Step 3: Use the component</h3>
          <p>
            Import and use the component in your project:
          </p>
          <div className="rounded-lg border-2 border-foreground bg-muted p-6 neobrutalism-shadow">
            <pre className="text-sm font-mono">
              <code>{`import { Button } from "@/app/components/ui/button"

export default function MyPage() {
  return <Button>Click me</Button>
}`}</code>
            </pre>
          </div>

          <h3 className="text-2xl font-bold mt-6 mb-3">Step 4: Configure Tailwind (if needed)</h3>
          <p>
            Make sure your <code className="bg-muted px-1 py-0.5 rounded">tailwind.config.js</code> includes the component paths:
          </p>
          <div className="rounded-lg border-2 border-foreground bg-muted p-6 neobrutalism-shadow">
            <pre className="text-sm font-mono">
              <code>{`module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  // ... rest of config
}`}</code>
            </pre>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs">
            <Button variant="outline" size="lg">
              ← Introduction
            </Button>
          </Link>
          <Link href="/docs/resources">
            <Button variant="outline" size="lg">
              Resources →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

