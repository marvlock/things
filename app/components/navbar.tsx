"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Command, CommandDialog, CommandInput, CommandList, type CommandItem } from "@/app/components/ui/command";
import { cn } from "@/lib/utils";

const navigation = {
  "Getting started": [
    { name: "Introduction", href: "/docs" },
    { name: "Installation", href: "/docs/installation" },
    { name: "Resources", href: "/docs/resources" },
    { name: "Examples", href: "/docs/examples" },
    { name: "Changelog", href: "/docs/changelog" },
  ],
  Components: [
    { name: "Accordion", href: "/docs/components/accordion" },
    { name: "Alert", href: "/docs/components/alert" },
    { name: "Alert Dialog", href: "/docs/components/alert-dialog" },
    { name: "Avatar", href: "/docs/components/avatar" },
    { name: "Badge", href: "/docs/components/badge" },
    { name: "Breadcrumb", href: "/docs/components/breadcrumb" },
    { name: "Button", href: "/docs/components/button" },
    { name: "Calendar", href: "/docs/components/calendar" },
    { name: "Card", href: "/docs/components/card" },
    { name: "Carousel", href: "/docs/components/carousel" },
    { name: "Checkbox", href: "/docs/components/checkbox" },
    { name: "Collapsible", href: "/docs/components/collapsible" },
    { name: "Combobox", href: "/docs/components/combobox" },
    { name: "Command", href: "/docs/components/command" },
    { name: "Context Menu", href: "/docs/components/context-menu" },
    { name: "Data Table", href: "/docs/components/data-table" },
    { name: "Date Picker", href: "/docs/components/date-picker" },
    { name: "Dialog", href: "/docs/components/dialog" },
    { name: "Drawer", href: "/docs/components/drawer" },
    { name: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
    { name: "Form", href: "/docs/components/form" },
    { name: "Hover Card", href: "/docs/components/hover-card" },
    { name: "Image Card", href: "/docs/components/image-card" },
    { name: "Input", href: "/docs/components/input" },
    { name: "Input OTP", href: "/docs/components/input-otp" },
    { name: "Label", href: "/docs/components/label" },
    { name: "Marquee", href: "/docs/components/marquee" },
    { name: "Menubar", href: "/docs/components/menubar" },
    { name: "Navigation Menu", href: "/docs/components/navigation-menu" },
    { name: "Pagination", href: "/docs/components/pagination" },
    { name: "Popover", href: "/docs/components/popover" },
    { name: "Progress", href: "/docs/components/progress" },
    { name: "Radio Group", href: "/docs/components/radio-group" },
    { name: "Resizable", href: "/docs/components/resizable" },
    { name: "Scroll Area", href: "/docs/components/scroll-area" },
    { name: "Select", href: "/docs/components/select" },
    { name: "Sheet", href: "/docs/components/sheet" },
    { name: "Sidebar", href: "/docs/components/sidebar" },
    { name: "Skeleton", href: "/docs/components/skeleton" },
    { name: "Slider", href: "/docs/components/slider" },
    { name: "Sonner", href: "/docs/components/sonner" },
    { name: "Switch", href: "/docs/components/switch" },
    { name: "Table", href: "/docs/components/table" },
    { name: "Tabs", href: "/docs/components/tabs" },
    { name: "Textarea", href: "/docs/components/textarea" },
    { name: "Tooltip", href: "/docs/components/tooltip" },
  ],
};

export function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const searchItems = React.useMemo<CommandItem[]>(() => {
    const items: CommandItem[] = [];
    
    // Add navigation items
    Object.entries(navigation).forEach(([group, groupItems]) => {
      groupItems.forEach((item) => {
        items.push({
          id: item.href,
          label: item.name,
          group,
          keywords: [item.name.toLowerCase(), group.toLowerCase()],
          onSelect: () => {
            router.push(item.href);
            setSearchOpen(false);
          },
        });
      });
    });

    // Add main navigation items
    items.push(
      {
        id: "/",
        label: "Home",
        group: "Navigation",
        keywords: ["home", "main"],
        onSelect: () => {
          router.push("/");
          setSearchOpen(false);
        },
      },
      {
        id: "/examples/blog",
        label: "Blog Example",
        group: "Examples",
        keywords: ["blog", "example"],
        onSelect: () => {
          router.push("/examples/blog");
          setSearchOpen(false);
        },
      },
      {
        id: "/examples/contact-form",
        label: "Contact Form Example",
        group: "Examples",
        keywords: ["contact", "form", "example"],
        onSelect: () => {
          router.push("/examples/contact-form");
          setSearchOpen(false);
        },
      },
      {
        id: "/examples/admin-panel",
        label: "Admin Panel Example",
        group: "Examples",
        keywords: ["admin", "panel", "example"],
        onSelect: () => {
          router.push("/examples/admin-panel");
          setSearchOpen(false);
        },
      }
    );

    return items;
  }, [router]);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      // Small delay to ensure the dialog is rendered
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchOpen]);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b-2 border-foreground bg-background transition-all",
        isScrolled && "neobrutalism-shadow-sm",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-foreground bg-background neobrutalism-shadow-sm">
            <svg
              className="h-6 w-6"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
              <rect x="6" y="6" width="20" height="20" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="2"/>
              <rect x="10" y="10" width="12" height="12" fill="currentColor"/>
            </svg>
          </div>
          <span className="text-xl font-bold">Things</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/docs/components/accordion"
            className="text-sm font-bold hover:text-primary transition-colors"
          >
            Components
          </Link>
          <Link
            href="/docs/examples"
            className="text-sm font-bold hover:text-primary transition-colors"
          >
            Examples
          </Link>
          <Link
            href="/docs"
            className="text-sm font-bold hover:text-primary transition-colors"
          >
            Docs
          </Link>
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-9 w-64 items-center gap-2 rounded-md border-2 border-foreground bg-background px-3 text-sm font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground neobrutalism-shadow-sm"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="flex-1 text-left">Search components...</span>
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border-2 border-foreground bg-muted px-1.5 font-mono text-[10px] font-bold sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          <Link
            href="https://github.com/marvlock/things"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm">GitHub</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-md border-2 border-foreground neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="text-xl font-bold">
            {isMobileMenuOpen ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t-2 border-foreground bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <button
              onClick={() => {
                setSearchOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex h-9 w-full items-center gap-2 rounded-md border-2 border-foreground bg-background px-3 text-sm font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground neobrutalism-shadow-sm"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="flex-1 text-left">Search components...</span>
            </button>
            <Link
              href="/docs/components/accordion"
              className="block text-sm font-bold hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Components
            </Link>
            <Link
              href="/docs/examples"
              className="block text-sm font-bold hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Examples
            </Link>
            <Link
              href="/docs"
              className="block text-sm font-bold hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Link
                href="https://github.com/marvlock/things"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button size="sm">GitHub</Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search Command Dialog */}
      <Command open={searchOpen} onOpenChange={setSearchOpen} items={searchItems}>
        <CommandDialog>
          <CommandInput ref={searchInputRef} placeholder="Search components, pages, and more..." />
          <CommandList />
        </CommandDialog>
      </Command>
    </nav>
  );
}
