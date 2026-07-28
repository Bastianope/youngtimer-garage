import { notFound } from "next/navigation";
import { getVehicleByIdForOwner, getVehicleByIdPublic } from "@/lib/queries/vehicles";

const PRIVACY_LABELS: Record<string, string> = {
  private: "Privé",
  unlisted: "Non répertorié",
  public: "Public",
};

export default async function VehiculePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const ownerVehicle = await getVehicleByIdForOwner(id);
  const vehicle = ownerVehicle ?? (await getVehicleByIdPublic(id));

  if (!vehicle) {
    notFound();
  }

  const isOwner = ownerVehicle !== null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <p className="text-sm text-neutral-500">
        {vehicle.makeName} {vehicle.modelName}
      </p>
      <h1 className="mb-2 text-2xl font-semibold">{vehicle.generationName}</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        <span className="rounded-full border border-neutral-300 px-3 py-1 text-xs">
          {PRIVACY_LABELS[vehicle.privacyLevel] ?? vehicle.privacyLevel}
        </span>
        {isOwner && (
          <span className="rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs">
            Ton véhicule
          </span>
        )}
      </div>

      <dl className="grid grid-cols-2 gap-4 rounded-md border border-neutral-200 p-4">
        <div>
          <dt className="text-xs text-neutral-500">Année</dt>
          <dd className="text-sm">{vehicle.modelYear ?? "Non précisée"}</dd>
        </div>
        <div>
          <dt className="text-xs text-neutral-500">Kilométrage</dt>
          <dd className="text-sm">
            {vehicle.mileageKm !== null ? `${vehicle.mileageKm.toLocaleString("fr-FR")} km` : "Non précisé"}
          </dd>
        </div>
        {isOwner && vehicle.vin && (
          <div>
            <dt className="text-xs text-neutral-500">VIN</dt>
            <dd className="text-sm">{vehicle.vin}</dd>
          </div>
        )}
        {isOwner && vehicle.chassisNumber && (
          <div>
            <dt className="text-xs text-neutral-500">Numéro de châssis</dt>
            <dd className="text-sm">{vehicle.chassisNumber}</dd>
          </div>
        )}
      </dl>

      <p className="mt-6 text-sm text-neutral-500">
        Historique, entretien et médias seront disponibles dans une prochaine étape.
      </p>
    </div>
  );
}
