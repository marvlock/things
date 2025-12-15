import Link from "next/link"
import { Button } from "@/app/components/ui/button"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Resources</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Helpful resources and links.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            Here are some helpful resources to get you started with Things.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Documentation</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Component documentation</li>
            <li>Styling guide</li>
            <li>Customization examples</li>
          </ul>

          <h2 className="text-3xl font-bold mt-8 mb-4">Community</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>GitHub repository</li>
            <li>Discussions</li>
            <li>Contributions welcome</li>
          </ul>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/installation">
            <Button variant="outline" size="lg">
              ← Installation
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

