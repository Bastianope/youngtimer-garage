import { SITE_NAME, SITE_URL } from "@/lib/site";

export type ListingAlertData = {
  vehicleId: string;
  makeName: string;
  modelName: string;
  makeSlug: string;
  modelSlug: string;
  modelYear: number | null;
  priceAmount: number;
  mileageKm: number | null;
  location: string | null;
  country: string;
};

export type AlertEmail = { subject: string; html: string; unsubscribeUrl: string };

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Séparateur des milliers en espace simple : les espaces fines de toLocaleString passent mal dans certains objets d'e-mail
function formatNumber(value: number) {
  return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// E-mail envoyé à un membre qui suit les annonces d'un modèle
export function buildListingAlertEmail(data: ListingAlertData, unsubscribeToken: string): AlertEmail {
  const title = `${data.makeName} ${data.modelName}${data.modelYear ? ` de ${data.modelYear}` : ""}`;
  const price = `${formatNumber(data.priceAmount)} €`;
  const listingUrl = `${SITE_URL}/vehicules/${data.vehicleId}`;
  const modelUrl = `${SITE_URL}/modeles/${data.makeSlug}/${data.modelSlug}`;
  const unsubscribeUrl = `${SITE_URL}/alertes/desabonnement?jeton=${encodeURIComponent(unsubscribeToken)}`;

  const details = [
    price,
    data.mileageKm !== null ? `${formatNumber(data.mileageKm)} km` : null,
    [data.location, data.country].filter(Boolean).join(", "),
  ]
    .filter(Boolean)
    .map((item) => escapeHtml(String(item)))
    .join(" · ");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;color:#111">
  <h2 style="margin:0 0 12px">Nouvelle annonce : ${escapeHtml(title)}</h2>
  <p style="margin:0 0 16px">Une ${escapeHtml(`${data.makeName} ${data.modelName}`)} vient d'être mise en vente sur ${SITE_NAME}.</p>
  <p style="margin:0 0 20px;font-size:18px;font-weight:bold">${details}</p>
  <p style="margin:0 0 24px"><a href="${listingUrl}" style="background:#111;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Voir l'annonce</a></p>
  <p style="margin:0 0 8px;font-size:13px;color:#555">Les autres annonces et la fiche du modèle : <a href="${modelUrl}">${escapeHtml(`${data.makeName} ${data.modelName}`)}</a></p>
  <hr style="border:none;border-top:1px solid #ddd;margin:20px 0">
  <p style="margin:0;font-size:12px;color:#777">Vous recevez cet e-mail car vous avez activé une alerte pour ce modèle.
  <a href="${unsubscribeUrl}">Ne plus recevoir ces alertes</a> · <a href="${SITE_URL}/profil">Gérer mes alertes</a></p>
</div>`;

  return { subject: `Nouvelle annonce : ${title} – ${price}`, html, unsubscribeUrl };
}
