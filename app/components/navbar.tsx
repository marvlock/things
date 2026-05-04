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
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <svg
              className="h-8 w-8"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" fill="currentColor" />
              <rect x="6" y="6" width="20" height="20" fill="hsl(var(--background))" />
              <rect x="10" y="10" width="12" height="12" fill="currentColor"/>
            </svg>
            <span className="text-lg md:text-xl font-bold transition-all">Things</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 items-center justify-center space-x-6 xl:space-x-8">
          <Link
            href="/docs/components/accordion"
            className="text-sm font-bold hover:text-primary hover:underline underline-offset-4 decoration-2 transition-colors uppercase tracking-wider"
          >
            Components
          </Link>
          <Link
            href="/docs/examples"
            className="text-sm font-bold hover:text-primary hover:underline underline-offset-4 decoration-2 transition-colors uppercase tracking-wider"
          >
            Examples
          </Link>
          <Link
            href="/docs"
            className="text-sm font-bold hover:text-primary hover:underline underline-offset-4 decoration-2 transition-colors uppercase tracking-wider"
          >
            Docs
          </Link>
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex flex-1 items-center justify-end space-x-2 xl:space-x-4">
          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden xl:flex h-10 w-48 items-center gap-2 rounded-md border-2 border-foreground bg-background px-3 text-sm font-bold text-muted-foreground transition-all hover:bg-muted hover:text-foreground neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
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
            <span className="flex-1 text-left">Search...</span>
            <kbd className="pointer-events-none hidden h-6 min-w-[36px] select-none items-center justify-center gap-1 rounded border-2 border-foreground bg-muted font-mono text-[10px] font-bold sm:flex leading-tight">
              <span>⌘</span>
              <span>K</span>
            </kbd>
          </button>
          {/* Search Icon for tablet */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex lg:hidden h-10 w-10 items-center justify-center rounded-md border-2 border-foreground bg-background transition-all hover:bg-muted neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
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
          </button>
          <Link
            href="https://github.com/marvlock/things"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-foreground transition-all hover:bg-muted neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            aria-label="GitHub"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </Link>
        </div>

        {/* Mobile & Tablet Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-foreground bg-background transition-all hover:bg-muted neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            aria-label="Search"
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
          </button>
          <Link
            href="https://github.com/marvlock/things"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-foreground transition-all hover:bg-muted neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            aria-label="GitHub"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </Link>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-foreground neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="text-xl font-bold">
              {isMobileMenuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-foreground bg-background">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/docs/components/accordion"
                className="block text-sm font-bold hover:text-primary hover:underline underline-offset-4 decoration-2 transition-colors uppercase tracking-wider"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Components
              </Link>
              <Link
                href="/docs/examples"
                className="block text-sm font-bold hover:text-primary hover:underline underline-offset-4 decoration-2 transition-colors uppercase tracking-wider"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Examples
              </Link>
              <Link
                href="/docs"
                className="block text-sm font-bold hover:text-primary hover:underline underline-offset-4 decoration-2 transition-colors uppercase tracking-wider"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Docs
              </Link>
            </nav>
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
