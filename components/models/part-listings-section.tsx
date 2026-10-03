import { Suspense } from "react";
import Link from "next/link";
import { getPartListingsForModel, type PartListing } from "@/lib/queries/part-listings";
import { isAdminOrEditor } from "@/lib/auth/roles";
import {
  closePartListingAction,
  createPartListingAction,
  deletePartListingAction,
  renewPartListingAction,
} from "@/lib/actions/part-listings";
import { PartListingNotice } from "@/components/models/part-listing-notice";

type Props = { carModelId: string; makeSlug: string; modelSlug: string };

export async function PartListingsSection({ carModelId, makeSlug, modelSlug }: Props) {
  const { active, myInactive, userId } = await getPartListingsForModel(carModelId);
  const isAdmin = userId ? await isAdminOrEditor() : false;

  return (
    <PartListingsView
      carModelId={carModelId}
      makeSlug={makeSlug}
      modelSlug={modelSlug}
      active={active}
      myInactive={myInactive}
      isAuthenticated={userId !== null}
      isAdmin={isAdmin}
    />
  );
}

const input = "mt-1 w-full rounded-md border border-black/20 p-2 text-sm";
const label = "block text-xs text-black/60";
const smallLink = "text-xs text-black/50 underline";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("fr-FR");
}

function formatPrice(listing: PartListing) {
  if (listing.priceAmount === null) return null;
  const amount = `${listing.priceAmount.toLocaleString("fr-FR")} €`;
  return listing.kind === "wanted" ? `Budget : ${amount}` : amount;
}

type CardProps = {
  listing: PartListing;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loginHref: string;
  makeSlug: string;
  modelSlug: string;
};

function ListingCard({ listing, isAuthenticated, isAdmin, loginHref, makeSlug, modelSlug }: CardProps) {
  const price = formatPrice(listing);
  return (
    <li className="rounded-md border border-black/10 bg-white p-3 text-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-medium">{listing.title}</p>
        {price && <span className="text-sm font-semibold">{price}</span>}
      </div>
      <p className="mt-0.5 text-xs text-black/50">
        {[listing.location, `publiée le ${formatDate(listing.createdAt)}`].filter(Boolean).join(" · ")}
        {listing.isMine ? " · ton annonce" : ""}
      </p>
      {listing.description && <p className="mt-2 whitespace-pre-line text-black/75">{listing.description}</p>}
      <div className="mt-2">
        {isAuthenticated ? (
          <p className="text-sm">
            <span className="text-black/50">Contact : </span>
            <span className="break-words">{listing.contact}</span>
          </p>
        ) : (
          <Link href={loginHref} className="text-sm underline">
            Connecte-toi pour voir le contact
          </Link>
        )}
      </div>
      {(listing.isMine || isAdmin) && (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {listing.isMine && (
            <form action={closePartListingAction.bind(null, listing.id, makeSlug, modelSlug)}>
              <button type="submit" className={smallLink}>
                {listing.kind === "wanted" ? "Marquer comme trouvée" : "Marquer comme vendue"}
              </button>
            </form>
          )}
          {listing.isMine && listing.expiresSoon && (
            <form action={renewPartListingAction.bind(null, listing.id, makeSlug, modelSlug)}>
              <button type="submit" className={smallLink}>Prolonger de 90 jours</button>
            </form>
          )}
          <form action={deletePartListingAction.bind(null, listing.id, makeSlug, modelSlug)}>
            <button type="submit" className={smallLink}>
              {listing.isMine ? "Supprimer" : "Supprimer (modération)"}
            </button>
          </form>
        </div>
      )}
    </li>
  );
}

