import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Clock3, Sparkles } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { NewsletterForm } from "./newsletter-form"

export default function BlogExamplePage() {
  const blogPosts = [
    {
      id: 1,
      slug: "getting-started-with-things-components",
      title: "Getting Started with Things Components",
      excerpt: "Learn how to integrate Things components into your React project and start building beautiful interfaces.",
      author: "Pranav Murali",
      date: "December 22, 2025",
      category: "Tutorial",
      readTime: "5 min read",
      accent: "bg-[#FFD166]",
    },
    {
      id: 2,
      slug: "building-accessible-ui-components",
      title: "Building Accessible UI Components",
      excerpt: "A deep dive into creating accessible components that work for everyone, following WCAG guidelines.",
      author: "Pranav Murali",
      date: "December 22, 2025",
      category: "Design",
      readTime: "8 min read",
      accent: "bg-[#FF8FAB]",
    },
    {
      id: 3,
      slug: "neobrutalism-design-principles",
      title: "Neobrutalism Design Principles",
      excerpt: "Exploring the bold, blocky aesthetic that makes Things components stand out from the crowd.",
      author: "Pranav Murali",
      date: "December 22, 2025",
      category: "Design",
      readTime: "6 min read",
      accent: "bg-[#75C2F6]",
    },
    {
      id: 4,
      slug: "typescript-best-practices-for-components",
      title: "TypeScript Best Practices for Components",
      excerpt: "How to write type-safe React components with TypeScript and maintain excellent developer experience.",
      author: "Pranav Murali",
      date: "December 22, 2025",
      category: "Development",
      readTime: "7 min read",
      accent: "bg-[#56E3A6]",
    },
    {
      id: 5,
      slug: "tailwind-css-customization-guide",
      title: "Tailwind CSS Customization Guide",
      excerpt: "Master the art of customizing Things components with Tailwind CSS to match your brand identity.",
      author: "Pranav Murali",
      date: "December 22, 2025",
      category: "Tutorial",
      readTime: "9 min read",
      accent: "bg-[#FFD166]",
    },
    {
      id: 6,
      slug: "performance-optimization-tips",
      title: "Performance Optimization Tips",
      excerpt: "Learn how to optimize your React applications when using Things components for better performance.",
      author: "Pranav Murali",
      date: "December 22, 2025",
      category: "Development",
      readTime: "6 min read",
      accent: "bg-[#FF8FAB]",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F7F4EE]">
      <header className="border-b-2 border-foreground bg-background sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-5"><Link href="/docs/examples" className="inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4"><ArrowLeft className="h-4 w-4" /> Examples</Link><Link href="/examples/blog" className="text-2xl font-black">Things Blog</Link></div>
            <nav className="hidden md:flex gap-4">
              <Link href="/examples/blog" className="text-sm font-bold hover:underline">Home</Link>
              <a href="#articles" className="text-sm font-bold hover:underline">Articles</a>
              <a href="#newsletter" className="text-sm font-bold hover:underline">About</a>
            </nav>
            <Button size="sm">Subscribe</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b-2 border-foreground bg-[#FFD166]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 sm:py-16 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="flex flex-col justify-center">
            <div className="mb-5 flex items-center gap-3"><Badge className="bg-background text-foreground">Featured dispatch</Badge><span className="text-sm font-bold uppercase tracking-[0.16em]">Issue 01 / 2026</span></div>
            <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.88] sm:text-7xl">Build loud.<br />Ship useful.</h1>
            <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed">
              Practical notes on component craft, accessible interfaces, and the small decisions that make a product feel alive.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/examples/blog/${blogPosts[0].slug}`}
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-bold text-primary-foreground neobrutalism-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Read Latest
              </Link>
              <a
                href="#articles"
                className="inline-flex h-11 items-center justify-center rounded-md border-2 border-foreground bg-background px-8 text-sm font-bold neobrutalism-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Browse All
              </a>
            </div>
          </div>
          <Link href={`/examples/blog/${blogPosts[0].slug}`} className="group flex min-h-72 flex-col justify-between border-4 border-foreground bg-foreground p-6 text-background neobrutalism-shadow-lg transition-transform hover:-translate-x-1 hover:-translate-y-1">
            <div><div className="flex items-center justify-between gap-3"><span className="text-xs font-black uppercase tracking-[0.18em] text-[#FFD166]">Start here</span><Sparkles className="h-5 w-5 text-[#FFD166]" /></div><h2 className="mt-8 text-3xl font-black leading-tight">{blogPosts[0].title}</h2><p className="mt-3 text-sm leading-relaxed text-background/70">{blogPosts[0].excerpt}</p></div>
            <div className="flex items-center justify-between border-t-2 border-background/40 pt-4 text-sm font-bold"><span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" /> {blogPosts[0].readTime}</span><span className="inline-flex items-center gap-1 group-hover:underline">Read story <ArrowUpRight className="h-4 w-4" /></span></div>
          </Link>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <main id="articles" className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div><p className="mb-2 text-sm font-black uppercase tracking-[0.18em] text-muted-foreground">The reading room</p><h2 className="text-3xl font-black uppercase">Latest Articles</h2></div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Explore our collection of tutorials, guides, and insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/examples/blog/${post.slug}`}>
              <Card className="h-full overflow-hidden transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_hsl(var(--foreground))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                <div className={`h-3 border-b-2 border-foreground ${post.accent}`} />
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="border-t-2 border-foreground pt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-bold">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.date}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-bold uppercase">Read <ArrowUpRight className="h-4 w-4" /></span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      {/* Newsletter Section */}
      <section id="newsletter" className="border-t-2 border-foreground bg-[#75C2F6]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <Card className="mx-auto max-w-2xl border-4 bg-background">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Stay Updated</CardTitle>
              <CardDescription className="text-lg">
                Get the latest articles and updates delivered to your inbox
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NewsletterForm inputId="blog-email" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-foreground bg-background">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Things Blog. Built with Things components.
            </p>
            <div className="flex gap-4">
              <Link href="/examples/blog" className="text-sm font-bold hover:underline">Privacy</Link>
              <Link href="/examples/blog" className="text-sm font-bold hover:underline">Terms</Link>
              <Link href="/docs/examples" className="text-sm font-bold hover:underline">← Back to Examples</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
