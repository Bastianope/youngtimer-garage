import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/auth/actions";

const NAV_LINKS = [
  { href: "/explorer", label: "Explorer" },
  { href: "/modeles", label: "Modèles" },
  { href: "/garage", label: "Mon Garage" },
];

export async function SiteHeader() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const isAuthenticated = Boolean(data.user);

  return (
    <header className="border-b border-black/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold">
          Youngtimer Garage
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              <Link href="/profil">Profil</Link>
              <form action={signOut}>
                <button type="submit">Déconnexion</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/auth/connexion">Connexion</Link>
              <Link href="/auth/inscription">Inscription</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