export function PartListingsView({
  carModelId,
  makeSlug,
  modelSlug,
  active,
  myInactive,
  isAuthenticated,
  isAdmin,
}: Props & { active: PartListing[]; myInactive: PartListing[]; isAuthenticated: boolean; isAdmin: boolean }) {
  const path = `/modeles/${makeSlug}/${modelSlug}`;
  const loginHref = `/auth/connexion?next=${encodeURIComponent(path)}`;
  const wanted = active.filter((l) => l.kind === "wanted");
  const forSale = active.filter((l) => l.kind === "for_sale");

  return (
    <section id="annonces" className="mt-10 scroll-mt-20">
      <h2 className="text-lg font-semibold">Pièces : je cherche, je vends</h2>
      <p className="mt-1 text-sm text-black/60">
        Petites annonces de pièces et d&apos;accessoires entre passionnés pour ce modèle.
      </p>
      <Suspense fallback={null}>
        <PartListingNotice />
      </Suspense>

      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-medium text-black/70">Je cherche ({wanted.length})</h3>
          {wanted.length === 0 ? (
            <p className="mt-2 text-sm text-black/50">Aucune demande pour l&apos;instant.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {wanted.map((l) => (
                <ListingCard key={l.id} listing={l} isAuthenticated={isAuthenticated} isAdmin={isAdmin} loginHref={loginHref} makeSlug={makeSlug} modelSlug={modelSlug} />
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium text-black/70">Je vends ({forSale.length})</h3>
          {forSale.length === 0 ? (
            <p className="mt-2 text-sm text-black/50">Aucune pièce à vendre pour l&apos;instant.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {forSale.map((l) => (
                <ListingCard key={l.id} listing={l} isAuthenticated={isAuthenticated} isAdmin={isAdmin} loginHref={loginHref} makeSlug={makeSlug} modelSlug={modelSlug} />
              ))}
            </ul>
          )}
        </div>
      </div>

      {myInactive.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-black/70">Tes annonces terminées</h3>
          <ul className="mt-2 space-y-2">
            {myInactive.map((l) => (
              <li key={l.id} className="flex flex-wrap items-baseline justify-between gap-2 rounded-md border border-dashed border-black/15 p-3 text-sm text-black/60">
                <span>
                  {l.kind === "wanted" ? "Je cherche" : "Je vends"} : {l.title}
                  {l.status === "closed" ? " (clôturée)" : " (expirée)"}
                </span>
                <span className="flex gap-4">
                  <form action={renewPartListingAction.bind(null, l.id, makeSlug, modelSlug)}>
                    <button type="submit" className={smallLink}>Republier 90 jours</button>
                  </form>
                  <form action={deletePartListingAction.bind(null, l.id, makeSlug, modelSlug)}>
                    <button type="submit" className={smallLink}>Supprimer</button>
                  </form>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isAuthenticated ? (
        <details className="mt-6 rounded-md border border-black/10 p-4">
          <summary className="cursor-pointer text-sm font-medium">Publier une annonce</summary>
          <form action={createPartListingAction.bind(null, carModelId, makeSlug, modelSlug)} className="mt-4 grid gap-3 sm:grid-cols-2">
            <fieldset className="sm:col-span-2">
              <legend className={label}>Type d&apos;annonce</legend>
              <div className="mt-1 flex gap-4 text-sm">
                <label className="flex items-center gap-2">
                  <input type="radio" name="kind" value="wanted" defaultChecked /> Je cherche
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="kind" value="for_sale" /> Je vends
                </label>
              </div>
            </fieldset>
            <div className="sm:col-span-2">
              <label className={label} htmlFor="pl-title">Pièce</label>
              <input id="pl-title" name="title" required minLength={3} maxLength={120} className={input} placeholder="ex. Feu arrière gauche phase 1" />
            </div>
            <div className="sm:col-span-2">
              <label className={label} htmlFor="pl-desc">Détails (facultatif)</label>
              <textarea id="pl-desc" name="description" rows={3} maxLength={2000} className={input} placeholder="État, référence, compatibilité, envoi possible…" />
            </div>
            <div>
              <label className={label} htmlFor="pl-price">Prix ou budget en € (facultatif)</label>
              <input id="pl-price" name="price" inputMode="decimal" className={input} placeholder="ex. 80" />
            </div>
            <div>
              <label className={label} htmlFor="pl-location">Localisation (facultatif)</label>
              <input id="pl-location" name="location" maxLength={80} className={input} placeholder="ex. Carhaix (29)" />
            </div>
            <div className="sm:col-span-2">
              <label className={label} htmlFor="pl-contact">Comment te contacter ?</label>
              <input id="pl-contact" name="contact" required minLength={3} maxLength={200} className={input} placeholder="Téléphone, e-mail ou lien Facebook" />
              <p className="mt-1 text-xs text-black/50">Visible uniquement par les membres connectés.</p>
            </div>
            <p className="text-xs text-black/50 sm:col-span-2">
              Pièces et accessoires uniquement, entre particuliers. Ne verse jamais d&apos;argent d&apos;avance à un
              inconnu sans garantie. L&apos;annonce reste visible 90 jours.
            </p>
            <div className="sm:col-span-2">
              <button type="submit" className="rounded-md bg-black px-4 py-2 text-sm text-white">
                Publier l&apos;annonce
              </button>
            </div>
          </form>
        </details>
      ) : (
        <p className="mt-6 text-sm">
          <Link href={loginHref} className="underline">Connecte-toi</Link> pour publier une annonce ou voir les contacts.
        </p>
      )}
    </section>
  );
}
