import type { DossierBlock } from "@/lib/dossiers/types";
import { RichText } from "@/components/dossiers/rich-text";

export function DossierBlocks({ blocks }: { blocks: DossierBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={block.id}
                className="mt-10 scroll-mt-20 text-xl font-semibold"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                id={block.id}
                className="mt-7 scroll-mt-20 text-lg font-semibold"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="mt-3 leading-relaxed text-black/80">
                <RichText text={block.text} />
              </p>
            );
          case "list":
            return (
              <ul
                key={i}
                className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-black/80"
              >
                {block.items.map((item, j) => (
                  <li key={j}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            );
          case "facts":
            return (
              <dl
                key={i}
                className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 rounded-md border border-black/10 bg-black/[0.02] p-4 text-sm sm:grid-cols-[max-content_1fr]"
              >
                {block.rows.map((row, j) => (
                  <div key={j} className="contents">
                    <dt className="font-medium text-black/60">{row.label}</dt>
                    <dd className="mb-1 text-black/85 sm:mb-0">
                      <RichText text={row.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            );
          case "table":
            return (
              <figure key={i} className="mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[480px] border-collapse text-sm">
                    <thead>
                      <tr>
                        {block.head.map((cell, j) => (
                          <th
                            key={j}
                            className="border-b border-black/20 px-2 py-1.5 text-left font-medium"
                          >
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, j) => (
                        <tr key={j} className="border-b border-black/10">
                          {row.map((cell, k) => (
                            <td key={k} className="px-2 py-1.5 align-top">
                              <RichText text={cell} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-xs text-black/55">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "callout":
            return (
              <p
                key={i}
                className={`mt-4 rounded-md border-l-4 p-3 text-sm leading-relaxed ${
                  block.tone === "warning"
                    ? "border-amber-500 bg-amber-50"
                    : "border-[#C81E1E] bg-red-50/60"
                }`}
              >
                <RichText text={block.text} />
              </p>
            );
        }
      })}
    </>
  );
}
