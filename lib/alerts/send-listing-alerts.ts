import "server-only";
import nodemailer from "nodemailer";
import { createServiceClient } from "@/lib/supabase/service";
import { SITE_NAME } from "@/lib/site";
import { buildListingAlertEmail, type ListingAlertData } from "@/lib/alerts/listing-alert-email";

const SENDER = { name: SITE_NAME, address: "no-reply@youngtimer-garage.fr" };

type ListingRow = {
  user_id: string;
  vehicle_id: string;
  price_amount: number | string;
  mileage_km: number | null;
  location: string | null;
  country: string;
  vehicles: {
    model_year: number | null;
    car_generations: {
      model_id: string;
      car_models: { name: string; slug: string; car_makes: { name: string; slug: string } };
    };
  };
};

// Envoi par le relais SMTP de Brevo, avec la même clé SMTP que Supabase
function createTransport(user: string, pass: string) {
  return nodemailer.createTransport({ host: "smtp-relay.brevo.com", port: 587, secure: false, auth: { user, pass } });
}

async function sendEmail(
  transport: ReturnType<typeof createTransport>,
  to: string,
  email: ReturnType<typeof buildListingAlertEmail>,
) {
  await transport.sendMail({
    from: SENDER,
    to,
    subject: email.subject,
    html: email.html,
    headers: { "List-Unsubscribe": `<${email.unsubscribeUrl}>` },
  });
}

// Prévient les membres qui suivent les annonces du modèle (hors vendeur).
// Appelée après la réponse (after) : une erreur ici ne bloque jamais la publication.
export async function sendListingAlerts(listingId: string): Promise<void> {
  const smtpUser = process.env.BREVO_SMTP_USER;
  const smtpKey = process.env.BREVO_SMTP_KEY;
  if (!smtpUser || !smtpKey) {
    console.warn("sendListingAlerts: BREVO_SMTP_USER ou BREVO_SMTP_KEY absente, aucune alerte envoyée");
    return;
  }

  const supabase = createServiceClient();
  const { data: listing, error } = await supabase
    .from("vehicle_listings")
    .select(
      "user_id, vehicle_id, price_amount, mileage_km, location, country, vehicles!inner(model_year, car_generations!inner(model_id, car_models!inner(name, slug, car_makes!inner(name, slug))))",
    )
    .eq("id", listingId)
    .single();
  if (error || !listing) {
    console.error("sendListingAlerts: annonce introuvable", error);
    return;
  }

  const row = listing as unknown as ListingRow;
  const model = row.vehicles.car_generations.car_models;
  const { data: alerts, error: alertsError } = await supabase
    .from("listing_alerts")
    .select("user_id, unsubscribe_token")
    .eq("model_id", row.vehicles.car_generations.model_id)
    .neq("user_id", row.user_id);
  if (alertsError) {
    console.error("sendListingAlerts: lecture des alertes impossible", alertsError);
    return;
  }

  const data: ListingAlertData = {
    vehicleId: row.vehicle_id,
    makeName: model.car_makes.name,
    modelName: model.name,
    makeSlug: model.car_makes.slug,
    modelSlug: model.slug,
    modelYear: row.vehicles.model_year,
    priceAmount: Number(row.price_amount),
    mileageKm: row.mileage_km,
    location: row.location,
    country: row.country,
  };

  const transport = createTransport(smtpUser, smtpKey);
  let sent = 0;
  for (const alert of alerts ?? []) {
    try {
      const { data: user } = await supabase.auth.admin.getUserById(alert.user_id);
      const to = user.user?.email;
      if (!to || !user.user?.email_confirmed_at) continue;
      await sendEmail(transport, to, buildListingAlertEmail(data, alert.unsubscribe_token));
      sent += 1;
    } catch (sendError) {
      console.error("sendListingAlerts: envoi impossible", sendError);
    }
  }
  transport.close();
  console.info(`sendListingAlerts: ${sent} alerte(s) envoyée(s) pour l'annonce ${listingId}`);
}
