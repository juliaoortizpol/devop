"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollNavWrapperProps {
  children: React.ReactNode;
}

export function ScrollNavWrapper({ children }: ScrollNavWrapperProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-xl border-b border-surface-container-high shadow-sm transition-all duration-300",
        scrolled ? "py-2 h-14" : "h-16"
      )}
    >
      {children}
    </nav>
  );
}
