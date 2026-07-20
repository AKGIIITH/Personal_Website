import projects from "../../data/projects.json";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid() {
  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 bg-paper-dim/50">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-rust">
            Featured Work
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-medium mt-2">
            Projects
          </h2>
          <p className="text-ink-soft mt-3">
            Pulled from the timeline above — the ones worth a second look.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
