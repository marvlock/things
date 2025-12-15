"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export function CodeBlock({ code, language = "tsx", className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("relative rounded-lg border-2 border-foreground bg-muted neobrutalism-shadow", className)}>
      <div className="flex items-center justify-between border-b-2 border-foreground px-4 py-2">
        <span className="text-xs font-bold uppercase">{language}</span>
        <button
          onClick={copyToClipboard}
          className="flex h-6 w-6 items-center justify-center rounded border border-foreground bg-background text-xs font-bold neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-muted transition-colors"
          aria-label="Copy code"
        >
          {copied ? "✓" : "📋"}
        </button>
      </div>
      <pre className="overflow-x-auto p-6">
        <code className="text-sm font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  )
}

