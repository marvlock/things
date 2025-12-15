import Link from "next/link"
import { Button } from "@/app/components/ui/button"

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Changelog</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          All notable changes to Things.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <div className="space-y-4">
            <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow">
              <h3 className="text-2xl font-bold mb-2">v0.2.0</h3>
              <p className="text-muted-foreground mb-4">Current version</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Minor UI improvements</li>
                <li>Added Textarea component</li>
                <li>Added Switch component</li>
                <li>Added Slider component</li>
              </ul>
            </div>
            <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow">
              <h3 className="text-2xl font-bold mb-2">v0.1.0</h3>
              <p className="text-muted-foreground mb-4">Initial release</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Button component</li>
                <li>Card component</li>
                <li>Input component</li>
                <li>Documentation site</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/resources">
            <Button variant="outline" size="lg">
              ← Resources
            </Button>
          </Link>
          <div></div>
        </div>
      </div>
    </div>
  )
}

