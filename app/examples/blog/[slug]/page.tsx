import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"

// Blog post data
const blogPosts: Record<string, {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  readTime: string
  content: string[]
}> = {
  "getting-started-with-things-components": {
    id: 1,
    title: "Getting Started with Things Components",
    excerpt: "Learn how to integrate Things components into your React project and start building beautiful interfaces.",
    author: "Pranav Murali",
    date: "December 22, 2025",
    category: "Tutorial",
    readTime: "5 min read",
    content: [
      "Welcome to Things Components! This guide will walk you through everything you need to know to get started with our blocky, funky-styled React components.",
      "Things is a collection of beautifully designed components that embrace a bold, raw aesthetic. Each component combines thick borders, strong shadows, and high-contrast colors to create distinctive UI elements with personality.",
      "To get started, you can simply copy and paste any component into your project. No npm installs required! All components are built from scratch using React and native HTML elements, with zero dependencies on UI libraries.",
      "Each component comes with full TypeScript support, comprehensive documentation, and examples in both TypeScript and JavaScript. You can customize everything to match your brand identity using Tailwind CSS.",
      "The design system refuses the usual components of UX-UI design and embraces funky, blocky design elements that stand out. Perfect for developers who want to build bold, eye-catching interfaces without compromising on accessibility or customization.",
    ],
  },
  "building-accessible-ui-components": {
    id: 2,
    title: "Building Accessible UI Components",
    excerpt: "A deep dive into creating accessible components that work for everyone, following WCAG guidelines.",
    author: "Pranav Murali",
    date: "December 22, 2025",
    category: "Design",
    readTime: "8 min read",
    content: [
      "Accessibility is not optional—it's essential. When building UI components, we must ensure they work for everyone, regardless of their abilities or the technologies they use.",
      "Things components are built with accessibility in mind from the ground up. Every component includes proper ARIA attributes, keyboard navigation support, and semantic HTML elements.",
      "Here are the key principles we follow:",
      "1. **Semantic HTML**: We use the right HTML elements for the right purpose. Buttons are actual `<button>` elements, not styled divs.",
      "2. **ARIA Labels**: All interactive elements have proper `aria-label` attributes for screen readers.",
      "3. **Keyboard Navigation**: Every component supports full keyboard navigation. Users can tab through interactive elements and activate them with Enter or Space.",
      "4. **Focus Management**: Focus states are clearly visible with high-contrast outlines that match our bold design aesthetic.",
      "5. **Color Contrast**: We maintain WCAG AA standards for color contrast, ensuring text is readable for users with visual impairments.",
      "By following these principles, we create components that are not only beautiful but also inclusive. Accessibility should never be an afterthought—it should be built into every component from day one.",
    ],
  },
  "neobrutalism-design-principles": {
    id: 3,
    title: "Neobrutalism Design Principles",
    excerpt: "Exploring the bold, blocky aesthetic that makes Things components stand out from the crowd.",
    author: "Pranav Murali",
    date: "December 22, 2025",
    category: "Design",
    readTime: "6 min read",
    content: [
      "Neobrutalism is a design movement that embraces raw, unpolished aesthetics. It's characterized by bold colors, thick borders, strong shadows, and a rejection of subtle gradients and soft shadows.",
      "Things components embody these principles perfectly. Here's what makes our design system unique:",
      "**Thick Borders**: Every component features a 2px border that creates clear definition and separation. No subtle 1px borders here—we go bold or go home.",
      "**Strong Shadows**: Our shadows are pronounced and offset, creating a sense of depth without subtlety. The `neobrutalism-shadow` class creates a shadow that's immediately noticeable.",
      "**High Contrast**: We use high-contrast color combinations that make elements pop. This not only looks striking but also improves accessibility.",
      "**Blocky Shapes**: Rounded corners are minimal. We prefer sharp, defined edges that create a geometric, almost pixelated aesthetic.",
      "**Bold Typography**: Fonts are heavy and impactful. We use bold weights liberally to create hierarchy and emphasis.",
      "This design philosophy rejects the minimalist trends of recent years. Instead, it celebrates the digital, the bold, and the unapologetic. It's perfect for brands that want to stand out and make a statement.",
      "When using Things components, embrace the boldness. Don't try to tone it down—let the components shine in their full, blocky glory.",
    ],
  },
  "typescript-best-practices-for-components": {
    id: 4,
    title: "TypeScript Best Practices for Components",
    excerpt: "How to write type-safe React components with TypeScript and maintain excellent developer experience.",
    author: "Pranav Murali",
    date: "December 22, 2025",
    category: "Development",
    readTime: "7 min read",
    content: [
      "TypeScript brings type safety to React components, catching errors at compile time and providing excellent IDE support. Here are the best practices we follow in Things components:",
      "**Use `forwardRef` for Refs**: When components need to forward refs, we use `React.forwardRef` to maintain type safety:",
      "```tsx\nconst Button = React.forwardRef<HTMLButtonElement, ButtonProps>(\n  ({ className, ...props }, ref) => (\n    <button ref={ref} className={cn(...)} {...props} />\n  )\n)\n```",
      "**Extend HTML Attributes**: Instead of creating new prop types from scratch, we extend native HTML attributes:",
      "```tsx\ntype ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {\n  variant?: 'default' | 'outline'\n}\n```",
      "**Use Type Aliases for Empty Interfaces**: When an interface only extends another type without adding properties, we use type aliases instead:",
      "```tsx\n// Good\ntype CardProps = React.HTMLAttributes<HTMLDivElement>\n\n// Avoid\ninterface CardProps extends React.HTMLAttributes<HTMLDivElement> {}\n```",
      "**Avoid `any` Types**: We never use `any`. Instead, we use `unknown` and type guards, or we create proper types for everything.",
      "**Context Types**: When creating React contexts, we always define proper types for the context value:",
      "```tsx\ninterface MyContextValue {\n  value: string\n  setValue: (value: string) => void\n}\n```",
      "By following these practices, we ensure that Things components provide excellent TypeScript support, catching errors early and providing great developer experience.",
    ],
  },
  "tailwind-css-customization-guide": {
    id: 5,
    title: "Tailwind CSS Customization Guide",
    excerpt: "Master the art of customizing Things components with Tailwind CSS to match your brand identity.",
    author: "Pranav Murali",
    date: "December 22, 2025",
    category: "Tutorial",
    readTime: "9 min read",
    content: [
      "Tailwind CSS makes it incredibly easy to customize Things components. Since all components use Tailwind utility classes, you can modify them to match your brand perfectly.",
      "**Using the `className` Prop**: The simplest way to customize is by passing additional classes through the `className` prop:",
      "```tsx\n<Button className='bg-purple-500 hover:bg-purple-600'>\n  Custom Button\n</Button>\n```",
      "**Extending Variants**: You can extend component variants by modifying the component code directly. For example, adding a new button variant:",
      "```tsx\nconst buttonVariants = cva(\n  'base-classes',\n  {\n    variants: {\n      variant: {\n        default: '...',\n        outline: '...',\n        custom: 'bg-purple-500' // Your custom variant\n      }\n    }\n  }\n)\n```",
      "**Global CSS Variables**: Customize colors globally by modifying CSS variables in your `globals.css`:",
      "```css\n:root {\n  --primary: 222.2 47.4% 11.2%;\n  --primary-foreground: 210 40% 98%;\n  /* Your custom colors */\n}\n```",
      "**Component Composition**: Build new components by composing existing Things components:",
      "```tsx\nfunction CustomCard({ children }) {\n  return (\n    <Card className='border-purple-500'>\n      <CardHeader>\n        <CardTitle>Custom Card</CardTitle>\n      </CardHeader>\n      <CardContent>{children}</CardContent>\n    </Card>\n  )\n}\n```",
      "**Responsive Design**: Use Tailwind's responsive prefixes to make components work on all screen sizes:",
      "```tsx\n<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>\n  {/* Responsive grid */}\n</div>\n```",
      "Remember: Since you own the code, you can customize everything. Don't be afraid to modify components to fit your exact needs!",
    ],
  },
  "performance-optimization-tips": {
    id: 6,
    title: "Performance Optimization Tips",
    excerpt: "Learn how to optimize your React applications when using Things components for better performance.",
    author: "Pranav Murali",
    date: "December 22, 2025",
    category: "Development",
    readTime: "6 min read",
    content: [
      "Performance is crucial for great user experience. Here are tips for optimizing applications built with Things components:",
      "**Code Splitting**: Use React's `lazy` and `Suspense` to split your code and load components only when needed:",
      "```tsx\nconst HeavyComponent = React.lazy(() => import('./HeavyComponent'))\n\n<Suspense fallback={<Skeleton />}>\n  <HeavyComponent />\n</Suspense>\n```",
      "**Memoization**: Use `React.memo` for components that receive the same props frequently:",
      "```tsx\nconst ExpensiveComponent = React.memo(({ data }) => {\n  // Expensive rendering\n})\n```",
      "**Avoid Unnecessary Re-renders**: Use `useCallback` and `useMemo` to prevent unnecessary re-renders:",
      "```tsx\nconst handleClick = React.useCallback(() => {\n  // Handler logic\n}, [dependencies])\n```",
      "**Image Optimization**: Use Next.js Image component instead of regular img tags for better performance:",
      "```tsx\nimport Image from 'next/image'\n\n<Image src='/image.jpg' width={500} height={300} alt='Description' />\n```",
      "**CSS Optimization**: Tailwind automatically purges unused CSS in production builds. Make sure your build process includes this optimization.",
      "**Bundle Size**: Since Things components are copy-paste, you only include the components you actually use. This keeps bundle sizes small.",
      "**Server-Side Rendering**: Use Next.js SSR/SSG features to improve initial load times and SEO.",
      "By following these practices, your applications will be fast, responsive, and provide excellent user experience.",
    ],
  },
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/examples/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

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

      {/* Article */}
      <article className="mx-auto max-w-4xl px-6 py-12">
        <Link href="/examples/blog">
          <Button variant="ghost" className="mb-8">
            ← Back to Articles
          </Button>
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="text-sm text-muted-foreground">{post.readTime}</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-3 mb-6">
            <div>
              <p className="text-sm font-bold">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.date}</p>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none space-y-6">
          {post.content.map((paragraph, index) => {
            // Check if paragraph contains code blocks
            if (paragraph.startsWith("```")) {
              const codeMatch = paragraph.match(/```(\w+)?\n([\s\S]*?)```/)
              if (codeMatch) {
                const code = codeMatch[2]
                return (
                  <div
                    key={index}
                    className="rounded-lg border-2 border-foreground bg-muted p-4 overflow-x-auto"
                  >
                    <pre className="text-sm">
                      <code>{code}</code>
                    </pre>
                  </div>
                )
              }
            }
            
            // Check if paragraph contains bold text
            if (paragraph.includes("**")) {
              const parts = paragraph.split(/(\*\*.*?\*\*)/g)
              return (
                <p key={index} className="text-lg leading-relaxed">
                  {parts.map((part, i) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return (
                        <strong key={i} className="font-bold">
                          {part.slice(2, -2)}
                        </strong>
                      )
                    }
                    return <span key={i}>{part}</span>
                  })}
                </p>
              )
            }

            return (
              <p key={index} className="text-lg leading-relaxed">
                {paragraph}
              </p>
            )
          })}
        </div>

        {/* Related Posts */}
        <div className="mt-16 pt-8 border-t-2 border-foreground">
          <h2 className="text-3xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(blogPosts)
              .filter((p) => p.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => {
                const slug = Object.keys(blogPosts).find(
                  (key) => blogPosts[key].id === relatedPost.id
                )
                return (
                  <Link key={relatedPost.id} href={`/examples/blog/${slug}`}>
                    <Card className="h-full cursor-pointer transition-transform hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                      <CardHeader>
                        <Badge variant="secondary" className="w-fit mb-2">
                          {relatedPost.category}
                        </Badge>
                        <CardTitle>{relatedPost.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {relatedPost.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {relatedPost.date} · {relatedPost.readTime}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
          </div>
        </div>
      </article>

      {/* Newsletter Section */}
      <section className="border-t-2 border-foreground bg-muted/50 mt-16">
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

