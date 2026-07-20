import profile from "../../data/profile.json";

const links = [
  { href: "#timeline", label: "Path" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-paper/80 border-b border-line">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <a href="#top" className="font-display text-lg font-medium text-ink">
          Ayush<span className="text-cobalt">.</span>
        </a>
        <div className="flex items-center gap-5 font-mono text-xs uppercase tracking-wide">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-ink-soft hover:text-cobalt transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-ink-soft hover:text-cobalt transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </nav>
    </header>
  );
}
