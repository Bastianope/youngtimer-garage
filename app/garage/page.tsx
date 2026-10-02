import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getGarageItemsForCurrentUser } from "@/lib/queries/garage";
import { GarageItemCard } from "@/components/garage/garage-item-card";
import { getGarageActivity, getGarageTodos, getVehicleThumbnails } from "@/lib/queries/garage-dashboard";

const CATEGORY_LABELS: Record<string, string> = {
  oil_service: "Vidange / révision",
  brakes: "Freinage",
  timing: "Distribution",
  tyres: "Pneumatiques",
  suspension: "Suspension / direction",
  electrical: "Électricité",
  bodywork: "Carrosserie / peinture",
  interior: "Intérieur",
  inspection: "Contrôle technique",
  restoration: "Restauration",
  other: "Autre",
};

const ACTIVITY_LABELS = { maintenance: "Entretien", event: "Moment", photo: "Photo" } as const;

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("fr-FR");
}

const SECTIONS = [
  { status: "owned" as const, title: "Mes voitures" },
  { status: "searching" as const, title: "Mes recherches" },
  { status: "dream" as const, title: "Mes rêves" },
];

export default async function GaragePage() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    redirect("/auth/connexion");
  }

  const items = await getGarageItemsForCurrentUser();
  const vehicleIds = items.flatMap((item) => (item.vehicle_id ? [item.vehicle_id] : []));
  const [thumbnails, todos, activity] = await Promise.all([
    getVehicleThumbnails(vehicleIds),
    getGarageTodos(),
    getGarageActivity(),
  ]);

  return (
    <div className="relative isolate">
      {/* Fond photo atelier */}
      <div aria-hidden className="fixed inset-0 -z-10">
        <Image
          src="/images/garage-atelier-plate-blurred.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,18,15,0.88) 0%, rgba(20,18,15,0.93) 100%)",
          }}
        />
      </div>

      <div className="relative">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#F5F0E6]">Mon Garage</h1>
          <Link
            href="/garage/ajouter"
            className="rounded-md border border-[#F5F0E6]/30 px-4 py-2 text-sm text-[#F5F0E6] transition hover:border-[#F5F0E6]/50"
          >
            + Ajouter une voiture
          </Link>
        </div>

{SECTIONS.map((section) => {
  const sectionItems = items.filter(
    (item) => item.status === section.status,
  );
  return (
    <section key={section.status} className="mt-8">
      <h2 className="text-lg font-semibold text-[#F5F0E6]">
        {section.title}
      </h2>
      <div className="mt-3 space-y-3 rounded-lg bg-[#F5F0E6]/95 p-4">
        {sectionItems.map((item) => (
          <GarageItemCard key={item.id} item={item} photoUrl={item.vehicle_id ? thumbnails[item.vehicle_id] : undefined} />
        ))}
        {sectionItems.length === 0 ? (
          <p className="text-sm text-black/50">Rien pour l&apos;instant.</p>
        ) : null}
      </div>
    </section>
  );
})}

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-[#F5F0E6]">À faire</h2>
          <div className="mt-3 rounded-lg bg-[#F5F0E6]/95 p-4">
            {todos.length === 0 ? (
              <p className="text-sm text-black/50">
                Aucun entretien à prévoir. Ajoute-les depuis la fiche de ta voiture, section Entretien.
              </p>
            ) : (
              <ul className="divide-y divide-black/10">
                {todos.map((todo) => (
                  <li key={todo.id} className="flex flex-wrap items-baseline justify-between gap-2 py-2 text-sm">
                    <span>
                      <Link href={`/vehicules/${todo.vehicleId}`} className="font-medium underline">
                        {todo.vehicleName}
                      </Link>
                      {" — "}
                      {CATEGORY_LABELS[todo.category] ?? todo.category}
                      {todo.description ? ` : ${todo.description}` : ""}
                    </span>
                    <span className={`text-xs ${todo.overdue ? "font-semibold text-red-700" : "text-black/60"}`}>
                      {todo.overdue ? "En retard · " : ""}
                      {[
                        todo.dueDate ? `avant le ${formatDate(todo.dueDate)}` : null,
                        todo.dueMileageKm !== null ? `à ${todo.dueMileageKm.toLocaleString("fr-FR")} km` : null,
                      ]
                        .filter(Boolean)
                        .join(" ou ")}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-[#F5F0E6]">Ton activité récente</h2>
          <div className="mt-3 rounded-lg bg-[#F5F0E6]/95 p-4">
            {activity.length === 0 ? (
              <p className="text-sm text-black/50">
                Rien pour l&apos;instant. Photos, entretiens et moments ajoutés sur tes voitures apparaîtront ici.
              </p>
            ) : (
              <ul className="divide-y divide-black/10">
                {activity.map((entry) => (
                  <li key={entry.key} className="flex flex-wrap items-baseline justify-between gap-2 py-2 text-sm">
                    <span>
                      <span className="mr-2 rounded-full border border-black/20 px-2 py-0.5 text-xs">
                        {ACTIVITY_LABELS[entry.kind]}
                      </span>
                      <Link href={`/vehicules/${entry.vehicleId}`} className="underline">
                        {entry.vehicleName}
                      </Link>
                      {" — "}
                      {CATEGORY_LABELS[entry.label] ?? entry.label}
                    </span>
                    <span className="text-xs text-black/50">{formatDate(entry.createdAt)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
