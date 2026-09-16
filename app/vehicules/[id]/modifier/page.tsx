import { notFound } from "next/navigation";
import { getVehicleByIdForOwner } from "@/lib/queries/vehicles";
import { updateVehicleAction } from "./actions";
import { VehicleEditForm } from "@/components/vehicles/VehicleEditForm";

export default async function ModifierVehiculePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicleByIdForOwner(id);

  if (!vehicle) {
    notFound();
  }

  const boundUpdateAction = updateVehicleAction.bind(null, vehicle.id);

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Modifier le véhicule</h1>
      <VehicleEditForm vehicle={vehicle} updateAction={boundUpdateAction} />
    </div>
  );
}