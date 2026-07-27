import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div>
      <p className="text-black/70">
        Gestion du catalogue automobile. Chaque modèle doit être publié
        explicitement pour apparaître sur le site public.
      </p>
      <div className="mt-4 flex gap-4">
        <Link
          href="/admin/marques"
          className="rounded-md border border-black/20 px-4 py-2 text-sm"
        >
          Gérer les marques
        </Link>
        <Link
          href="/admin/modeles"
          className="rounded-md border border-black/20 px-4 py-2 text-sm"
        >
          Gérer les modèles
        </Link>
      </div>
    </div>
  );
}
