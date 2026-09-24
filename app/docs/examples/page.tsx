import Link from "next/link"
import { ArrowUpRight, CreditCard, LayoutDashboard, Rocket, Settings, type LucideIcon } from "lucide-react"
import { Badge } from "@/app/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"

type Example = {
  href: string
  title: string
  description: string
  category: string
  icon: LucideIcon
  color: string
}

const examples: Example[] = [
  { href: "/examples/blog", title: "Blog Website", description: "Articles, navigation, and a readable editorial content layout.", category: "Content", icon: LayoutDashboard, color: "bg-[#A388EE]" },
  { href: "/examples/contact-form", title: "Contact Form", description: "Inputs, validation states, selects, radio groups, and checkboxes.", category: "Forms", icon: Settings, color: "bg-[#FFD166]" },
  { href: "/examples/admin-panel", title: "Admin Panel", description: "Sidebar navigation, data tables, dialogs, and user management.", category: "Dashboard", icon: LayoutDashboard, color: "bg-[#56E3A6]" },
  { href: "/examples/launch-board", title: "Launch Board", description: "A focused product-launch workspace with milestones, ownership, and progress.", category: "Product", icon: Rocket, color: "bg-[#FF8FAB]" },
  { href: "/examples/pricing", title: "Pricing Page", description: "A conversion-ready pricing comparison with clear plans and feature hierarchy.", category: "Marketing", icon: CreditCard, color: "bg-[#75C2F6]" },
  { href: "/examples/workspace-settings", title: "Workspace Settings", description: "A practical account settings view for teams, roles, and integrations.", category: "SaaS", icon: Settings, color: "bg-[#F6B26B]" },
]

export default function ExamplesPage() {
  return (
    <div className="min-h-screen py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-5xl pl-8 md:pl-12">
        <div className="mb-10 border-4 border-foreground bg-[#75C2F6] p-6 neobrutalism-shadow-lg md:p-9"><p className="text-xs font-black uppercase tracking-[0.18em]">Made to remix</p><h1 className="mt-5 text-5xl font-black uppercase leading-[0.9] md:text-7xl">Start from<br />something real.</h1><p className="mt-5 max-w-2xl text-lg font-medium">Complete screens that show how individual Things components become confident, useful products.</p></div>

        <div className="prose prose-lg max-w-none space-y-6">
          <div className="rounded-lg border-2 border-foreground bg-muted p-5 neobrutalism-shadow-sm">
            <p className="m-0 font-medium text-foreground">
              Six working starters for the parts of an app teams build most often. Use them as a visual reference, a learning path, or a foundation for your next feature.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {examples.map((example) => {
              const Icon = example.icon

              return (
                <Link key={example.href} href={example.href} className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4">
                  <Card className="h-full overflow-hidden transition-transform duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0px_0px_hsl(var(--foreground))] group-active:translate-x-[2px] group-active:translate-y-[2px] group-active:shadow-none">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-md border-2 border-foreground ${example.color}`}>
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <Badge variant="outline">{example.category}</Badge>
                      </div>
                      <CardTitle className="pt-3">{example.title}</CardTitle>
                      <CardDescription>{example.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
                      Explore example <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
