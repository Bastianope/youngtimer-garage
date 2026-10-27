// Nom de modèle tel que les passionnés le cherchent : le code de génération d'abord.
// « BMW » + « Série 7 (E38) » → « BMW E38 (Série 7) » ; « Volkswagen » + « Golf I » → « Volkswagen Golf I ».
export function modelSearchName(makeName: string, modelName: string) {
  const match = modelName.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  const base = match?.[1]?.trim();
  const code = match?.[2]?.trim();
  const name = code && base ? `${code} (${base})` : modelName;
  return `${makeName} ${name}`.replace(/\s+/g, " ").trim();
}
