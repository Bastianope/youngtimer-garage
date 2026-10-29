import "server-only";
import { createClient } from "@/lib/supabase/server";
import { addMonths } from "@/lib/maintenance/schedule";

// Remplace la liste des éléments remplacés d'un entretien
export async function replaceRecordItems(recordId: string, codes: string[]): Promise<void> {
  const supabase = await createClient();
  const unique = Array.from(new Set(codes.filter((c) => /^[a-z_]{2,40}$/.test(c))));
  const { error: deleteError } = await supabase.from("maintenance_record_items").delete().eq("maintenance_record_id", recordId);
  if (deleteError) throw new Error(`Check-list non enregistrée : ${deleteError.message}`);
  if (unique.length === 0) return;
  const { error } = await supabase
    .from("maintenance_record_items")
    .insert(unique.map((code) => ({ maintenance_record_id: recordId, item_type_code: code })));
  if (error) throw new Error(`Check-list non enregistrée : ${error.message}`);
}

// Un contrôle technique fait → prochaine échéance dans 2 ans
export async function setCtFromInspection(vehicleId: string, performedAt: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("vehicle_reminders")
    .upsert({ vehicle_id: vehicleId, ct_due_date: addMonths(performedAt, 24) }, { onConflict: "vehicle_id" });
  if (error) throw new Error(`Échéance CT non enregistrée : ${error.message}`);
}

