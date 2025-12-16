"use client";

import React from "react";
import {
  motion,
  useReducedMotion,
  cubicBezier,
  type Variants,
} from "framer-motion";
import { Star, GitPullRequest, Code2, ExternalLink } from "lucide-react";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork?: boolean;
  archived?: boolean;
  homepage?: string | null;
  language?: string | null;
};

type GitHubActivitySectionProps = {
  username?: string;
  perPage?: number;
  showForks?: boolean;
  showArchived?: boolean;
  className?: string;
};

const ease = cubicBezier(0.22, 1, 0.36, 1);

const languageColors: Record<string, string> = {
  TypeScript: "from-blue-500 to-blue-600",
  JavaScript: "from-yellow-400 to-yellow-500",
  Python: "from-blue-400 to-green-500",
  HTML: "from-orange-500 to-red-500",
  CSS: "from-blue-400 to-cyan-500",
  Vue: "from-green-400 to-green-600",
  React: "from-cyan-400 to-blue-500",
  default: "from-gray-400 to-gray-500",
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function GitHubActivitySection({
  username = "kamkmgamer",
  perPage = 6,
  showForks = false,
  showArchived = false,
  className = "",
}: GitHubActivitySectionProps) {
  const reduceMotion = useReducedMotion();
  const [repos, setRepos] = React.useState<Repo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [hoveredId, setHoveredId] = React.useState<number | null>(null);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, delay: i * 0.1, ease },
    }),
  };

  React.useEffect(() => {
    let cancelled = false;

    async function fetchRepos() {
      setLoading(true);
      setError(null);

      const searchUrl = new URL("https://api.github.com/search/repositories");
      searchUrl.searchParams.set("q", `user:${username}`);
      searchUrl.searchParams.set("sort", "updated");
      searchUrl.searchParams.set("order", "desc");
      searchUrl.searchParams.set("per_page", String(perPage * 2));

      try {
        const res = await fetch(searchUrl.toString(), {
          headers: {
            Accept: "application/vnd.github+json",
          },
        });

        if (!res.ok) {
          const fallback = await fetch(
            `https://api.github.com/users/${username}/repos?sort=pushed&per_page=${
              perPage * 2
            }`,
            { headers: { Accept: "application/vnd.github+json" } }
          );
          if (!fallback.ok) throw new Error("GitHub API error");
          const data = (await fallback.json()) as Repo[];
          const filtered = data
            .filter((r) => (showForks ? true : !r.fork))
            .filter((r) => (showArchived ? true : !r.archived))
            .sort(
              (a, b) =>
                new Date(b.pushed_at).getTime() -
                new Date(a.pushed_at).getTime()
            )
            .slice(0, perPage);

          if (!cancelled) setRepos(filtered);
          return;
        }

        const searchData = (await res.json()) as {
          items: Repo[];
        };

        const filtered = searchData.items
          .filter((r) => (showForks ? true : !r.fork))
          .filter((r) => (showArchived ? true : !r.archived))
          .slice(0, perPage);

        if (!cancelled) setRepos(filtered);
      } catch (e: unknown) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "Failed to load GitHub activity."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRepos();
    return () => {
      cancelled = true;
    };
  }, [username, perPage, showForks, showArchived]);

  return (
    <section
      id="github-activity"
      aria-labelledby="github-activity-title"
      className={`relative py-28 overflow-hidden ${className}`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
            <span className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            Open Source
            <span className="w-8 h-0.5 bg-gradient-to-l from-blue-500 to-cyan-500 rounded-full" />
          </span>

          <h2
            id="github-activity-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            <span className="text-text">Latest </span>
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
              GitHub Activity
            </span>
          </h2>

          <p className="mt-4 text-lg text-text/60 max-w-2xl mx-auto">
            Recent repositories and contributions from my GitHub profile
          </p>
        </motion.div>

        {/* Loading skeletons */}
        {loading && (
          <div
            role="status"
            aria-live="polite"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {Array.from({ length: perPage }).map((_, i) => (
              <div key={i} className="glass-card rounded-3xl p-6 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-200/70 dark:bg-gray-700/40" />
                  <div className="h-6 w-32 bg-gray-200/70 dark:bg-gray-700/40 rounded" />
                </div>
                <div className="h-4 w-full bg-gray-200/70 dark:bg-gray-700/40 rounded mb-2" />
                <div className="h-4 w-3/4 bg-gray-200/70 dark:bg-gray-700/40 rounded mb-6" />
                <div className="flex gap-4">
                  <div className="h-4 w-16 bg-gray-200/70 dark:bg-gray-700/40 rounded" />
                  <div className="h-4 w-24 bg-gray-200/70 dark:bg-gray-700/40 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-red-600 dark:text-red-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          </motion.div>
        )}

        {/* Repos grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo, index) => {
              const isHovered = hoveredId === repo.id;
              const langGradient =
                languageColors[repo.language || ""] || languageColors.default;

              return (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  onHoverStart={() => setHoveredId(repo.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  className="group block relative focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-gray-900 rounded-3xl"
                  aria-label={`Open repository ${repo.name} on GitHub`}
                >
                  <motion.div
                    whileHover={
                      reduceMotion ? undefined : { y: -6, scale: 1.02 }
                    }
                    transition={{ duration: 0.3, ease }}
                    className="relative h-full"
                  >
                    {/* Glow */}
                    <motion.div
                      className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 blur-xl"
                      animate={{ opacity: isHovered ? 0.3 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Card */}
                    <div className="relative h-full glass-card rounded-3xl p-6 flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${langGradient} flex items-center justify-center text-white shadow-lg`}
                          >
                            <Code2 className="w-5 h-5" />
                          </div>
                          <h3 className="text-lg font-bold text-text line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {repo.name}
                          </h3>
                        </div>

                        <motion.div
                          animate={{
                            opacity: isHovered ? 1 : 0,
                            x: isHovered ? 0 : -5,
                          }}
                          transition={{ duration: 0.2 }}
                          className="text-gray-400"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.div>
                      </div>

                      {/* Description */}
                      {repo.description && (
                        <p className="text-sm text-text/60 mb-4 line-clamp-2 flex-grow">
                          {repo.description}
                        </p>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center gap-4">
                          {/* Stars */}
                          <span className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            {repo.stargazers_count}
                          </span>

                          {/* Language badge */}
                          {repo.language && (
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${langGradient} text-white`}
                            >
                              {repo.language}
                            </span>
                          )}
                        </div>

                        {/* Last updated */}
                        <span className="flex items-center gap-1.5 text-text/50">
                          <GitPullRequest className="w-4 h-4" />
                          {formatDate(repo.pushed_at)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.a>
              );
            })}
          </div>
        )}

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6, ease }}
          className="text-center mt-12"
        >
          <motion.a
            href={`https://github.com/${username}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduceMotion ? undefined : { scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold glass-card hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300"
          >
            <svg
              className="w-5 h-5 text-gray-700 dark:text-gray-300"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="text-text">View All Repositories</span>
            <svg
              className="w-4 h-4 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
