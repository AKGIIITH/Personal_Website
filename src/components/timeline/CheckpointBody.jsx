export default function CheckpointBody({ node }) {
  if (node.kind === "milestone") {
    return <p className="text-sm text-ink-soft leading-relaxed">{node.detail}</p>;
  }

  const s = node.section;
  const hasCourses = s.courses?.length > 0;
  const hasProjects = s.projects?.length > 0;
  const hasRoles = s.roles?.length > 0;
  const hasAchievements = s.achievements?.length > 0;
  const hasImages = s.images?.length > 0;

  if (!hasCourses && !hasProjects && !hasRoles && !hasAchievements && !hasImages && !s.notes) {
    return <p className="text-sm text-muted italic">Nothing logged here yet.</p>;
  }

  return (
    <div className="space-y-4 text-sm">
      {hasCourses && (
        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-wide text-muted mb-1.5">
            Coursework
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {s.courses.map((c) => (
              <span key={c} className="px-2 py-0.5 rounded-full bg-paper-dim text-ink-soft text-xs">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {s.notes && <p className="text-ink-soft leading-relaxed">{s.notes}</p>}

      {hasRoles && (
        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-wide text-muted mb-1.5">Roles</h4>
          <ul className="space-y-2">
            {s.roles.map((r) => (
              <li key={r.role}>
                <p className="text-ink font-medium">{r.role}</p>
                <p className="text-xs font-mono text-muted">{r.period}</p>
                <p className="text-ink-soft mt-0.5">{r.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasProjects && (
        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-wide text-muted mb-1.5">Projects</h4>
          <ul className="space-y-2">
            {s.projects.map((p) => (
              <li key={p.name}>
                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cobalt font-medium hover:underline underline-offset-2"
                  >
                    {p.name} ↗
                  </a>
                ) : (
                  <span className="text-ink font-medium">{p.name}</span>
                )}
                <p className="text-ink-soft mt-0.5">{p.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasAchievements && (
        <div className="flex flex-wrap gap-2">
          {s.achievements.map((a) => {
            const label = typeof a === "string" ? a : `${a.label}: ${a.value}`;
            return (
              <span key={label} className="px-2.5 py-1 rounded-lg bg-rust-dim text-rust text-xs font-mono">
                {label}
              </span>
            );
          })}
        </div>
      )}

      {hasImages && (
        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-wide text-muted mb-1.5">Photos</h4>
          <div className="grid grid-cols-3 gap-2">
            {s.images.map((src) => (
              <img key={src} src={src} alt="" className="rounded-lg object-cover aspect-square" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
