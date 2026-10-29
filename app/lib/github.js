import { projects } from '../data/projects';
export async function getRepositories() {
 try {
  const response = await fetch('https://api.github.com/users/ikosoftT/repos?per_page=100&sort=updated', { next: { revalidate: 21600 }, headers: { Accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) }, signal: AbortSignal.timeout(5000) });
  if (!response.ok) return [];
  const data = await response.json();
  if (!Array.isArray(data)) return [];
  const featured = new Set(projects.map(p => p.repo.toLowerCase()));
  return data.filter(r => !r.private && !r.fork && r.size > 0 && !featured.has(r.name.toLowerCase())).map(r => ({ name:r.name, description:r.description, language:r.language, url:r.html_url }));
 } catch { return []; }
}
