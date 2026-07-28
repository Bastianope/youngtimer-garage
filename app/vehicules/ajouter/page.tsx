import { VehicleCreationFlow } from "@/components/vehicles/VehicleCreationFlow";

export default function AjouterVehiculePage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Ajouter un véhicule</h1>
      <VehicleCreationFlow />
    </div>
  );
}
