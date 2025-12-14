import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CardDocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Card</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          A container component with blocky styling.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Card component provides a flexible container with bold borders and shadows. 
            It includes subcomponents for header, title, description, content, and footer. 
            Built from scratch using React and native HTML div elements. Completely independent.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>
          <p>
            Copy the Card component code into your project, then use it like this:
          </p>
          <div className="rounded-lg border-2 border-foreground bg-muted p-6 neobrutalism-shadow">
            <pre className="text-sm font-mono">
              <code>{`import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`}</code>
            </pre>
          </div>
          <p className="text-sm text-muted-foreground">
            Make sure you also have the <code className="bg-muted px-1 py-0.5 rounded">lib/utils.ts</code> file 
            with the <code className="bg-muted px-1 py-0.5 rounded">cn</code> helper function.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Example</h2>
          <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the card content area.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/button">
            <Button variant="outline" size="lg">
              ← Button
            </Button>
          </Link>
          <Link href="/docs/components/input">
            <Button variant="outline" size="lg">
              Input →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

