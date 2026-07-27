import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminOrEditor } from "@/lib/auth/roles";

const ADMIN_LINKS = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/marques", label: "Marques" },
  { href: "/admin/modeles", label: "Modèles" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allowed = await isAdminOrEditor();

  if (!allowed) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between border-b border-black/10 pb-4">
        <h1 className="text-lg font-semibold">Administration du catalogue</h1>
        <nav className="flex gap-4 text-sm">
          {ADMIN_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
