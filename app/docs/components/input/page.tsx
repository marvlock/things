import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function InputDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Input</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          A form input component with bold borders and shadow.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Input component is a form input field with blocky styling. It features thick borders 
            and shadows that match the Things design system. Built from scratch using React and native 
            HTML input elements. No dependencies on any UI library.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>
          <p>
            Copy the Input component code into your project, then use it like this:
          </p>
          <div className="rounded-lg border-2 border-foreground bg-muted p-6 neobrutalism-shadow">
            <pre className="text-sm font-mono">
              <code>{`import { Input } from "@/components/ui/input"

<Input type="text" placeholder="Enter text" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />`}</code>
            </pre>
          </div>
          <p className="text-sm text-muted-foreground">
            Make sure you also have the <code className="bg-muted px-1 py-0.5 rounded">lib/utils.ts</code> file 
            with the <code className="bg-muted px-1 py-0.5 rounded">cn</code> helper function.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Examples</h2>
          <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow space-y-4">
            <Input placeholder="Enter your email" />
            <Input type="password" placeholder="Password" />
            <Input type="text" placeholder="Disabled" disabled />
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/card">
            <Button variant="outline" size="lg">
              ← Card
            </Button>
          </Link>
          <div></div>
        </div>
      </div>
    </div>
  )
}

