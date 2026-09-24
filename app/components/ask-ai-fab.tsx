"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/app/components/ui/button"

export function AskAIFAB() {
  const [copied, setCopied] = React.useState(false)
  const resetTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const showCopiedState = React.useCallback(() => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current)
    }

    setCopied(true)
    resetTimerRef.current = setTimeout(() => setCopied(false), 2500)
  }, [])

  React.useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  const copyCurrentPageContext = React.useCallback(async () => {
    try {
      const pageContent = document.body.innerText
      const pageTitle = document.title
      const pageUrl = window.location.href

      const context = `# Things UI — page context\n\nUse this context with any coding assistant to answer questions or plan an implementation. Preserve the component's public API and accessibility behavior unless the request explicitly changes them.\n\n- Page: ${pageTitle}\n- URL: ${pageUrl}\n\n## Documentation\n${pageContent}`

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(context)
        showCopiedState()
      } else {
        const textarea = document.createElement("textarea")
        textarea.value = context
        textarea.setAttribute("readonly", "")
        textarea.style.position = "fixed"
        textarea.style.opacity = "0"
        document.body.appendChild(textarea)
        textarea.select()
        const copiedToClipboard = document.execCommand("copy")
        document.body.removeChild(textarea)

        if (!copiedToClipboard) {
          throw new Error("The browser did not allow clipboard access.")
        }

        showCopiedState()
      }
    } catch (err) {
      console.error("Failed to copy page context:", err)
    }
  }, [showCopiedState])

  return (
    <div className="fixed bottom-6 right-5 z-[100] sm:bottom-8 sm:right-8">
      <Button
        type="button"
        variant="secondary"
        onClick={() => void copyCurrentPageContext()}
        className="h-auto gap-3 rounded-full border-[3px] border-black px-5 py-3.5 text-base font-black neobrutalism-shadow-lg transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] sm:px-6 sm:py-4 sm:text-lg"
        aria-label="Copy this page's context for any coding assistant"
      >
        {copied && <Check className="h-5 w-5 stroke-[3] sm:h-6 sm:w-6" aria-hidden="true" />}
        <span className="uppercase tracking-tighter">{copied ? "Copied" : "Ask AI"}</span>
        {!copied && <Copy className="hidden h-4 w-4 sm:block" aria-hidden="true" />}
      </Button>
      <p className="sr-only" aria-live="polite" role="status">
        {copied ? "Page context copied. Paste it into any coding assistant." : ""}
      </p>
    </div>
  )
}
