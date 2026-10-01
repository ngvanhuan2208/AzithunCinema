import { z } from 'zod';
import { OrderStatusSchema, PlanCodeSchema } from './enums';
export const PlanSchema = z.object({
  id: z.string(),
  code: PlanCodeSchema,
  name: z.string(),
  durationDays: z.number(),
  priceVnd: z.number(),
  highlight: z.boolean().optional(),
  highlightLabel: z.string().optional(),
});
export const EntitlementSchema = z.object({
  status: z.enum(['NONE', 'ACTIVE', 'EXPIRING', 'EXPIRED']),
  expiresAt: z.iso.datetime().optional(),
});
export const OrderSchema = z.object({
  id: z.string(),
  planCode: PlanCodeSchema,
  amountVnd: z.number(),
  status: OrderStatusSchema,
  provider: z.enum(['VNPAY', 'MOMO']),
  createdAt: z.iso.datetime(),
});
export type Plan = z.infer<typeof PlanSchema>;
export type Entitlement = z.infer<typeof EntitlementSchema>;
export type Order = z.infer<typeof OrderSchema>;
