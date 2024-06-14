import { z } from "zod";

export const FineSchema = z.object({
  fineid: z.number().int().positive().optional(),
  loanid: z.number({
    required_error:'loanid is required',
    invalid_type_error:'loanid must be a number'
  }).int().positive(),
  amount: z.number({
    required_error:'amount is required',
    invalid_type_error:'amount must be a number'
  }),
  paid: z.boolean({
    invalid_type_error:'paid must be true or false'
  }).default(false),
  paidat: z.date().optional()
});
export type Fine = z.infer<typeof FineSchema>;
