import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"

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
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-foreground bg-background sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/examples/blog">
              <h1 className="text-2xl font-bold">Things Blog</h1>
            </Link>
            <nav className="hidden md:flex gap-4">
              <Link href="/examples/blog">
                <Button variant="ghost" size="sm">Home</Button>
              </Link>
              <Link href="/examples/blog">
                <Button variant="ghost" size="sm">Articles</Button>
              </Link>
              <Link href="/examples/blog">
                <Button variant="ghost" size="sm">About</Button>
              </Link>
            </nav>
            <Button size="sm">Subscribe</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b-2 border-foreground bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <Badge className="mb-4">Featured</Badge>
            <h2 className="text-5xl font-bold mb-4">
              Welcome to Things Blog
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Discover articles about component design, development practices, 
              and building beautiful user interfaces with Things components.
            </p>
            <div className="flex gap-4">
              <Link href={`/examples/blog/${blogPosts[0].slug}`}>
                <Button size="lg">Read Latest</Button>
              </Link>
              <Button variant="outline" size="lg">Browse All</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Latest Articles</h2>
          <p className="text-muted-foreground">
            Explore our collection of tutorials, guides, and insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/examples/blog/${post.slug}`}>
              <Card className="h-full flex flex-col cursor-pointer transition-transform hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
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
                      <Button variant="outline" size="sm">Read →</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="border-t-2 border-foreground bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Stay Updated</CardTitle>
              <CardDescription className="text-lg">
                Get the latest articles and updates delivered to your inbox
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md border-2 border-foreground bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button>Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-foreground bg-background">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Things Blog. Built with Things components.
            </p>
            <div className="flex gap-4">
              <Link href="/examples/blog">
                <Button variant="ghost" size="sm">Privacy</Button>
              </Link>
              <Link href="/examples/blog">
                <Button variant="ghost" size="sm">Terms</Button>
              </Link>
              <Link href="/docs/examples">
                <Button variant="ghost" size="sm">← Back to Examples</Button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

