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
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[hsl(var(--accent-gold))]/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[hsl(var(--accent-bronze))]/10 rounded-full blur-3xl opacity-20" />
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
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-[hsl(var(--accent-gold))] mb-6">
            <span className="w-12 h-[1px] bg-gradient-to-r from-[hsl(var(--accent-gold))] to-transparent" />
            Open Source
            <span className="w-12 h-[1px] bg-gradient-to-l from-[hsl(var(--accent-gold))] to-transparent" />
          </span>

          <h2
            id="github-activity-title"
            className="text-5xl sm:text-6xl lg:text-7xl font-display tracking-tight"
          >
            <span className="text-text italic font-normal">GitHub </span>
            <span className="bg-gradient-to-r from-[hsl(var(--accent-gold))] via-[hsl(var(--accent-champagne))] to-[hsl(var(--accent-bronze))] bg-clip-text text-transparent">
              Activity
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
                      className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[hsl(var(--accent-gold))] via-[hsl(var(--accent-champagne))] to-[hsl(var(--accent-bronze))] blur-xl"
                      animate={{ opacity: isHovered ? 0.2 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Card */}
                    <div className="relative h-full glass-card rounded-3xl p-6 flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl bg-black border border-[hsl(var(--accent-gold))]/30 flex items-center justify-center text-[hsl(var(--accent-gold))] shadow-lg`}
                          >
                            <Code2 className="w-5 h-5" />
                          </div>
                          <h3 className="text-lg font-display text-text line-clamp-1 group-hover:text-[hsl(var(--accent-gold))] transition-colors">
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
                              className={`px-3 py-0.5 border border-[hsl(var(--accent-gold))]/20 text-[0.65rem] font-bold uppercase bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))]`}
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
            whileHover={reduceMotion ? undefined : { scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="uppercase tracking-[0.3em] text-[0.65rem] font-bold text-text/50 hover:text-text transition-colors py-4 border-b border-[hsl(var(--accent-gold))]/20 hover:border-[hsl(var(--accent-gold))]"
          >
            <span>View All Repositories</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
