import Link from "next/link";
import { parseRichText } from "@/lib/dossiers/rich-text";

export function RichText({ text }: { text: string }) {
  return (
    <>
      {parseRichText(text).map((segment, i) => {
        if (segment.kind === "bold") return <strong key={i}>{segment.text}</strong>;
        if (segment.kind === "link") {
          return segment.external ? (
            <a key={i} href={segment.href} target="_blank" rel="noopener noreferrer" className="text-[#C81E1E] underline underline-offset-2">
              {segment.text}
            </a>
          ) : (
            <Link key={i} href={segment.href} className="text-[#C81E1E] underline underline-offset-2">
              {segment.text}
            </Link>
          );
        }
        return <span key={i}>{segment.text}</span>;
      })}
    </>
  );
}
