import { getCollection, type CollectionEntry } from 'astro:content';

/** How many projects the home page shows. The rest live on /projects. */
export const HOME_LIMIT = 6;

export type Project = CollectionEntry<'projects'>;

/** Every published project, sorted by `order`. */
export async function getAllProjects(): Promise<Project[]> {
  const list = await getCollection('projects', ({ data }) => !data.draft);
  return list.sort((a, b) => a.data.order - b.data.order);
}

/**
 * Projects for the home page:
 * - if any project has `featured: true`, only featured ones are shown (first 6 by `order`)
 * - otherwise the first 6 by `order`
 */
export async function getHomeProjects(): Promise<Project[]> {
  const all = await getAllProjects();
  const featured = all.filter((p) => p.data.featured);
  return (featured.length ? featured : all).slice(0, HOME_LIMIT);
}