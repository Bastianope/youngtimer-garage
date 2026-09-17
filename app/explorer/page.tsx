import { getTotalVehiclesCount } from "@/lib/queries/garage";

export default async function ExplorerPage() {
  const totalVehicles = await getTotalVehiclesCount();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">Explorer</h1>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Qu'est-ce qu'un youngtimer ?</h2>
        <p className="mt-2 text-black/70">
          Le terme "youngtimer" est apparu en Allemagne dans les années 2000
          pour désigner les voitures d'occasion "entre deux âges" : plus tout
          à fait des occasions ordinaires, pas encore de vraies voitures de
          collection ("oldtimers"). On situe généralement cette tranche entre
          20 et 30 ans d'existence, ce qui couvre aujourd'hui surtout des
          modèles sortis des années 1980 au début des années 2000.
        </p>
        <p className="mt-2 text-black/70">
          Contrairement à la notion de "collector", qui dépend de la rareté et
          des volumes de production, le youngtimer se définit avant tout par
          son âge. Ces voitures profitent souvent d'une mécanique encore
          simple à entretenir et de tarifs d'achat raisonnables, ce qui en
          fait des classiques accessibles et utilisables au quotidien — avant
          que la cote ne s'envole.
        </p>
      </section>

      <p className="mt-6 text-sm text-black/60">
        {totalVehicles} véhicule{totalVehicles > 1 ? "s" : ""} déjà
        enregistré{totalVehicles > 1 ? "s" : ""} dans les Garages de la
        communauté.
      </p>
    </div>
  );
} 