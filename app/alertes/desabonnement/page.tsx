import type { Metadata } from "next";
import Link from "next/link";
import { unsubscribeListingAlertAction } from "@/lib/actions/listing-alerts";

export const metadata: Metadata = {
  title: "Désinscription des alertes — Youngtimer Garage",
  robots: { index: false },
};

const STATES: Record<string, string> = {
  ok: "C'est fait : tu ne recevras plus d'e-mail pour ce modèle.",
  invalide: "Ce lien de désinscription n'est pas valide.",
  erreur: "La désinscription n'a pas pu être enregistrée. Réessaie dans un instant.",
};

// Un bouton à confirmer plutôt qu'une désinscription à l'ouverture du lien :
// certaines messageries visitent les liens des e-mails automatiquement.
export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ jeton?: string; etat?: string }>;
}) {
  const { jeton, etat } = await searchParams;
  const state = etat ? STATES[etat] : undefined;

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-bold">Alertes annonces</h1>

      {state ? (
        <p className="mt-4 text-black/70">{state}</p>
      ) : jeton ? (
        <form action={unsubscribeListingAlertAction.bind(null, jeton)} className="mt-4">
          <p className="text-black/70">Tu ne recevras plus d&apos;e-mail pour les nouvelles annonces de ce modèle.</p>
          <button type="submit" className="mt-4 rounded-md bg-black px-4 py-2 text-sm text-white">
            Confirmer la désinscription
          </button>
        </form>
      ) : (
        <p className="mt-4 text-black/70">{STATES.invalide}</p>
      )}

      <p className="mt-8 text-sm">
        <Link href="/profil" className="underline">Gérer toutes mes alertes</Link>
      </p>
    </div>
  );
}
