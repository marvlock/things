"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b-2 border-foreground bg-background transition-all",
        isScrolled && "neobrutalism-shadow-sm",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-foreground bg-primary text-primary-foreground neobrutalism-shadow-sm">
            <span className="text-xl font-bold">T</span>
          </div>
          <span className="text-xl font-bold">Things</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/docs/components/button"
            className="text-sm font-bold hover:text-primary transition-colors"
          >
            Components
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
          <Link href="/docs">
            <Button variant="outline" size="sm">
              Get Started
            </Button>
          </Link>
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
            <Link
              href="/docs/components/button"
              className="block text-sm font-bold hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Components
            </Link>
            <Link
              href="/docs"
              className="block text-sm font-bold hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Link href="/docs" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" size="sm">
                  Get Started
                </Button>
              </Link>
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
    </nav>
  );
}
