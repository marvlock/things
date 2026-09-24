"use client"

import * as React from "react"
import { Check, ChevronRight, Link2, Users } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Switch } from "@/app/components/ui/switch"

export default function WorkspaceSettingsPage() {
  const [updatesEnabled, setUpdatesEnabled] = React.useState(true)
  const [saved, setSaved] = React.useState(false)

  return (
    <main className="min-h-screen bg-[#F3F2ED] p-5 sm:p-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="border-3 border-foreground bg-foreground p-5 text-background neobrutalism-shadow">
          <Link href="/docs/examples" className="text-sm font-bold text-background/70 underline underline-offset-4">← All examples</Link>
          <h1 className="mt-8 text-3xl font-black uppercase">Atlas<br />Workspace</h1>
          <nav className="mt-10 space-y-2 text-sm font-bold"><a className="block bg-background px-3 py-2 text-foreground" href="#general">General</a><a className="block px-3 py-2 hover:bg-background/10" href="#members">Members</a><a className="block px-3 py-2 hover:bg-background/10" href="#integrations">Integrations</a></nav>
        </aside>
        <div className="space-y-6">
          <header className="flex flex-wrap items-center justify-between gap-4"><div><p className="font-bold uppercase tracking-widest text-muted-foreground">Workspace settings</p><h2 className="text-4xl font-black">General</h2></div><Badge className="bg-[#56E3A6]">All changes saved</Badge></header>
          <Card id="general"><CardHeader><CardTitle>Workspace details</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2"><label className="space-y-2 text-sm font-bold">Workspace name<Input defaultValue="Atlas" /></label><label className="space-y-2 text-sm font-bold">Workspace URL<Input defaultValue="atlas-team" /></label><div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 border-t-2 border-foreground pt-5"><div><p className="font-bold">Product updates</p><p className="text-sm text-muted-foreground">Send the team a weekly shipping summary.</p></div><Switch checked={updatesEnabled} onCheckedChange={setUpdatesEnabled} aria-label="Enable product update emails" /></div></CardContent></Card>
          <Card id="members"><CardHeader><CardTitle>Members</CardTitle></CardHeader><CardContent className="space-y-3">{["Maya Chen — Owner", "Noah Williams — Designer", "Sam Rivera — Engineer"].map((member) => <div key={member} className="flex items-center justify-between border-2 border-foreground p-3"><span className="font-bold">{member}</span><Users className="h-4 w-4" /></div>)}</CardContent></Card>
          <Card id="integrations" className="bg-[#FFD166]"><CardHeader><CardTitle>Developer workflow</CardTitle></CardHeader><CardContent className="flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-3"><Link2 className="h-6 w-6" /><p className="font-medium">Connect your deployment and issue tracking tools.</p></div><Button onClick={() => setSaved(true)}>{saved ? <><Check className="mr-2 h-4 w-4" /> Connected</> : <><ChevronRight className="mr-2 h-4 w-4" /> Connect tool</>}</Button></CardContent></Card>
        </div>
      </div>
    </main>
  )
}
