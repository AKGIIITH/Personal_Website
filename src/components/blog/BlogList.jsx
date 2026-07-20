import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import posts from "../../data/blog.json";

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogList() {
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const [openId, setOpenId] = useState(null);

  return (
    <section id="blog" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-rust">
            Writing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-medium mt-2">Blog</h2>
        </div>

        {sorted.length === 0 ? (
          <p className="text-ink-soft italic">Nothing posted yet — check back soon.</p>
        ) : (
          <ul className="divide-y divide-line">
            {sorted.map((post) => {
              const open = openId === post.id;
              return (
                <li key={post.id} className="py-6 first:pt-0">
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : post.id)}
                    aria-expanded={open}
                    className="group block w-full text-left"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-xl font-medium text-ink group-hover:text-cobalt transition-colors">
                        {post.title}
                      </h3>
                      <time className="font-mono text-xs text-muted shrink-0">
                        {formatDate(post.date)}
                      </time>
                    </div>
                    <p className="text-ink-soft mt-2">{post.excerpt}</p>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-2 text-ink-soft leading-relaxed whitespace-pre-line">
                          {post.body}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
