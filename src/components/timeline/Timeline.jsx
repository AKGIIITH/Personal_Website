import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import timeline from "../../data/timeline.json";
import CheckpointBody from "./CheckpointBody";

// --- geometry -------------------------------------------------------
const LANE_W = 900; // straight length
const GAP = 170; // vertical distance between lane centers
const TURN_R = GAP / 2; // U-turn bulge radius
const PAD_X = TURN_R + 60;
const PAD_Y = 60;

const TONE = {
  milestone: { dot: "bg-rust", ring: "ring-rust-dim", text: "text-rust" },
  monsoon: { dot: "bg-cobalt", ring: "ring-cobalt-dim", text: "text-cobalt" },
  spring: { dot: "bg-cobalt", ring: "ring-cobalt-dim", text: "text-cobalt" },
  winterbreak: { dot: "bg-muted", ring: "ring-line", text: "text-muted" },
  summerbreak: { dot: "bg-sage", ring: "ring-line", text: "text-sage" },
};

const YEAR_T = { monsoon: 0, winterbreak: 0.33, spring: 0.42, summerbreak: 0.75 };
const PRECOLLEGE_T = [0.05, 0.35, 0.65, 0.9];
const PRECOLLEGE_LABEL = { class10: "Class 10", "jee-prep": "JEE Prep", class12: "Class 12", ugee: "UGEE" };
const SECTION_LABEL = { monsoon: "Monsoon", winterbreak: "Winter", spring: "Spring", summerbreak: "Summer" };

function buildLanes() {
  const lanes = [];

  lanes.push({
    id: "precollege",
    nodes: timeline.preCollege.map((m, i) => ({
      id: m.id,
      kind: "milestone",
      tone: "milestone",
      eyebrow: PRECOLLEGE_LABEL[m.id] || "Milestone",
      title: m.title,
      meta: m.period,
      detail: m.detail,
      t: PRECOLLEGE_T[i] ?? i / 3,
    })),
  });

  timeline.years.forEach((year) => {
    lanes.push({
      id: year.id,
      yearLabel: year.label,
      academicYear: year.academicYear,
      nodes: year.sections.map((s) => ({
        id: s.id,
        kind: "section",
        tone: s.type,
        eyebrow: SECTION_LABEL[s.type] || s.label,
        title: s.headline || s.label,
        meta: s.dateRange,
        section: s,
        t: YEAR_T[s.type] ?? 0,
      })),
    });
  });

  return lanes;
}

function laneCheckpointX(node, laneIndex) {
  const ltr = laneIndex % 2 === 0;
  return ltr ? PAD_X + node.t * LANE_W : PAD_X + (1 - node.t) * LANE_W;
}

export default function Timeline() {
  const lanes = useMemo(buildLanes, []);
  const [selectedId, setSelectedId] = useState(null);

  const laneY = (i) => PAD_Y + i * GAP;
  const width = PAD_X * 2 + LANE_W;
  const height = laneY(lanes.length - 1) + PAD_Y;

  let d = `M ${PAD_X} ${laneY(0)}`;
  lanes.forEach((_, i) => {
    const ltr = i % 2 === 0;
    const endX = ltr ? PAD_X + LANE_W : PAD_X;
    d += ` L ${endX} ${laneY(i)}`;
    if (i < lanes.length - 1) {
      const dir = ltr ? 1 : -1;
      const ctrlX = endX + dir * TURN_R * 1.45;
      d += ` C ${ctrlX} ${laneY(i)}, ${ctrlX} ${laneY(i + 1)}, ${endX} ${laneY(i + 1)}`;
    }
  });

  const allNodes = [];
  lanes.forEach((lane, i) => {
    lane.nodes.forEach((n) => allNodes.push({ ...n, x: laneCheckpointX(n, i), y: laneY(i) }));
  });
  const selected = allNodes.find((n) => n.id === selectedId) || null;

  return (
    <section id="timeline" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-rust">The Path</span>
        <h2 className="font-display text-3xl sm:text-4xl font-medium mt-2">Timeline</h2>
        <p className="text-ink-soft mt-3 max-w-xl mx-auto">
          Tap a checkpoint to see what happened there.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="relative mx-auto" style={{ width, minWidth: width }}>
          <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className="block">
            <path d={d} fill="none" stroke="var(--color-line)" strokeWidth="22" strokeLinecap="round" />
            <path d={d} fill="none" stroke="var(--color-paper-dim)" strokeWidth="16" strokeLinecap="round" />
            <path
              d={d}
              fill="none"
              stroke="var(--color-ink)"
              strokeOpacity="0.15"
              strokeWidth="2"
              strokeDasharray="10 10"
            />
          </svg>

          {lanes.map((lane, i) =>
            lane.yearLabel ? (
              <div
                key={lane.id}
                className="absolute text-center"
                style={{ left: PAD_X, top: laneY(i) - 46, width: LANE_W }}
              >
                <span className="font-display italic text-xl text-ink/70">{lane.yearLabel}</span>
                <span className="block font-mono text-[10px] text-muted">{lane.academicYear}</span>
              </div>
            ) : null
          )}

          {lanes.map((lane, i) =>
            lane.nodes.map((n) => {
              const x = laneCheckpointX(n, i);
              const y = laneY(i);
              const tone = TONE[n.tone] || TONE.monsoon;
              const isSelected = selectedId === n.id;
              const labelBelow = i % 2 === 0;
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setSelectedId(isSelected ? null : n.id)}
                  aria-pressed={isSelected}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
                  style={{ left: x, top: y }}
                >
                  <span
                    className={`block rounded-full ${tone.dot} ring-4 ${tone.ring} transition-all ${
                      isSelected ? "w-5 h-5 ring-8" : "w-3.5 h-3.5"
                    }`}
                  />
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wide whitespace-nowrap px-1.5 py-0.5 rounded ${
                      isSelected ? `${tone.text} font-medium` : "text-muted"
                    } ${labelBelow ? "order-last" : "order-first -translate-y-8"}`}
                  >
                    {n.eyebrow}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-8 px-1">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="border border-line rounded-2xl p-6 bg-white/60"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span
                    className={`inline-block font-mono text-[11px] uppercase tracking-wide px-2 py-0.5 rounded-full mb-2 ${
                      (TONE[selected.tone] || TONE.monsoon).text
                    } bg-paper-dim`}
                  >
                    {selected.eyebrow}
                  </span>
                  <h3 className="font-display text-xl font-medium text-ink">{selected.title}</h3>
                  <p className="font-mono text-xs text-muted mt-1">{selected.meta}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  aria-label="Close"
                  className="text-muted hover:text-ink transition-colors text-lg leading-none mt-1"
                >
                  ×
                </button>
              </div>
              <CheckpointBody node={selected} />
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-sm text-muted italic py-6"
            >
              Nothing selected yet — pick a checkpoint above.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
