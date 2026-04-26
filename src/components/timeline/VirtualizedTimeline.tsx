"use client";

import { Virtuoso } from "react-virtuoso";
import { TimelineEntry, type TimelineEntryProps } from "./TimelineEntry";

export interface TimelineRow extends TimelineEntryProps {
  id: string;
}

export interface VirtualizedTimelineProps {
  entries: readonly TimelineRow[];
}

export function VirtualizedTimeline({ entries }: VirtualizedTimelineProps) {
  if (entries.length === 0) {
    return (
      <section
        aria-label="Timeline"
        className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5"
      >
        <p className="font-body text-muted text-sm">No sessions yet.</p>
      </section>
    );
  }

  return (
    <section aria-label="Timeline" className="flex flex-col gap-3">
      <Virtuoso
        data={entries as TimelineRow[]}
        computeItemKey={(_, item) => item.id}
        // SSR + zero-layout (jsdom) fallback: render the first 20 items at
        // mount so the timeline is content-meaningful before client-side
        // measurement kicks in. Beyond 20, virtualization takes over.
        initialItemCount={Math.min(entries.length, 20)}
        itemContent={(_index, item) => (
          <div className="pb-3">
            <TimelineEntry
              title={item.title}
              date={item.date}
              href={item.href}
              subtitle={item.subtitle}
              tags={item.tags}
              badges={item.badges}
            />
          </div>
        )}
        style={{ height: "100%", minHeight: 480 }}
      />
    </section>
  );
}
