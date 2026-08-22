import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getGarageItemsForCurrentUser } from "@/lib/queries/garage";
import { GarageItemCard } from "@/components/garage/garage-item-card";

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

      <div className="relative mx-auto max-w-3xl px-4 py-12">
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
          <GarageItemCard key={item.id} item={item} />
        ))}
        {sectionItems.length === 0 ? (
          <p className="text-sm text-black/50">Rien pour l&apos;instant.</p>
        ) : null}
      </div>
    </section>
  );
})}

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-[#F5F0E6]">Ton activité récente</h2>
          <p className="mt-2 text-sm text-[#F5F0E6]/50">
            Cette section sera implémentée dans une phase ultérieure.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-[#F5F0E6]">À faire</h2>
          <p className="mt-2 text-sm text-[#F5F0E6]/50">
            Cette section sera implémentée dans une phase ultérieure.
          </p>
        </section>
      </div>
    </div>
  );
}