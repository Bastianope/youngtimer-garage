import { getModelMarketNotes } from "@/lib/queries/content";

function VerificationBadge({ status }: { status: string }) {
  if (status === "verifie") {
    return (
      <span className="inline-block rounded-full bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5">
        Vérifié
      </span>
    );
  }
  return (
    <span className="inline-block rounded-full bg-amber-100 text-amber-800 text-xs px-2 py-0.5">
      Signalé par la communauté — pas encore vérifié
    </span>
  );
}

export async function MarketNotesSection({ carModelId }: { carModelId: string }) {
  const notes = await getModelMarketNotes(carModelId);

  if (notes.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Prix observés, points de vigilance et points forts</h2>
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="border rounded-lg p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <p className="font-medium">{note.priceRangeText}</p>
              <VerificationBadge status={note.verificationStatus} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {note.vigilancePoints.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-amber-800">À surveiller</h3>
                  <ul className="mt-1 list-disc list-inside text-sm text-gray-700 space-y-1">
                    {note.vigilancePoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
              {note.strengths.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-emerald-800">Points forts</h3>
                  <ul className="mt-1 list-disc list-inside text-sm text-gray-700 space-y-1">
                    {note.strengths.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {note.sourceNote && (
              <p className="text-xs text-gray-400 mt-3">{note.sourceNote}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
