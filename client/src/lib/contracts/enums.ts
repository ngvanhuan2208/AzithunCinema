import { z } from 'zod';
export const RoleSchema = z.enum(['USER', 'ADMIN']);
export const ContentTypeSchema = z.enum(['MOVIE', 'SERIES', 'AUDIO']);
export const AccessLevelSchema = z.enum(['FREE', 'PREMIUM']);
export const ContentStatusSchema = z.enum([
  'DRAFT',
  'PROCESSING',
  'READY',
  'PUBLISHED',
  'ARCHIVED',
]);
export const ProcessingStatusSchema = z.enum([
  'PENDING',
  'PROCESSING',
  'READY',
  'FAILED',
]);
export const PlanCodeSchema = z.enum(['DAY_1', 'MONTH_1', 'MONTH_6']);
export const OrderStatusSchema = z.enum([
  'PENDING',
  'PAID',
  'FAILED',
  'EXPIRED',
  'REFUNDED',
]);
export const PlayDenyReasonSchema = z.enum([
  'UNAUTHENTICATED',
  'NO_SUBSCRIPTION',
  'EXPIRED',
  'DEVICE_LIMIT',
  'PLAY_ERROR',
]);
export type Role = z.infer<typeof RoleSchema>;
export type ContentType = z.infer<typeof ContentTypeSchema>;
export type AccessLevel = z.infer<typeof AccessLevelSchema>;
export type ContentStatus = z.infer<typeof ContentStatusSchema>;
export type ProcessingStatus = z.infer<typeof ProcessingStatusSchema>;
export type PlanCode = z.infer<typeof PlanCodeSchema>;
export type OrderStatus = z.infer<typeof OrderStatusSchema>;
export type PlayDenyReason = z.infer<typeof PlayDenyReasonSchema>;
