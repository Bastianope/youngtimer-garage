// Recherche Leboncoin construite à partir de la marque et du code du modèle :
// « BMW Série 8 (E31) » → « BMW E31 », « Golf I » → « Volkswagen Golf I ».
export function leboncoinSearchQuery(makeName: string, modelName: string) {
  const code = modelName.match(/\(([^)]+)\)/)?.[1]?.trim();
  return `${makeName} ${code || modelName}`.replace(/\s+/g, " ").trim();
}

export function leboncoinSearchUrl(makeName: string, modelName: string) {
  return `https://www.leboncoin.fr/recherche?text=${encodeURIComponent(leboncoinSearchQuery(makeName, modelName))}`;
}

// Recherche Ovoko (pièces d'occasion de casses européennes), même texte que Leboncoin :
// https://ovoko.fr/chercher?q=BMW%20E31
export function ovokoSearchUrl(makeName: string, modelName: string) {
  return `https://ovoko.fr/chercher?q=${encodeURIComponent(leboncoinSearchQuery(makeName, modelName))}`;
}
