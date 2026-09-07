import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string(),
      // One-line problem statement for the card + case-study intro.
      summary: z.string(),
      category: z.enum([
        'Marketing site',
        'Web app',
        'E-commerce',
        'Mobile app',
      ]),
      audience: z.string(),
      year: z.union([z.number(), z.string()]),
      stack: z.array(z.string()),
      liveUrl: z.string().url().optional(),
      repoUrl: z.string().url().optional(),
      status: z.enum(['Live', 'Concept build', 'In progress']).default('Concept build'),
      cover: image().optional(),
      gallery: z.array(image()).default([]),
      accent: z.string().default('#c05a36'),
      featured: z.boolean().default(false),
      order: z.number().default(99),
    }),
});

export const collections = { work };
