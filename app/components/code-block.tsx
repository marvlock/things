"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
  context?: string
}

export function CodeBlock({ code, language = "tsx", className, context }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const [contextCopied, setContextCopied] = React.useState(false)

  const copyToClipboard = async () => {
    try {
      if (navigator && navigator.clipboard) {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea')
        textarea.value = code
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const copyWithContext = async () => {
    try {
      const contextMessage = context 
        ? `${context}\n\n\`\`\`${language}\n${code}\n\`\`\``
        : `\`\`\`${language}\n${code}\n\`\`\``
      
      if (navigator && navigator.clipboard) {
        await navigator.clipboard.writeText(contextMessage)
        setContextCopied(true)
        setTimeout(() => setContextCopied(false), 2000)
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea')
        textarea.value = contextMessage
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        setContextCopied(true)
        setTimeout(() => setContextCopied(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy with context:', err)
    }
  }

  return (
    <div className={cn("relative rounded-lg border-2 border-foreground bg-muted neobrutalism-shadow", className)}>
      <div className="flex items-center justify-between border-b-2 border-foreground px-4 py-2">
        <span className="text-xs font-bold uppercase">{language}</span>
        <div className="flex items-center gap-2">
          {context && (
            <button
              onClick={copyWithContext}
              className="flex h-6 gap-1.5 items-center justify-center rounded border border-foreground bg-background text-xs font-bold neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-accent transition-colors px-2"
              aria-label="Copy with context for AI"
              title="Copy code with context for AI tools"
            >
              <Sparkles className="w-3 h-3" />
              {contextCopied ? "✓" : "AI"}
            </button>
          )}
          <button
            onClick={copyToClipboard}
            className="flex h-6 w-6 items-center justify-center rounded border border-foreground bg-background text-xs font-bold neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-muted transition-colors"
            aria-label="Copy code"
            title="Copy code to clipboard"
          >
            {copied ? "✓" : "📋"}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto p-6">
        <code className="text-sm font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  )
}

