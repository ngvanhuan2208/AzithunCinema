import { z } from 'zod';
export const AppNotificationSchema = z.object({
  id: z.string(),
  type: z.string(),
  title: z.string(),
  body: z.string().optional(),
  actionRoute: z.string().optional(),
  read: z.boolean(),
  createdAt: z.iso.datetime(),
});
export type AppNotification = z.infer<typeof AppNotificationSchema>;
