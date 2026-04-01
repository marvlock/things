"use client"

import * as React from "react"
import { CodeBlock } from "./code-block"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

interface ComponentCodeProps {
  tsCode: string
  jsCode: string
  usageTs?: string
  usageJs?: string
  filename: string
}

export function ComponentCode({ tsCode, jsCode, usageTs, usageJs, filename }: ComponentCodeProps) {
  const [lang, setLang] = React.useState<"ts" | "js">("ts")
  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-2 border-foreground p-4 rounded-lg bg-background neobrutalism-shadow">
        <div>
          <h2 className="text-xl font-bold">Implementation</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Copy into <code className="bg-muted px-1 py-0.5 border border-foreground/20 rounded">components/ui/{filename}.{lang === 'ts' ? 'tsx' : 'jsx'}</code>
          </p>
        </div>
        <div className="flex items-center gap-3">
            <div className="flex border-2 border-foreground rounded-md overflow-hidden h-9 neobrutalism-shadow-sm">
              <button
                onClick={() => setLang("ts")}
                className={cn(
                  "px-4 text-sm font-bold transition-colors",
                  lang === "ts" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                )}
              >
                TS
              </button>
              <button
                onClick={() => setLang("js")}
                className={cn(
                  "px-4 text-sm font-bold border-l-2 border-foreground transition-colors",
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
                {isExpanded ? "Hide Code" : "Show Code"}
            </Button>
        </div>
      </div>

      <div className={cn("transition-all duration-300 overflow-hidden", !isExpanded ? "h-0 opacity-0" : "h-auto opacity-100")}>
          <div className="space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
            <CodeBlock 
                code={lang === "ts" ? tsCode : jsCode} 
                language={lang === "ts" ? "tsx" : "jsx"} 
            />
            
            {usageTs && (
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Usage</h3>
                    <CodeBlock 
                        code={lang === "ts" ? usageTs : usageJs || usageTs} 
                        language={lang === "ts" ? "tsx" : "jsx"} 
                    />
                </div>
            )}
          </div>
      </div>
    </div>
  )
}
