import { z } from 'zod';
import { PlayDenyReasonSchema } from './enums';
export const PlayGrantSchema = z.discriminatedUnion('allowed', [
  z.object({
    allowed: z.literal(true),
    url: z.string(),
    expiresInSec: z.number(),
    resumeSec: z.number().optional(),
  }),
  z.object({ allowed: z.literal(false), reason: PlayDenyReasonSchema }),
]);
export type PlayGrant = z.infer<typeof PlayGrantSchema>;
