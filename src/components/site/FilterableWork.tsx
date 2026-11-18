"use client";

import { useMemo, useState } from "react";
import { WorkCard, EmptyState, type WorkItem } from "./cards";

type Item = WorkItem & { id: number | string };

/**
 * Work grid with a tag filter. Filter options are derived from the data:
 * only tags shared by some (but not all) items are offered, so every chip
 * meaningfully narrows the list. With no useful tags the bar is hidden.
 */
export default function FilterableWork({
  items,
  labels,
}: {
  items: Item[];
  labels: { all: string; filter: string; empty: string; clear: string; live: string; source: string };
}) {
  const [active, setActive] = useState<string | null>(null);

  const options = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((item) => new Set(item.tags ?? []).forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    return [...counts.entries()]
      .filter(([, n]) => n >= 2 && n < items.length)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [items]);

  const visible = active ? items.filter((item) => item.tags?.includes(active)) : items;

  return (
    <div>
      {options.length > 0 && (
        <div role="group" aria-label={labels.filter} className="mb-10 flex flex-wrap gap-2 md:mb-14">
          <button type="button" className="chip" aria-pressed={active === null} onClick={() => setActive(null)}>
            {labels.all}
            <span className="chip-count tabular">{items.length}</span>
          </button>
          {options.map(([tag, count]) => (
            <button
              key={tag}
              type="button"
              className="chip"
              aria-pressed={active === tag}
              onClick={() => setActive(active === tag ? null : tag)}
            >
              {tag}
              <span className="chip-count tabular">{count}</span>
            </button>
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {visible.length} / {items.length}
      </p>

      {visible.length === 0 ? (
        <EmptyState
          title={labels.empty}
          action={
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setActive(null)}>
              {labels.clear}
            </button>
          }
        />
      ) : (
        <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-16 xl:grid-cols-3">
          {visible.map((item, i) => (
            <li key={item.id} className="flex">
              <WorkCard
                item={item}
                labels={{ live: labels.live, source: labels.source }}
                priority={i < 3}
                sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
                className="w-full"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
