import { getAllMakes } from "@/lib/queries/catalogue";
import { CreateMakeForm } from "@/components/admin/create-make-form";

export default async function AdminMarquesPage() {
  const makes = await getAllMakes();

  return (
    <div>
      <h2 className="text-base font-semibold">Nouvelle marque</h2>
      <div className="mt-3">
        <CreateMakeForm />
      </div>

      <h2 className="mt-8 text-base font-semibold">
        Marques existantes ({makes.length})
      </h2>
      <ul className="mt-3 divide-y divide-black/10">
        {makes.map((make) => (
          <li key={make.id} className="py-2 text-sm">
            {make.name}{" "}
            <span className="text-black/50">
              ({make.slug}
              {make.country_origin ? ` — ${make.country_origin}` : ""})
            </span>
          </li>
        ))}
        {makes.length === 0 ? (
          <li className="py-2 text-sm text-black/50">
            Aucune marque pour l&apos;instant.
          </li>
        ) : null}
      </ul>
    </div>
  );
}
