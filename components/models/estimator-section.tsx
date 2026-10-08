import { getModelPriceRange } from "@/lib/queries/price-range";
import { canEstimate, type History } from "@/lib/estimate";
import { PriceEstimator } from "@/components/models/price-estimator";

type Props = {
  makeSlug: string;
  modelSlug: string;
  title: string;
  defaultMileageKm?: number | null;
  defaultHistory?: History;
};

// Estimateur de prix ; rien ne s'affiche si les prix observés du modèle sont insuffisants
export async function EstimatorSection({ makeSlug, modelSlug, title, defaultMileageKm, defaultHistory }: Props) {
  const range = await getModelPriceRange(makeSlug, modelSlug);
  if (!range || !canEstimate(range.min, range.max)) return null;

  return (
    <PriceEstimator
      title={title}
      min={range.min as number}
      max={range.max as number}
      sourceNote={range.sourceNote}
      defaultMileageKm={defaultMileageKm}
      defaultHistory={defaultHistory}
    />
  );
}
