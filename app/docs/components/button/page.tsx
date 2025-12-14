import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ButtonDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Button</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          A clickable button component with blocky styling.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Button component is a versatile, accessible button built with blocky, funky styling. 
            It supports multiple variants and sizes. Built from scratch using React and native HTML 
            button elements. No UI library dependencies.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>
          <p>
            Copy the Button component code into your project, then use it like this:
          </p>
          <div className="rounded-lg border-2 border-foreground bg-muted p-6 neobrutalism-shadow">
            <pre className="text-sm font-mono">
              <code>{`import { Button } from "@/components/ui/button"

<Button>Click me</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>`}</code>
            </pre>
          </div>
          <p className="text-sm text-muted-foreground">
            Make sure you also have the <code className="bg-muted px-1 py-0.5 rounded">lib/utils.ts</code> file 
            with the <code className="bg-muted px-1 py-0.5 rounded">cn</code> helper function.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Examples</h2>
          <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <div></div>
          <Link href="/docs/components/card">
            <Button variant="outline" size="lg">
              Card →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

