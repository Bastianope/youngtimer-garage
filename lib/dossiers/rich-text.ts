export type RichSegment =
  | { kind: "text"; text: string }
  | { kind: "bold"; text: string }
  | { kind: "link"; text: string; href: string; external: boolean };

const TOKEN = /\[([^\]]+)\]\(((?:https:\/\/|\/|#)[^)\s]+)\)|\*\*([^*]+)\*\*/g;

// Découpe un texte de dossier en segments : liens [libellé](url) et gras **texte**.
// Seuls les liens https://, les chemins internes /… et les ancres #… sont reconnus.
export function parseRichText(input: string): RichSegment[] {
  const segments: RichSegment[] = [];
  let last = 0;
  for (const match of input.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) segments.push({ kind: "text", text: input.slice(last, index) });
    if (match[1] && match[2]) {
      segments.push({ kind: "link", text: match[1], href: match[2], external: match[2].startsWith("https://") });
    } else if (match[3]) {
      segments.push({ kind: "bold", text: match[3] });
    }
    last = index + match[0].length;
  }
  if (last < input.length) segments.push({ kind: "text", text: input.slice(last) });
  return segments;
}
