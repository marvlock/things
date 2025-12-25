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
              <h3 className="text-2xl font-bold mb-2">v0.4.0</h3>
              <p className="text-muted-foreground mb-4">Current version</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Added Blog Website example</li>
                <li>Added Contact Form example</li>
                <li>Added Admin Panel example</li>
                <li>Added search bar</li>
                <li>Updated logo</li>
              </ul>
            </div>
            <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow">
              <h3 className="text-2xl font-bold mb-2">v0.3.0</h3>
              <p className="text-muted-foreground mb-4">Previous version</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Added Accordion component</li>
                <li>Added Alert component</li>
                <li>Added Alert Dialog component</li>
                <li>Added Avatar component</li>
                <li>Added Badge component</li>
                <li>Added Breadcrumb component</li>
                <li>Added Calendar component</li>
                <li>Added Carousel component</li>
                <li>Added Checkbox component</li>
                <li>Added Collapsible component</li>
                <li>Added Combobox component</li>
                <li>Added Command component</li>
                <li>Added Context Menu component</li>
                <li>Added Data Table component</li>
                <li>Added Date Picker component</li>
                <li>Added Dialog component</li>
                <li>Added Drawer component</li>
                <li>Added Dropdown Menu component</li>
                <li>Added Form component</li>
                <li>Added Hover Card component</li>
                <li>Added Image Card component</li>
                <li>Added Input OTP component</li>
                <li>Added Label component</li>
                <li>Added Marquee component</li>
                <li>Added Menubar component</li>
                <li>Added Navigation Menu component</li>
                <li>Added Pagination component</li>
                <li>Added Popover component</li>
                <li>Added Progress component</li>
                <li>Added Radio Group component</li>
                <li>Added Resizable component</li>
                <li>Added Scroll Area component</li>
                <li>Added Select component</li>
                <li>Added Sheet component</li>
                <li>Added Sidebar component</li>
                <li>Added Skeleton component</li>
                <li>Added Sonner component</li>
                <li>Added Table component</li>
                <li>Added Tabs component</li>
                <li>Added Tooltip component</li>
                <li>Updated all component documentation pages to include both TypeScript and JavaScript code examples</li>
              </ul>
            </div>
            <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow">
              <h3 className="text-2xl font-bold mb-2">v0.2.0</h3>
              <p className="text-muted-foreground mb-4">Previous version</p>
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

