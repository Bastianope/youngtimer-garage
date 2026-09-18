
import Link from "next/link";
import { getTotalVehiclesCount } from "@/lib/queries/garage";
import { getUpcomingEvents } from "@/lib/queries/events";

export default async function ExplorerPage() {
  const totalVehicles = await getTotalVehiclesCount();
  const events = await getUpcomingEvents();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">Explorer</h1>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Qu&apos;est-ce qu&apos;un youngtimer ?</h2>
        <p className="mt-2 text-black/70">
          Le terme &quot;youngtimer&quot; est apparu en Allemagne dans les années 2000
          pour désigner les voitures d&apos;occasion &quot;entre deux âges&quot; : plus tout
          à fait des occasions ordinaires, pas encore de vraies voitures de
          collection (&quot;oldtimers&quot;). On situe généralement cette tranche entre
          20 et 30 ans d&apos;existence, ce qui couvre aujourd&apos;hui surtout des
          modèles sortis des années 1980 au début des années 2000.
        </p>
        <p className="mt-2 text-black/70">
          Contrairement à la notion de &quot;collector&quot;, qui dépend de la rareté et
          des volumes de production, le youngtimer se définit avant tout par
          son âge. Ces voitures profitent souvent d&apos;une mécanique encore
          simple à entretenir et de tarifs d&apos;achat raisonnables, ce qui en
          fait des classiques accessibles et utilisables au quotidien — avant
          que la cote ne s&apos;envole.
        </p>
      </section>

      <p className="mt-6 text-sm text-black/60">
        {totalVehicles} véhicule{totalVehicles > 1 ? "s" : ""} déjà
        enregistré{totalVehicles > 1 ? "s" : ""} dans les Garages de la
        communauté.
      </p>

      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Rassemblements à venir</h2>
        {events.length === 0 ? (
          <p className="text-black/60">Aucun rassemblement à venir pour l&apos;instant.</p>
        ) : (
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event.id} className="border rounded-lg p-4">
                <Link
                  href={`/explorer/rassemblements/${event.id}`}
                  className="text-lg font-medium hover:underline"
                >
                  {event.title}
                </Link>
                <p className="text-sm text-gray-600">
                  {new Date(event.start_date).toLocaleDateString("fr-FR")}
                  {event.end_date &&
                    ` — ${new Date(event.end_date).toLocaleDateString("fr-FR")}`}
                  {" · "}
                  {event.city}
                </p>
                {event.description && (
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                    {event.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}

        <Link
          href="/explorer/rassemblements/ajouter"
          className="mt-6 inline-block bg-black text-white rounded px-4 py-2 text-sm"
        >
          Proposer un rassemblement
        </Link>
      </section>
    </div>
  );
}
