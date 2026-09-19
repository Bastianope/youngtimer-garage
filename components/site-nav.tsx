"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/auth/actions";

const NAV_LINKS = [
  { href: "/explorer", label: "Explorer" },
  { href: "/modeles", label: "Modèles" },
  { href: "/garage", label: "Mon Garage" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav({ isAuthenticated }: { isAuthenticated: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6 text-sm">
      <ul className="flex items-center gap-6">
        {NAV_LINKS.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <li key={link.href} className="relative py-1">
              <Link
                href={link.href}
                prefetch={false}
                className={
                  active
                    ? "text-black"
                    : "text-black/60 transition-colors hover:text-black"
                }
              >
                {link.label}
              </Link>
              {active && (
                <span
                  className="absolute inset-x-0 -bottom-3 h-[3px] bg-[#C81E1E]"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ul>

      <span className="h-4 w-px bg-black/15" aria-hidden="true" />

      {isAuthenticated ? (
        <div className="flex items-center gap-6">
          <Link
            href="/profil"
            prefetch={false}
            className={
              isActive(pathname, "/profil")
                ? "text-black"
                : "text-black/60 transition-colors hover:text-black"
            }
          >
            Profil
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="text-black/60 transition-colors hover:text-black"
            >
              Déconnexion
            </button>
          </form>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <Link
            href="/auth/connexion"
            prefetch={false}
            className="text-black/60 transition-colors hover:text-black"
          >
            Connexion
          </Link>
          <Link
            href="/auth/inscription"
            prefetch={false}
            className="rounded-sm bg-black px-3 py-1.5 text-white transition-colors hover:bg-black/85"
          >
            Inscription
          </Link>
        </div>
      )}
    </nav>
  );
}
