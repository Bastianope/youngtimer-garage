import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { toggleModelFollowAction } from "@/lib/actions/garage";
import { isModelFollowedByCurrentUser } from "@/lib/queries/garage";

export async function ModelFollowButton({ modelId }: { modelId: string }) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    return (
      <Link href="/auth/connexion" className="text-sm underline">
        Se connecter pour suivre ce modèle
      </Link>
    );
  }

  const isFollowed = await isModelFollowedByCurrentUser(modelId);

  return (
    <form action={toggleModelFollowAction}>
      <input type="hidden" name="modelId" value={modelId} />
      <button
        type="submit"
        className="rounded-md border border-black/20 px-4 py-2 text-sm"
      >
        {isFollowed ? "Ne plus suivre ce modèle" : "Suivre ce modèle"}
      </button>
    </form>
  );
}
