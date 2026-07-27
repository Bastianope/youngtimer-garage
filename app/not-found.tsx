import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Page introuvable</h1>
      <p className="mt-2 text-black/70">
        Cette page n&apos;existe pas ou plus.
      </p>
      <Link href="/" className="mt-4 inline-block underline">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
