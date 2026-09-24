import { ArrowLeft, Calendar, CheckCircle2, CircleDot, Rocket } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Progress } from "@/app/components/ui/progress"

const milestones = [
  { title: "Design QA", owner: "Maya", date: "Today", status: "Ready", complete: true },
  { title: "Landing page", owner: "Noah", date: "Tomorrow", status: "Review", complete: false },
  { title: "Launch email", owner: "Sam", date: "Fri, 18 Oct", status: "Draft", complete: false },
]

export default function LaunchBoardPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] p-5 text-foreground sm:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <Link href="/docs/examples" className="inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4">
          <ArrowLeft className="h-4 w-4" /> All examples
        </Link>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="border-4 border-foreground bg-[#FF8FAB] p-7 neobrutalism-shadow-lg sm:p-10">
            <Badge className="bg-background">Product launch / 2026</Badge>
            <h1 className="mt-5 max-w-xl text-5xl font-black uppercase leading-[0.9] sm:text-7xl">Ship the useful thing.</h1>
            <p className="mt-6 max-w-lg text-lg font-medium">A lightweight launch workspace for a small team that wants momentum without a maze of dashboards.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg"><Rocket className="mr-2 h-5 w-5" /> Open launch brief</Button>
              <Button size="lg" variant="outline">Share update</Button>
            </div>
          </div>

          <Card className="flex flex-col justify-between bg-foreground text-background">
            <CardHeader>
              <p className="text-sm font-bold uppercase tracking-widest text-[#FF8FAB]">Launch health</p>
              <CardTitle className="text-6xl text-background">72%</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={72} className="border-background bg-transparent [&>div]:bg-[#FF8FAB]" />
              <p className="text-sm text-background/75">18 of 25 launch tasks are complete.</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <Card>
            <CardHeader><CardTitle>Next up</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {milestones.map((milestone) => (
                <div key={milestone.title} className="flex flex-wrap items-center justify-between gap-3 border-2 border-foreground p-4">
                  <div className="flex items-center gap-3">
                    {milestone.complete ? <CheckCircle2 className="h-5 w-5 text-green-700" /> : <CircleDot className="h-5 w-5" />}
                    <div><p className="font-bold">{milestone.title}</p><p className="text-sm text-muted-foreground">Owner: {milestone.owner}</p></div>
                  </div>
                  <div className="flex items-center gap-3"><Badge variant="secondary">{milestone.status}</Badge><span className="text-sm font-bold">{milestone.date}</span></div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-[#75C2F6]">
            <CardHeader><CardTitle>Launch note</CardTitle></CardHeader>
            <CardContent className="space-y-4 font-medium"><p>Keep the scope small. A great first release beats a perfect delayed one.</p><div className="flex items-center gap-2 border-t-2 border-foreground pt-4 text-sm font-bold"><Calendar className="h-4 w-4" /> Public launch: 21 Oct</div></CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
