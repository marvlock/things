"use client"

import * as React from "react"
import { CodeBlock } from "./code-block"
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ComponentCodeProps {
  tsCode: string
  jsCode: string
  usageTs?: string
  usageJs?: string
  filename: string
}

export function ComponentCode({ tsCode, jsCode, usageTs, usageJs, filename }: ComponentCodeProps) {
  const [lang, setLang] = React.useState<"ts" | "js" | "cli">("cli")
  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-2 border-foreground p-4 rounded-lg bg-background neobrutalism-shadow text-foreground">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight">
            {lang === 'cli' ? 'Quick Install' : 'Manual Implementation'}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 font-medium">
            {lang === 'cli' 
              ? 'Install via shadcn/ui CLI' 
              : `Copy into components/ui/${filename}.${lang === 'ts' ? 'tsx' : 'jsx'}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
            <div className="flex border-2 border-foreground rounded-md overflow-hidden h-9 neobrutalism-shadow-sm">
              <button
                onClick={() => setLang("cli")}
                className={cn(
                  "px-4 text-xs font-bold transition-colors",
                  lang === "cli" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                )}
              >
                CLI
              </button>
              <button
                onClick={() => setLang("ts")}
                className={cn(
                  "px-4 text-xs font-bold border-l-2 border-foreground transition-colors",
                  lang === "ts" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                )}
              >
                TS
              </button>
              <button
                onClick={() => setLang("js")}
                className={cn(
                  "px-4 text-xs font-bold border-l-2 border-foreground transition-colors",
                  lang === "js" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                )}
              >
                JS
              </button>
            </div>
            <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-9 px-4 font-bold neobrutalism-shadow-sm"
            >
                {isExpanded ? "Hide" : "Expand"}
            </Button>
        </div>
      </div>

      <div className={cn("transition-all duration-300 overflow-hidden", !isExpanded ? "h-0 opacity-0" : "h-auto opacity-100")}>
          <div className="space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
            {lang === "cli" ? (
              <div className="space-y-4">
                <Tabs defaultValue="npm" className="w-full">
                  <TabsList className="h-9">
                    <TabsTrigger value="npm" className="text-xs">npm</TabsTrigger>
                    <TabsTrigger value="pnpm" className="text-xs">pnpm</TabsTrigger>
                    <TabsTrigger value="bun" className="text-xs">bun</TabsTrigger>
                    <TabsTrigger value="yarn" className="text-xs">yarn</TabsTrigger>
                  </TabsList>
                  <TabsContent value="npm">
                    <CodeBlock code={`npx shadcn@latest add https://things.marvlock.dev/registry/ui/${filename}.json`} language="bash" />
                  </TabsContent>
                  <TabsContent value="pnpm">
                    <CodeBlock code={`pnpm dlx shadcn@latest add https://things.marvlock.dev/registry/ui/${filename}.json`} language="bash" />
                  </TabsContent>
                  <TabsContent value="bun">
                    <CodeBlock code={`bunx --bun shadcn@latest add https://things.marvlock.dev/registry/ui/${filename}.json`} language="bash" />
                  </TabsContent>
                  <TabsContent value="yarn">
                    <CodeBlock code={`npx shadcn@latest add https://things.marvlock.dev/registry/ui/${filename}.json`} language="bash" />
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="space-y-6">
                <CodeBlock 
                  code={lang === "ts" ? tsCode : jsCode} 
                  language={lang === "ts" ? "tsx" : "jsx"} 
                />
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md border border-foreground/10 font-medium">
                  <strong>Note:</strong> Make sure you have the <code className="bg-background px-1.5 py-0.5 rounded border border-foreground/20 italic">lib/utils.ts</code> file 
                  with the <code className="bg-background px-1.5 py-0.5 rounded border border-foreground/20 italic">cn</code> helper function installed in your project.
                </p>
              </div>
            )}
            
            {usageTs && (
              <div className="space-y-4 border-t-2 border-foreground/10 pt-8">
                <h3 className="text-2xl font-bold tracking-tight">Usage</h3>
                <CodeBlock 
                  code={lang === "js" ? (usageJs || usageTs) : usageTs} 
                  language={lang === "js" ? "jsx" : "tsx"} 
                />
              </div>
            )}
          </div>
      </div>
    </div>
  )
}
