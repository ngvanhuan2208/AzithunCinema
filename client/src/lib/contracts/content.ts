import { z } from 'zod';
import {
  AccessLevelSchema,
  ContentStatusSchema,
  ContentTypeSchema,
  ProcessingStatusSchema,
} from './enums';
export const GenreSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
});
export const ContentSchema = z.object({
  id: z.string(),
  slug: z.string(),
  type: ContentTypeSchema,
  title: z.string(),
  description: z.string(),
  posterUrl: z.string(),
  backdropUrl: z.string().optional(),
  genres: z.array(GenreSchema),
  year: z.number().optional(),
  episodeCount: z.number(),
  status: ContentStatusSchema,
  isNew: z.boolean().optional(),
  hasNewEpisode: z.boolean().optional(),
});
export const EpisodeSchema = z.object({
  id: z.string(),
  contentId: z.string(),
  episodeNumber: z.number(),
  season: z.number().optional(),
  title: z.string(),
  durationSec: z.number(),
  thumbnailUrl: z.string().optional(),
  accessLevel: AccessLevelSchema,
  processingStatus: ProcessingStatusSchema,
});
export type Genre = z.infer<typeof GenreSchema>;
export type Content = z.infer<typeof ContentSchema>;
export type Episode = z.infer<typeof EpisodeSchema>;
