"use client"

import * as React from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"

export function NewsletterForm({ inputId }: { inputId: string }) {
  const [subscribed, setSubscribed] = React.useState(false)

  return (
    <form
      className="flex flex-col gap-2 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault()
        setSubscribed(true)
      }}
    >
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <Input
        id={inputId}
        type="email"
        placeholder="Enter your email"
        required
        disabled={subscribed}
        className="flex-1"
      />
      <Button type="submit" disabled={subscribed}>
        {subscribed ? "Subscribed!" : "Subscribe"}
      </Button>
      <p className="sr-only" role="status" aria-live="polite">
        {subscribed ? "Thanks for subscribing." : ""}
      </p>
    </form>
  )
}
