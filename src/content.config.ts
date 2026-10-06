import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      category: z.string(),
      client: z.string(),
      year: z.string(),
      role: z.string().optional(),
      accent: z.enum(['blue', 'orange']).default('blue'),
      order: z.number().default(100),
      featured: z.boolean().default(false), // true = eligible for the home page (max 6)
      draft: z.boolean().default(false),
      metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      stack: z.array(z.string()).default([]),
      cover: image(),
      coverAlt: z.string(),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
          }),
        )
        .default([]),
      links: z
        .object({
          live: z.string().url().optional(),
          github: z.string().url().optional(),
          video: z.string().url().optional(),
        })
        .default({}),
    }),
});

const certifications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/certifications' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      code: z.string(),
      issuer: z.string(),
      badge: image(),
      issued: z.string().optional(),
      credentialUrl: z.string().url().optional(),
      order: z.number().default(100),
    }),
});

export const collections = { projects, certifications };