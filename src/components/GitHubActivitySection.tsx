'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, GitPullRequest } from 'lucide-react'

interface Repo {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  pushed_at: string
}

export default function GitHubActivitySection() {
  const [repos, setRepos] = useState<Repo[]>([])
  const username = 'kamkmgamer' // replace with your GitHub username

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=pushed&per_page=5`
        )
        if (!res.ok) throw new Error('GitHub API error')
        const data: Repo[] = await res.json()
        setRepos(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchRepos()
  }, [])

  return (
    <section id="github-activity" className="py-24 bg-background-light dark:bg-background-dark transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Latest GitHub Activity
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo, index) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-text-light dark:text-text-dark">
                  {repo.name}
                </h3>
                {/* Conditionally render description only if present */}
                {repo.description && (
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
                    {repo.description}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitPullRequest className="w-4 h-4" />{' '}
                  {new Date(repo.pushed_at).toLocaleDateString()}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
