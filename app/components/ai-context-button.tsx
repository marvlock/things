"use client"

import * as React from "react"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIContextButtonProps {
  content: string
  label?: string
  className?: string
  context?: string
}

export function AIContextButton({ 
  content, 
  label = "Send to AI", 
  className,
  context = ""
}: AIContextButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    try {
      const fullContent = context 
        ? `${context}\n\n${content}`
        : content

      if (navigator && navigator.clipboard) {
        await navigator.clipboard.writeText(fullContent)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea')
        textarea.value = fullContent
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

  return (
    <button
      onClick={copyToClipboard}
      className={cn(
        "inline-flex items-center gap-2 rounded border-2 border-foreground px-3 py-2 text-xs font-bold neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-accent transition-colors bg-background",
        className
      )}
      title={`Copy to clipboard and share with AI tools like Cursor or Claude`}
    >
      <Sparkles className="w-3.5 h-3.5" />
      {copied ? "Copied!" : label}
    </button>
  )
}
