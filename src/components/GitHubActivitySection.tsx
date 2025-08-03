'use client';

import React from 'react';
import {
  motion,
  useReducedMotion,
  cubicBezier,
  type Variants,
} from 'framer-motion';
import { Star, GitPullRequest } from 'lucide-react';

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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease },
  }),
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  } catch {
    return iso;
  }
}

export default function GitHubActivitySection({
  username = 'kamkmgamer', // replace with your GitHub username
  perPage = 6,
  showForks = false,
  showArchived = false,
  className = '',
}: GitHubActivitySectionProps) {
  const reduceMotion = useReducedMotion();
  const [repos, setRepos] = React.useState<Repo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function fetchRepos() {
      setLoading(true);
      setError(null);

      // Prefer search API to sort by push date across all repos
      const searchUrl = new URL('https://api.github.com/search/repositories');
      searchUrl.searchParams.set('q', `user:${username}`);
      searchUrl.searchParams.set('sort', 'updated');
      searchUrl.searchParams.set('order', 'desc');
      searchUrl.searchParams.set('per_page', String(perPage * 2)); // fetch extra, filter later

      try {
        // Try Search API first (better sort), fallback to user repos if rate-limited
        const res = await fetch(searchUrl.toString(), {
          headers: {
            Accept: 'application/vnd.github+json',
          },
          // Enable Next.js caching revalidation if desired:
          // next: { revalidate: 300 },
        });

        if (!res.ok) {
          // Fallback
          const fallback = await fetch(
            `https://api.github.com/users/${username}/repos?sort=pushed&per_page=${
              perPage * 2
            }`,
            { headers: { Accept: 'application/vnd.github+json' } }
          );
          if (!fallback.ok) throw new Error('GitHub API error');
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
            e instanceof Error ? e.message : 'Failed to load GitHub activity.'
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
      className={`py-24 bg-background-light dark:bg-background-dark transition-colors duration-500 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2
          id="github-activity-title"
          className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400"
        >
          Latest GitHub Activity
        </h2>

        {loading && (
          <div
            role="status"
            aria-live="polite"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {Array.from({ length: perPage }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl p-6 bg-surface-light dark:bg-surface-dark shadow-lg"
              >
                <div className="h-6 w-40 bg-gray-200/70 dark:bg-gray-700/40 rounded mb-4" />
                <div className="h-4 w-full bg-gray-200/70 dark:bg-gray-700/40 rounded mb-2" />
                <div className="h-4 w-3/5 bg-gray-200/70 dark:bg-gray-700/40 rounded mb-6" />
                <div className="h-4 w-24 bg-gray-200/70 dark:bg-gray-700/40 rounded" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="text-center text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo, index) => (
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
                whileHover={
                  reduceMotion ? undefined : { y: -3, scale: 1.02 }
                }
                transition={{ duration: 0.35, ease }}
                className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl ring-1 ring-black/5 dark:ring-white/10 transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background-dark"
                aria-label={`Open repository ${repo.name} on GitHub`}
              >
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-text-light dark:text-text-dark line-clamp-1">
                    {repo.name}
                  </h3>

                  {repo.description && (
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-3">
                      {repo.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" aria-hidden="true" />{' '}
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitPullRequest className="w-4 h-4" aria-hidden="true" />
                    {formatDate(repo.pushed_at)}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}