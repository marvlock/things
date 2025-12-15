import Link from "next/link"
import { Button } from "@/app/components/ui/button"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Introduction</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Short introduction to the project.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            Things is a collection of blocky, funky-styled React components built with Tailwind CSS. 
            Each component is designed to be copied directly into your project, giving you full control 
            over the code and styling. All components are built from scratch using React and native HTML 
            elements. No UI library dependencies required.
          </p>

          <p>
            Things embraces a bold, raw aesthetic that combines thick borders, strong shadows, and 
            high-contrast colors. The design system refuses the usual components of UX-UI design 
            and embraces distinctive, blocky design elements with personality.
          </p>

          <p>
            The purpose of this collection is to help you learn about the blocky, funky style and 
            create bold layouts that stand out. Each component is accessible, customizable, and ready 
            to use in your projects. Simply copy the component code and customize it to your needs.
          </p>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <div></div>
          <Link href="/docs/installation">
            <Button variant="outline" size="lg">
              Installation →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

