import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RepoCard({ repoUrl }) {
  const [repo, setRepo] = useState(null);
  const [languageColors, setLanguageColors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch repo details
        console.log(`Fetching repo data for: ${repoUrl}`);
        const response = await fetch(
          `https://api.github.com/repos${new URL(repoUrl).pathname}`
        );
        if (!response.ok) throw new Error("Failed to fetch repo");
        const repoData = await response.json();
        setRepo(repoData);
        // Fetch language colors
        const colorsRes = await axios.get(
          "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json"
        );
        setLanguageColors(colorsRes.data);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    }
    fetchData();
  }, [repoUrl]);

  if (loading) return <li className="p-4 dark:text-surface-50 text-surface-900">Loading…</li>;
  if (error) return <li className="p-4 dark:text-surface-50 text-surface-900">{error}</li>;
  if (!repo) return null;
  return (
      <a
        href={repo.html_url}
        className="card no-underline dark:text-surface-50 text-surface-900 border-[2px] border-surface-200-800 card-hover divide-surface-200-800 block divide-y overflow-hidden"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* Header: show repo owner avatar */}
        <header className="flex flex-row  space-x-4 items-center p-4">
          <span className="font-bold text-xl sm:text-2xl lg:text-base dark:text-surface-50 text-surface-900">
            {repo.full_name}
          </span>
        </header>
        {/* Article */}
        <article className="space-y-3 p-8 lg:space-y-4 lg:p-4">
          <p className="opacity-80  text-2xl sm:text-2xl lg:text-base line-clamp-3 dark:text-surface-50 text-surface-900">
            {repo.description || repo.full_name}
          </p>
          {repo.language && (
            <div className="flex items-center gap-2 mt-2">
              <span
                style={{
                  background:
                    languageColors[repo.language]?.color || "#0366d6",
                }}
                className="lg:w-3 lg:h-3 w-5 h-5 rounded-full inline-block"
              />
              <span className="text-2xl lg:text-sm dark:text-surface-50 text-surface-900">{repo.language}</span>
            </div>
          )}
        </article>
        {/* Footer */}
        <footer className="flex bg-surface-100 dark:bg-surface-800 items-center justify-between gap-2 p-3 sm:gap-4 sm:p-4">
          <small className="opacity-60 text-lg sm:text-xl lg:text-sm dark:text-surface-50 text-surface-900">
            ★ {repo.stargazers_count} &nbsp;|&nbsp; Forks: {repo.forks_count}
          </small>
        </footer>
      </a>
  );
}