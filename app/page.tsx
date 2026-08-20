import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <section className="relative isolate min-h-[560px] overflow-hidden bg-[#14120F]">
        <Image
          src="/images/bmwe24.jpg"
          alt="BMW Série 6 E24 garée dans une rue"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,18,15,0.35) 0%, rgba(20,18,15,0.55) 40%, rgba(20,18,15,0.95) 100%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:py-32">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4A85C]">
            La plateforme française du youngtimer
          </p>

          <h1 className="mt-4 font-[family-name:var(--font-fraunces)] text-5xl font-semibold tracking-tight text-[#F5F0E6] sm:text-6xl">
            Youngtimer Garage
          </h1>

          <p className="mt-3 font-[family-name:var(--font-fraunces)] text-xl italic text-[#D4A85C]">
            Ton garage. Leur histoire.
          </p>

          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-[#F5F0E6]/80">
            Rêve d&apos;un modèle, cherche-le, garde-le, et documente son
            histoire.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/garage"
              className="rounded-md bg-[#A8823D] px-5 py-2.5 text-sm font-medium text-[#14120F] transition hover:bg-[#c0964a]"
            >
              Créer mon Garage
            </Link>
            <Link
              href="/explorer"
              className="rounded-md border border-[#F5F0E6]/30 px-5 py-2.5 text-sm font-medium text-[#F5F0E6] transition hover:border-[#F5F0E6]/50"
            >
              Explorer les youngtimers
            </Link>
          </div>
        </div>

        <div className="relative h-px bg-gradient-to-r from-transparent via-[#A8823D]/70 to-transparent" />
      </section>

      <section className="bg-[#F4EFE3] px-4 py-10">
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.14em] text-[#7A6A4E]">
          Modèles populaires
        </p>
        <div className="mx-auto flex max-w-2xl justify-center gap-4">
          <div className="relative h-24 w-36 overflow-hidden rounded-md">
            <Image
              src="/images/bmwe30-plate-blurred.jpg"
              alt="BMW E30"
              fill
              sizes="144px"
              className="object-cover"
            />
          </div>
          <div className="relative h-24 w-36 overflow-hidden rounded-md">
            <Image
              src="/images/peugeot205-cti-plates-blurred.jpg"
              alt="Peugeot 205 CTI Roland Garros"
              fill
              sizes="144px"
              className="object-cover"
            />
          </div>
          <div className="relative h-24 w-36 overflow-hidden rounded-md">
            <Image
              src="/images/porsche-boxster-plate-blurred.jpg"
              alt="Porsche Boxster"
              fill
              sizes="144px"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}