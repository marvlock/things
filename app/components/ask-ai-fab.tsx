"use client"

import * as React from "react"
import { Sparkles } from "lucide-react"

export function AskAIFAB() {
  const [copied, setCopied] = React.useState(false)

  const copyCurrentPageContext = async () => {
    try {
      const pageContent = document.body.innerText
      const pageTitle = document.title
      const pageUrl = window.location.href

      const context = `Page: ${pageTitle}\nURL: ${pageUrl}\n\nContent:\n${pageContent}`

      if (navigator && navigator.clipboard) {
        await navigator.clipboard.writeText(context)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea')
        textarea.value = context
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy page context:', err)
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-[100] group">
      <button
        onClick={copyCurrentPageContext}
        className="flex items-center gap-3 bg-secondary border-[3px] border-black px-6 py-4 rounded-full text-foreground font-black text-lg neobrutalism-shadow-lg transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-secondary/90"
        title="Copy page context for AI tools (Cursor, Claude, etc.)"
      >
        <Sparkles className="w-6 h-6 stroke-[2.5]" />
        <span className="uppercase tracking-tighter">
          {copied ? "Copied!" : "Ask AI"}
        </span>
      </button>
    </div>
  )
}
