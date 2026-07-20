import profile from "../../data/profile.json";

export default function Footer() {
  return (
    <footer className="border-t border-line px-4 sm:px-6 py-14 mt-10">
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-12">
          {Object.entries(profile.skills).map(([group, items]) => (
            <div key={group}>
              <h4 className="font-mono text-[11px] uppercase tracking-wide text-muted mb-2">
                {group}
              </h4>
              <p className="text-sm text-ink-soft leading-relaxed">
                {items.join(" · ")}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-muted font-mono">
          <span>{profile.name}</span>
          <div className="flex gap-4">
            <a href={`mailto:${profile.email}`} className="hover:text-cobalt transition-colors">
              Email
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="hover:text-cobalt transition-colors">
              GitHub
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-cobalt transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
