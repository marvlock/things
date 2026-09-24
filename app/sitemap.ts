import type { MetadataRoute } from "next"

const siteUrl = "https://things.marvlock.com"

const routes = [
  "", "/docs", "/docs/changelog", "/docs/examples", "/docs/installation", "/privacy", "/terms",
  "/examples/admin-panel", "/examples/blog", "/examples/contact-form", "/examples/launch-board", "/examples/pricing", "/examples/workspace-settings",
  "/docs/components/accordion", "/docs/components/alert", "/docs/components/alert-dialog", "/docs/components/avatar",
  "/docs/components/badge", "/docs/components/breadcrumb", "/docs/components/button", "/docs/components/calendar",
  "/docs/components/card", "/docs/components/carousel", "/docs/components/checkbox", "/docs/components/collapsible",
  "/docs/components/combobox", "/docs/components/command", "/docs/components/context-menu", "/docs/components/data-table",
  "/docs/components/date-picker", "/docs/components/dialog", "/docs/components/drawer", "/docs/components/dropdown-menu",
  "/docs/components/form", "/docs/components/hover-card", "/docs/components/image-card", "/docs/components/input",
  "/docs/components/input-otp", "/docs/components/label", "/docs/components/marquee", "/docs/components/menubar",
  "/docs/components/navigation-menu", "/docs/components/pagination", "/docs/components/popover", "/docs/components/progress",
  "/docs/components/radio-group", "/docs/components/resizable", "/docs/components/scroll-area", "/docs/components/select",
  "/docs/components/sheet", "/docs/components/sidebar", "/docs/components/skeleton", "/docs/components/slider",
  "/docs/components/sonner", "/docs/components/switch", "/docs/components/table", "/docs/components/tabs",
  "/docs/components/textarea", "/docs/components/tooltip",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route.startsWith("/docs/components/") ? "monthly" : "weekly",
    priority: route === "" ? 1 : route === "/docs" ? 0.9 : 0.7,
  }))
}
