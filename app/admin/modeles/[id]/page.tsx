import { notFound } from "next/navigation";
import {
  getGenerationsForModel,
  getModelByIdForAdmin,
  getVersionsForGeneration,
} from "@/lib/queries/catalogue";
import { PublishToggle } from "@/components/admin/publish-toggle";
import { ModelImageUpload } from "@/components/admin/model-image-upload";
import { CreateGenerationForm } from "@/components/admin/create-generation-form";
import { CreateVersionForm } from "@/components/admin/create-version-form";

export default async function AdminModelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const model = await getModelByIdForAdmin(id);

  if (!model) {
    notFound();
  }

  const generations = await getGenerationsForModel(model.id);
  const versionsByGeneration = await Promise.all(
    generations.map((generation) => getVersionsForGeneration(generation.id)),
  );

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold">
            {model.car_makes?.name} {model.name}
          </h2>
          <p className="text-sm text-black/50">
            Statut de vérification : {model.verification_status}
          </p>
          {model.description ? (
            <p className="mt-2 max-w-xl text-sm text-black/70">
              {model.description}
            </p>
          ) : null}
        </div>
        <PublishToggle
          modelId={model.id}
          isPublished={Boolean(model.published_at)}
        />
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold">Image de couverture</h3>
        <div className="mt-2">
          <ModelImageUpload
            modelId={model.id}
            currentImageUrl={model.cover_image_url}
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold">Nouvelle génération</h3>
        <div className="mt-2">
          <CreateGenerationForm modelId={model.id} />
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <h3 className="text-sm font-semibold">
          Générations ({generations.length})
        </h3>
        {generations.map((generation, index) => (
          <div
            key={generation.id}
            className="rounded-md border border-black/10 p-4"
          >
            <p className="font-medium">
              {generation.name}
              {generation.year_start ? ` (${generation.year_start}` : ""}
              {generation.year_end ? `–${generation.year_end})` : generation.year_start ? ")" : ""}
              {generation.body_type ? ` — ${generation.body_type}` : ""}
            </p>

            <ul className="mt-2 space-y-1 text-sm text-black/70">
              {versionsByGeneration[index].map((version) => (
                <li key={version.id}>
                  {version.name}
                  {version.engine_description
                    ? ` — ${version.engine_description}`
                    : ""}{" "}
                  <span className="text-xs text-black/40">
                    ({version.verification_status})
                  </span>
                </li>
              ))}
              {versionsByGeneration[index].length === 0 ? (
                <li className="text-black/40">Aucune version pour l&apos;instant.</li>
              ) : null}
            </ul>

            <CreateVersionForm generationId={generation.id} modelId={model.id} />
          </div>
        ))}
        {generations.length === 0 ? (
          <p className="text-sm text-black/50">
            Aucune génération pour l&apos;instant.
          </p>
        ) : null}
      </div>
    </div>
  );
}
