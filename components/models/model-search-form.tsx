export function ModelSearchForm({ defaultValue }: { defaultValue?: string }) {
  return (
    <form action="/modeles" method="GET" className="flex gap-2">
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Rechercher un modèle (ex. E30, 205 GTI...)"
        className="w-72 rounded-md border border-black/20 px-3 py-2 text-sm"
      />
      <button
        type="submit"
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
      >
        Rechercher
      </button>
    </form>
  );
}
