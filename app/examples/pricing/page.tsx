import { Check, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

const plans = [
  { name: "Starter", price: "0", description: "For shipping your first useful interface.", features: ["3 projects", "Core components", "Community updates"], featured: false },
  { name: "Team", price: "19", description: "For teams building a shared visual language.", features: ["Unlimited projects", "Team workspaces", "Priority updates", "Design reviews"], featured: true },
  { name: "Studio", price: "49", description: "For product teams that move fast and often.", features: ["Everything in Team", "Private registry", "Implementation support", "Roadmap sessions"], featured: false },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-foreground pb-6">
          <Link href="/docs/examples" className="text-sm font-bold underline underline-offset-4">← All examples</Link>
          <p className="font-black uppercase tracking-tight">Things / Plans</p>
        </div>
        <section className="py-16 text-center"><p className="font-bold uppercase tracking-[0.2em] text-muted-foreground">Simple pricing</p><h1 className="mt-4 text-5xl font-black uppercase leading-[0.9] sm:text-7xl">Make the interface<br />the easy part.</h1><p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">A high-contrast pricing screen that makes the decision obvious without making the product feel small.</p></section>
        <section className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.featured ? "relative -translate-y-2 border-4 bg-[#56E3A6]" : "bg-card"}>
              {plan.featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 border-2 border-foreground bg-[#FFD166] px-3 py-1 text-xs font-black uppercase">Most useful</span>}
              <CardHeader><CardTitle>{plan.name}</CardTitle><p className="text-sm text-muted-foreground">{plan.description}</p><p className="pt-5 text-6xl font-black">${plan.price}<span className="text-base font-bold">/mo</span></p></CardHeader>
              <CardContent className="space-y-6"><Button className="w-full" variant={plan.featured ? "default" : "outline"}>{plan.featured && <Sparkles className="mr-2 h-4 w-4" />}Choose {plan.name}</Button><ul className="space-y-3">{plan.features.map((feature) => <li key={feature} className="flex items-center gap-2 text-sm font-bold"><Check className="h-4 w-4" /> {feature}</li>)}</ul></CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  )
}
