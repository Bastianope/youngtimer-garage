import { notFound } from "next/navigation";
import Link from "next/link";
import { getVehicleByIdForOwner, getVehicleByIdPublic } from "@/lib/queries/vehicles";
import {
  getMaintenanceRecords,
  getVehicleEvents,
  getVehicleOwnerships,
  getVehiclePhotos,
} from "@/lib/queries/vehicle-pedigree";
import {
  addEventAction,
  addMaintenanceAction,
  addPreviousOwnerAction,
  deleteEventAction,
  deleteMaintenanceAction,
  deletePhotoAction,
  deletePreviousOwnerAction,
  markMaintenanceDoneAction,
} from "@/lib/actions/vehicle-pedigree";
import { VehiclePhotoUpload } from "@/components/vehicles/VehiclePhotoUpload";

const PRIVACY_LABELS: Record<string, string> = {
  private: "Privé",
  unlisted: "Non répertorié",
  public: "Public",
};

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

const EVENT_LABELS: Record<string, string> = {
  purchase: "Achat",
  restoration: "Restauration",
  meeting: "Rassemblement / sortie",
  award: "Concours / prix",
  note: "Anecdote",
};

const input = "w-full rounded-md border border-neutral-300 p-2 text-sm";
const label = "block text-xs text-neutral-500";
const button = "rounded-md bg-black px-4 py-2 text-sm text-white";
const smallLink = "text-xs text-neutral-500 underline";

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleDateString("fr-FR") : null;
}

function formatKm(value: number | null) {
  return value !== null ? `${value.toLocaleString("fr-FR")} km` : null;
}

