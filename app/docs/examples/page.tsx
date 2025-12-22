import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-5xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Examples</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Real-world examples built with Things components.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            Explore complete examples showcasing how to build real applications 
            using Things components. Each example demonstrates different use cases 
            and component combinations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Link href="/examples/blog">
              <Card className="h-full cursor-pointer transition-transform hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                <CardHeader>
                  <CardTitle>Blog Website</CardTitle>
                  <CardDescription>
                    A complete blog website showcasing articles, navigation, and content layout
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/examples/contact-form">
              <Card className="h-full cursor-pointer transition-transform hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                  <CardDescription>
                    A comprehensive contact form with validation, inputs, selects, radio groups, and checkboxes
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/examples/admin-panel">
              <Card className="h-full cursor-pointer transition-transform hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                <CardHeader>
                  <CardTitle>Admin Panel</CardTitle>
                  <CardDescription>
                    A complete admin dashboard with sidebar navigation, data tables, dialogs, and user management
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

