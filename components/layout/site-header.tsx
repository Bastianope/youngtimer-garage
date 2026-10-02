import Link from "next/link";
import { Oswald } from "next/font/google";
import { getCachedUser } from "@/lib/supabase/get-user";
import { SiteNav } from "@/components/layout/site-nav";

const oswald = Oswald({ subsets: ["latin"], weight: ["500", "600"] });

export async function SiteHeader() {
  const { data } = await getCachedUser();
  const isAuthenticated = Boolean(data.user);

  return (
    <header className="relative z-30 border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" prefetch={false} className="flex shrink-0 items-center gap-2">
          <span className="block h-5 w-1.5 bg-[#C81E1E]" aria-hidden="true" />
          <span className={`${oswald.className} text-[1.05rem] uppercase tracking-[0.08em] text-black sm:text-[1.15rem]`}>
            Youngtimer Garage
          </span>
        </Link>

        <SiteNav isAuthenticated={isAuthenticated} />
      </div>
    </header>
  );
}
