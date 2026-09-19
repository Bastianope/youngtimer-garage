import Link from "next/link";
import { Oswald } from "next/font/google";
import { getCachedUser } from "@/lib/supabase/get-user";
import { SiteNav } from "@/components/site-nav";

const oswald = Oswald({ subsets: ["latin"], weight: ["500", "600"] });

export async function SiteHeader() {
  const { data } = await getCachedUser();
  const isAuthenticated = Boolean(data.user);

  return (
    <header className="relative">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 pt-4 pb-3">
        <Link href="/" prefetch={false} className="flex items-center gap-2">
          <span
            className="block h-5 w-1.5 bg-[#C81E1E]"
            aria-hidden="true"
          />
          <span
            className={`${oswald.className} text-[1.15rem] uppercase tracking-[0.08em] text-black`}
          >
            Youngtimer Garage
          </span>
        </Link>

        <SiteNav isAuthenticated={isAuthenticated} />
      </div>
      <div className="border-b border-black/10" />
    </header>
  );
}
