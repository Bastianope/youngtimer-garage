import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllDossiers, getDossierBySlug } from "@/lib/dossiers";
import { CATEGORY_LABELS, type Dossier } from "@/lib/dossiers/types";
import { DossierBlocks } from "@/components/dossiers/dossier-blocks";
import { RichText } from "@/components/dossiers/rich-text";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type PageParams = { slug: string };

export function generateStaticParams(): PageParams[] {
  return getAllDossiers().map((dossier) => ({ slug: dossier.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const dossier = getDossierBySlug(slug);
  if (!dossier) return { title: "Dossier introuvable — Youngtimer Garage" };

  const url = `/dossiers/${dossier.slug}`;
  return {
    title: dossier.seoTitle,
    description: dossier.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: dossier.title,
      description: dossier.description,
      url,
      publishedTime: dossier.publishedAt,
      modifiedTime: dossier.updatedAt,
    },
  };
}

function buildArticleJsonLd(dossier: Dossier) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: dossier.title,
    description: dossier.description,
    datePublished: dossier.publishedAt,
    dateModified: dossier.updatedAt,
    mainEntityOfPage: `${SITE_URL}/dossiers/${dossier.slug}`,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function DossierPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const dossier = getDossierBySlug(slug);
  if (!dossier) notFound();

  const toc = dossier.blocks.filter((block) => block.type === "h2");
  const jsonLd = JSON.stringify(buildArticleJsonLd(dossier)).replace(/</g, "\\u003c");

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <nav className="text-sm text-black/50">
        <Link href="/dossiers" className="hover:text-black">
          Dossiers
        </Link>{" "}
        / {CATEGORY_LABELS[dossier.category]}
      </nav>

      <h1 className="mt-3 text-3xl font-bold leading-tight">{dossier.title}</h1>
      <p className="mt-2 text-sm text-black/50">
        Publié le {formatDate(dossier.publishedAt)}
        {dossier.updatedAt !== dossier.publishedAt && <> · mis à jour le {formatDate(dossier.updatedAt)}</>}
      </p>

      <p className="mt-6 text-lg leading-relaxed text-black/80">
        <RichText text={dossier.intro} />
      </p>

      {toc.length > 2 && (
        <nav aria-label="Sommaire" className="mt-6 rounded-md border border-black/10 p-4">
          <p className="text-sm font-semibold">Sommaire</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
            {toc.map((block) =>
              block.type === "h2" ? (
                <li key={block.id}>
                  <a href={`#${block.id}`} className="text-black/70 hover:text-black">
                    {block.text}
                  </a>
                </li>
              ) : null,
            )}
          </ol>
        </nav>
      )}

      <DossierBlocks blocks={dossier.blocks} />

      {dossier.models.length > 0 && (
        <section className="mt-12 rounded-md bg-black/[0.03] p-4">
          <h2 className="text-base font-semibold">Les fiches du catalogue</h2>
          <p className="mt-1 text-sm text-black/60">
            Prix observés, points de vigilance, pièces et annonces pour chaque modèle.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {dossier.models.map((link) => (
              <li key={`${link.make}/${link.model}`}>
                <Link
                  href={`/modeles/${link.make}/${link.model}`}
                  className="inline-flex rounded-md border border-black/20 bg-white px-3 py-1.5 text-sm hover:bg-black/5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 border-t border-black/10 pt-6">
        <h2 className="text-base font-semibold">Sources</h2>
        <p className="mt-1 text-xs text-black/50">
          Informations vérifiées à la date de mise à jour. Les dates marquées « à confirmer » n&apos;étaient pas encore publiées par les organisateurs.
        </p>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-black/70">
          {dossier.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                {source.title}
              </a>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