// "Série 8 (E31) — édition à vérifier" -> "Série 8 (E31)"
function cleanGenerationName(name: string) {
  return name.replace(/\s*[—-]\s*édition à vérifier\s*$/i, "").trim();
}

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

  const [photos, maintenance, events, ownerships] = await Promise.all([
    getVehiclePhotos(vehicle.id),
    getMaintenanceRecords(vehicle.id),
    getVehicleEvents(vehicle.id),
    isOwner ? getVehicleOwnerships(vehicle.id) : Promise.resolve([]),
  ]);

  const planned = maintenance.filter((r) => r.status === "planned");
  const completed = maintenance.filter((r) => r.status === "completed");
  const generation = cleanGenerationName(vehicle.generationName);
  const showGeneration = generation.length > 0 && generation !== vehicle.modelName;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {showGeneration ? <p className="text-sm text-neutral-500">{generation}</p> : null}
      <h1 className="mb-2 text-2xl font-semibold">
        {vehicle.makeName} {vehicle.modelName}
        {vehicle.modelYear ? <span className="font-normal text-neutral-500"> · {vehicle.modelYear}</span> : null}
      </h1>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-neutral-300 px-3 py-1 text-xs">
          {PRIVACY_LABELS[vehicle.privacyLevel] ?? vehicle.privacyLevel}
        </span>
        {isOwner && (
          <span className="rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs">
            Ton véhicule
          </span>
        )}
        {isOwner && (
          <Link href={`/vehicules/${vehicle.id}/modifier`} className="text-sm text-neutral-500 underline">
            Modifier
          </Link>
        )}
      </div>

      {photos.length > 0 && (
        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {photos.map((photo, index) => (
            <figure key={photo.id} className={index === 0 ? "col-span-2 sm:col-span-3" : ""}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.caption ?? `${vehicle.makeName} ${vehicle.modelName}`}
                className={`w-full rounded-md object-cover ${index === 0 ? "h-80" : "h-40"}`}
              />
              {(photo.caption || isOwner) && (
                <figcaption className="mt-1 flex items-center justify-between gap-2 text-xs text-neutral-500">
                  <span>
                    {photo.caption}
                    {isOwner && !photo.isPublic ? " (privée)" : ""}
                  </span>
                  {isOwner && (
                    <form action={deletePhotoAction.bind(null, vehicle.id, photo.id)}>
                      <button type="submit" className={smallLink}>Supprimer</button>
                    </form>
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {isOwner && (
        <div className="mb-8">
          <VehiclePhotoUpload vehicleId={vehicle.id} vehicleIsPublic={vehicle.privacyLevel === "public"} />
        </div>
      )}

      <dl className="grid grid-cols-2 gap-4 rounded-md border border-neutral-200 p-4">
        <div>
          <dt className={label}>Année</dt>
          <dd className="text-sm">{vehicle.modelYear ?? "Non précisée"}</dd>
        </div>
        <div>
          <dt className={label}>Kilométrage</dt>
          <dd className="text-sm">{formatKm(vehicle.mileageKm) ?? "Non précisé"}</dd>
        </div>
        {isOwner && ownerships.length > 0 && (
          <div>
            <dt className={label}>Propriétaires connus</dt>
            <dd className="text-sm">{ownerships.length}</dd>
          </div>
        )}
        {isOwner && vehicle.purchasePriceAmount !== null && (
          <div>
            <dt className={label}>Prix d&apos;achat</dt>
            <dd className="text-sm">{vehicle.purchasePriceAmount.toLocaleString("fr-FR")} €</dd>
          </div>
        )}
        {isOwner && vehicle.purchaseDate && (
          <div>
            <dt className={label}>Date d&apos;achat</dt>
            <dd className="text-sm">{formatDate(vehicle.purchaseDate)}</dd>
          </div>
        )}
        {isOwner && vehicle.vin && (
          <div>
            <dt className={label}>VIN</dt>
            <dd className="text-sm">{vehicle.vin}</dd>
          </div>
        )}
        {isOwner && vehicle.chassisNumber && (
          <div>
            <dt className={label}>Numéro de châssis</dt>
            <dd className="text-sm">{vehicle.chassisNumber}</dd>
          </div>
        )}
      </dl>

      {(vehicle.description || vehicle.options) && (
        <section className="mt-6">
          <h2 className="text-sm font-medium text-neutral-700">Description et options</h2>
          {vehicle.description && (
            <p className="mt-1 whitespace-pre-wrap text-sm text-neutral-600">{vehicle.description}</p>
          )}
          {vehicle.options && (
            <p className="mt-1 whitespace-pre-wrap text-sm text-neutral-600">{vehicle.options}</p>
          )}
        </section>
      )}

      {/* ---------- Entretien ---------- */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Entretien</h2>

        {planned.length > 0 && (
          <div className="mt-3">
            <h3 className="text-sm font-medium text-neutral-700">À prévoir</h3>
            <ul className="mt-2 space-y-2">
              {planned.map((r) => (
                <li key={r.id} className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-medium">{CATEGORY_LABELS[r.category] ?? r.category}</span>
                    <span className="text-xs text-neutral-600">
                      {[formatDate(r.dueDate) && `avant le ${formatDate(r.dueDate)}`, formatKm(r.dueMileageKm) && `à ${formatKm(r.dueMileageKm)}`]
                        .filter(Boolean)
                        .join(" ou ")}
                    </span>
                  </div>
                  {r.description && <p className="mt-1 text-neutral-700">{r.description}</p>}
                  {isOwner && (
                    <div className="mt-2 flex gap-4">
                      <form action={markMaintenanceDoneAction.bind(null, vehicle.id, r.id)}>
                        <button type="submit" className={smallLink}>Marquer comme fait</button>
                      </form>
                      <form action={deleteMaintenanceAction.bind(null, vehicle.id, r.id)}>
                        <button type="submit" className={smallLink}>Supprimer</button>
                      </form>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4">
          <h3 className="text-sm font-medium text-neutral-700">Réalisés</h3>
          {completed.length === 0 ? (
            <p className="mt-2 text-sm text-neutral-500">Aucun entretien enregistré pour l&apos;instant.</p>
          ) : (
            <ul className="mt-2 divide-y divide-neutral-200 rounded-md border border-neutral-200">
              {completed.map((r) => (
                <li key={r.id} className="p-3 text-sm">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-medium">{CATEGORY_LABELS[r.category] ?? r.category}</span>
                    <span className="text-xs text-neutral-500">
                      {[formatDate(r.performedAt), formatKm(r.mileageKm), isOwner && r.costAmount !== null ? `${r.costAmount.toLocaleString("fr-FR")} €` : null]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </div>
                  {r.description && <p className="mt-1 text-neutral-700">{r.description}</p>}
                  {isOwner && (
                    <div className="mt-1 flex gap-4">
                      {!r.isPublic && <span className="text-xs text-neutral-400">Privé</span>}
                      <form action={deleteMaintenanceAction.bind(null, vehicle.id, r.id)}>
                        <button type="submit" className={smallLink}>Supprimer</button>
                      </form>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {isOwner && (
          <details className="mt-4 rounded-md border border-neutral-200 p-4">
            <summary className="cursor-pointer text-sm font-medium">Ajouter un entretien</summary>
            <form action={addMaintenanceAction.bind(null, vehicle.id)} className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="m-status">Statut</label>
                <select id="m-status" name="status" className={input} defaultValue="completed">
                  <option value="completed">Fait</option>
                  <option value="planned">À prévoir</option>
                </select>
              </div>
              <div>
                <label className={label} htmlFor="m-category">Type</label>
                <select id="m-category" name="category" className={input} defaultValue="oil_service">
                  {Object.entries(CATEGORY_LABELS).map(([value, text]) => (
                    <option key={value} value={value}>{text}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label} htmlFor="m-date">Date (faite ou prévue)</label>
                <input id="m-date" name="date" type="date" className={input} />
              </div>
              <div>
                <label className={label} htmlFor="m-km">Kilométrage (fait ou prévu)</label>
                <input id="m-km" name="mileageKm" inputMode="numeric" className={input} placeholder="ex. 177648" />
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="m-desc">Détail</label>
                <textarea id="m-desc" name="description" rows={2} className={input} placeholder="ex. Vidange + filtres, garage X" />
              </div>
              <div>
                <label className={label} htmlFor="m-cost">Coût en € (visible par toi seul)</label>
                <input id="m-cost" name="costAmount" inputMode="decimal" className={input} />
              </div>
              <label className="flex items-center gap-2 self-end text-sm">
                <input type="checkbox" name="isPublic" defaultChecked />
                Visible sur la fiche publique
              </label>
              <div className="sm:col-span-2">
                <button type="submit" className={button}>Enregistrer l&apos;entretien</button>
              </div>
            </form>
          </details>
        )}
      </section>

      {/* ---------- Historique ---------- */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Historique</h2>

        {isOwner && (
          <div className="mt-3">
            <h3 className="text-sm font-medium text-neutral-700">Propriétaires</h3>
            <ol className="mt-2 space-y-2">
              {ownerships.map((o, index) => (
                <li key={o.id} className="rounded-md border border-neutral-200 p-3 text-sm">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-medium">
                      {index + 1}. {o.isCurrent ? "Toi (propriétaire actuel)" : o.ownerLabel ?? "Ancien propriétaire"}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {[formatDate(o.startedAt), o.isCurrent ? "aujourd'hui" : formatDate(o.endedAt)].filter(Boolean).join(" → ")}
                    </span>
                  </div>
                  {o.notes && <p className="mt-1 text-neutral-700">{o.notes}</p>}
                  {!o.isCurrent && (
                    <form action={deletePreviousOwnerAction.bind(null, vehicle.id, o.id)} className="mt-1">
                      <button type="submit" className={smallLink}>Supprimer</button>
                    </form>
                  )}
                </li>
              ))}
            </ol>
            <details className="mt-3 rounded-md border border-neutral-200 p-4">
              <summary className="cursor-pointer text-sm font-medium">Ajouter un ancien propriétaire</summary>
              <form action={addPreviousOwnerAction.bind(null, vehicle.id)} className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="o-label">Qui ?</label>
                  <input id="o-label" name="ownerLabel" className={input} placeholder="ex. 1re main, Allemagne" />
                </div>
                <div>
                  <label className={label} htmlFor="o-start">Du</label>
                  <input id="o-start" name="startedAt" type="date" className={input} />
                </div>
                <div>
                  <label className={label} htmlFor="o-end">Au</label>
                  <input id="o-end" name="endedAt" type="date" className={input} />
                </div>
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="o-notes">Notes</label>
                  <textarea id="o-notes" name="notes" rows={2} className={input} />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className={button}>Ajouter</button>
                </div>
              </form>
            </details>
            <p className="mt-2 text-xs text-neutral-400">La liste des propriétaires n&apos;est visible que par toi.</p>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-sm font-medium text-neutral-700">Moments marquants</h3>
          {events.length === 0 ? (
            <p className="mt-2 text-sm text-neutral-500">Aucun événement pour l&apos;instant.</p>
          ) : (
            <ul className="mt-2 space-y-2 border-l-2 border-neutral-200 pl-4">
              {events.map((e) => (
                <li key={e.id} className="text-sm">
                  <p className="text-xs text-neutral-500">
                    {[formatDate(e.eventDate), EVENT_LABELS[e.eventType] ?? e.eventType].filter(Boolean).join(" · ")}
                    {isOwner && !e.isPublic ? " · privé" : ""}
                  </p>
                  <p className="font-medium">{e.title}</p>
                  {e.description && <p className="text-neutral-700">{e.description}</p>}
                  {isOwner && (
                    <form action={deleteEventAction.bind(null, vehicle.id, e.id)}>
                      <button type="submit" className={smallLink}>Supprimer</button>
                    </form>
                  )}
                </li>
              ))}
            </ul>
          )}

          {isOwner && (
            <details className="mt-3 rounded-md border border-neutral-200 p-4">
              <summary className="cursor-pointer text-sm font-medium">Ajouter un moment</summary>
              <form action={addEventAction.bind(null, vehicle.id)} className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="e-title">Titre</label>
                  <input id="e-title" name="title" required className={input} placeholder="ex. Achat à Hambourg" />
                </div>
                <div>
                  <label className={label} htmlFor="e-type">Type</label>
                  <select id="e-type" name="eventType" className={input} defaultValue="note">
                    {Object.entries(EVENT_LABELS).map(([value, text]) => (
                      <option key={value} value={value}>{text}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="e-date">Date</label>
                  <input id="e-date" name="eventDate" type="date" className={input} />
                </div>
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="e-desc">Récit</label>
                  <textarea id="e-desc" name="description" rows={3} className={input} />
                </div>
                <label className="flex items-center gap-2 text-sm sm:col-span-2">
                  <input type="checkbox" name="isPublic" defaultChecked />
                  Visible sur la fiche publique
                </label>
                <div className="sm:col-span-2">
                  <button type="submit" className={button}>Ajouter</button>
                </div>
              </form>
            </details>
          )}
        </div>
      </section>

      {isOwner && vehicle.privacyLevel !== "public" && (
        <p className="mt-10 rounded-md bg-neutral-50 p-3 text-xs text-neutral-500">
          Ton véhicule est en mode « {PRIVACY_LABELS[vehicle.privacyLevel]} ». Pour partager sa fiche (photos et
          entretiens marqués visibles), passe-le en « Public » via Modifier.
        </p>
      )}
    </div>
  );
}
