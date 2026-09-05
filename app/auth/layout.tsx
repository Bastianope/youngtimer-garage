import Image from "next/image";

/**
 * Layout partagé pour les pages d'authentification (/auth/sign-in, /auth/sign-up).
 * Fond photo pleine page + voile sombre, formulaire posé sur une carte claire
 * pour rester lisible.
 *
 * Si ce fichier n'existe pas encore, le créer à : app/auth/layout.tsx
 * (s'applique automatiquement à toutes les routes sous /auth).
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Fond photo */}
      <div aria-hidden className="fixed inset-0 -z-20">
        <Image
          src="/images/garage-signin-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* Voile sombre pour la lisibilité */}
      <div aria-hidden className="fixed inset-0 -z-10 bg-black/60" />

      {/* Carte claire contenant le formulaire */}
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm rounded-xl bg-[#F4EFE3] p-8 shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}
