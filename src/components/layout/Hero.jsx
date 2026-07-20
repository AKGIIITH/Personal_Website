import { motion } from "framer-motion";
import profile from "../../data/profile.json";

export default function Hero() {
  return (
    <section className="px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start gap-5 mb-4">
          {profile.avatar && (
            <motion.img
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-line shrink-0"
            />
          )}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-widest text-rust mt-6 sm:mt-8"
          >
            {profile.institution}
          </motion.p>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-4xl sm:text-6xl font-medium leading-[1.05] text-ink"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 text-lg text-ink-soft"
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-xl text-ink-soft leading-relaxed"
        >
          {profile.bio}
        </motion.p>

        <div className="mt-7 flex flex-wrap gap-2">
          {profile.researchInterests.map((r) => (
            <span
              key={r}
              className="px-3 py-1 rounded-full border border-line text-xs font-mono text-ink-soft"
            >
              {r}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="px-4 py-2 rounded-full bg-ink text-paper text-sm font-medium hover:bg-cobalt transition-colors"
          >
            {profile.email}
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-mono text-ink-soft hover:text-cobalt transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-mono text-ink-soft hover:text-cobalt transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href={profile.links.resume}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-mono text-ink-soft hover:text-cobalt transition-colors"
          >
            Résumé ↗
          </a>
        </div>

        {profile.current?.length > 0 && (
          <div className="mt-14 border-t border-line pt-6 grid sm:grid-cols-2 gap-6">
            {profile.current.map((c) => (
              <div key={c.role}>
                <p className="text-ink font-medium">{c.role}</p>
                <p className="text-sm text-ink-soft">{c.org}</p>
                <p className="text-xs font-mono text-muted mt-1">{c.period}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
