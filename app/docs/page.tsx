import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Markdown } from "@/app/components/ui/markdown"

export default function DocsPage() {
  return (
    <div className="min-h-screen py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <div className="mb-10 border-4 border-foreground bg-[#FF8FAB] p-6 neobrutalism-shadow-lg md:p-9"><p className="text-xs font-black uppercase tracking-[0.18em]">Things / introduction</p><h1 className="mt-5 text-5xl font-black uppercase leading-[0.9] md:text-7xl">A UI library<br />with a pulse.</h1><p className="mt-5 max-w-xl text-lg font-medium">Accessible, copy-ready React components for interfaces that should never feel generic.</p></div>

        <div className="max-w-none space-y-6 rounded-lg border-2 border-foreground bg-background p-6 neobrutalism-shadow-sm md:p-8">
          <Markdown className="text-xl leading-relaxed">
            {`Things is a collection of blocky, funky-styled React components built with Tailwind CSS. 
All components are **shadcn/ui compatible**, designed to be copied directly into your project, 
giving you full control over the code and styling. All components are built from scratch 
using React and native HTML elements. No UI library dependencies required.`}
          </Markdown>

          <Markdown className="text-xl leading-relaxed">
            {`Things embraces a bold, raw aesthetic that combines thick borders, strong shadows, and 
high-contrast colors. The design system refuses the usual components of UX-UI design 
and embraces distinctive, blocky design elements with personality.`}
          </Markdown>

          <Markdown className="text-xl leading-relaxed">
            {`The purpose of this collection is to help you learn about the blocky, funky style and 
create bold layouts that stand out. Each component is accessible, customizable, and ready 
to use in your projects. Simply copy the component code and customize it to your needs.`}
          </Markdown>
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
