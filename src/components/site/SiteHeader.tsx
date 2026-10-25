"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const navigation = [
  { href: "#services", label: "Services" },
  { href: "#solutions", label: "Solutions" },
  { href: "#approach", label: "Our Approach" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-sky-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center rounded-control focus-visible:outline-offset-4"
          aria-label={`${site.name} home`}
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/brand/optimus-mark.svg"
            alt=""
            width={48}
            height={48}
            className="md:hidden"
          />
          <Image
            src="/brand/optimus-logo.svg"
            alt=""
            width={228}
            height={46}
            className="hidden md:block"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navigation.slice(0, 3).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-control px-1 py-2 text-sm font-medium text-ink-800 transition-colors hover:text-green-700"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-control bg-green-500 px-5 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-green-700 hover:text-white"
          >
            Discuss a Project
          </a>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-control border border-sky-200 text-navy-950 hover:bg-sky-50 md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`${menuOpen ? "border-t border-sky-200 bg-white px-4 py-3 shadow-sm" : "hidden"} md:hidden`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 sm:px-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-control px-3 py-3 font-medium text-navy-950 hover:bg-sky-50"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
      </nav>
    </header>
  );
}
