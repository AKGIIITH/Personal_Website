export default function ProjectCard({ project }) {
  const Wrapper = project.link ? "a" : "div";
  const wrapperProps = project.link
    ? { href: project.link, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group block border border-line rounded-2xl p-5 bg-white/50 hover:border-cobalt transition-colors"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="font-mono text-[11px] uppercase tracking-wide text-rust">
          {project.type}
        </span>
        <span className="font-mono text-[11px] text-muted">{project.period}</span>
      </div>
      <h3 className="font-display text-lg font-medium text-ink group-hover:text-cobalt transition-colors">
        {project.title}
        {project.link && <span className="ml-1">↗</span>}
      </h3>
      <p className="text-sm text-ink-soft mt-2 leading-relaxed">{project.desc}</p>
      <div className="flex flex-wrap gap-1.5 mt-4">
        {project.tags.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded-full bg-cobalt-dim text-cobalt text-xs">
            {t}
          </span>
        ))}
      </div>
    </Wrapper>
  );
}
