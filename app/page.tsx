import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Youngtimer Garage</h1>
      <p className="mt-2 text-lg text-black/70">Ton garage. Leur histoire.</p>

      <p className="mx-auto mt-6 max-w-xl text-black/70">
        La plateforme française pour les passionnés de voitures youngtimer et
        classiques modernes. Rêve d&apos;un modèle, cherche-le, garde-le, et
        documente son histoire.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/garage"
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
        >
          Créer mon Garage
        </Link>
        <Link
          href="/explorer"
          className="rounded-md border border-black/20 px-4 py-2 text-sm font-medium"
        >
          Explorer les youngtimers
        </Link>
      </div>
    </div>
  );
}
