import Image from "next/image";

/**
 * Fond en patchwork photo pour la page /modeles, à partir du collage
 * déjà composé (export Canva, sources Pexels). S'utilise en arrière-plan
 * absolu, avec les vignettes de modèles et le contenu de la page
 * superposés par-dessus (z-index supérieur).
 *
 * Fichier source : public/images/patchwork-modeles.jpg (6000x3375,
 * plaques d'immatriculation masquées).
 */
export function PhotoPatchwork() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-20"
    >
      <Image
        src="/images/patchwork-modeles.jpg"
        alt=""
        fill
        priority={false}
        sizes="100vw"
        className="object-cover"
      />
      {/* Voile pour garantir la lisibilité du contenu au-dessus */}
      <div className="absolute inset-0 bg-[var(--background,#f5f1e8)]/70" />
    </div>
  );
}
