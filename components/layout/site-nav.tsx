"use client";

import { useState } from "react";
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

const idle = "text-black/60 transition-colors hover:text-black";

export function SiteNav({ isAuthenticated }: { isAuthenticated: boolean }) {
  const pathname = usePathname();
  // Le menu mobile n'est ouvert que pour la page où on l'a ouvert :
  // il se referme tout seul après un clic sur un lien
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  return (
    <>
      {/* Ordinateur et tablette */}
      <nav className="hidden items-center gap-6 text-sm md:flex">
        <ul className="flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href} className="relative py-1">
                <Link href={link.href} prefetch={false} className={active ? "text-black" : idle}>
                  {link.label}
                </Link>
                {active && <span className="absolute inset-x-0 -bottom-[13px] h-[3px] bg-[#C81E1E]" aria-hidden="true" />}
              </li>
            );
          })}
        </ul>

        <span className="h-4 w-px bg-black/15" aria-hidden="true" />

        {isAuthenticated ? (
          <div className="flex items-center gap-6">
            <Link href="/profil" prefetch={false} className={isActive(pathname, "/profil") ? "text-black" : idle}>
              Profil
            </Link>
            <form action={signOut}>
              <button type="submit" className={idle}>Déconnexion</button>
            </form>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <Link href="/auth/connexion" prefetch={false} className={idle}>Connexion</Link>
            <Link href="/auth/inscription" prefetch={false} className="rounded-sm bg-black px-3 py-1.5 text-white transition-colors hover:bg-black/85">
              Inscription
            </Link>
          </div>
        )}
      </nav>

      {/* Téléphone : bouton menu */}
      <button
        type="button"
        onClick={() => setOpenOn(open ? null : pathname)}
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        className="flex h-11 w-11 items-center justify-center rounded-md border border-black/15 md:hidden"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <nav id="menu-mobile" className="absolute inset-x-0 top-full border-b border-black/10 bg-white shadow-lg md:hidden">
          <ul className="mx-auto flex max-w-5xl flex-col px-4 py-2 text-base">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className={`flex items-center gap-3 py-3 ${active ? "font-medium text-black" : "text-black/70"}`}
                  >
                    <span className={`h-5 w-1 ${active ? "bg-[#C81E1E]" : "bg-transparent"}`} aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mx-auto flex max-w-5xl items-center gap-4 border-t border-black/10 px-4 py-3 text-base">
            {isAuthenticated ? (
              <>
                <Link href="/profil" prefetch={false} className="py-2 text-black/70">Profil</Link>
                <form action={signOut} className="ml-auto">
                  <button type="submit" className="py-2 text-black/70">Déconnexion</button>
                </form>
              </>
            ) : (
              <>
                <Link href="/auth/connexion" prefetch={false} className="py-2 text-black/70">Connexion</Link>
                <Link href="/auth/inscription" prefetch={false} className="ml-auto rounded-sm bg-black px-4 py-2 text-white">
                  Inscription
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
