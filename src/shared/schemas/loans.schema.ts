import { z } from "zod";

export const LoanSchema = z.object({
  loanid: z.number().int().positive().optional(),
  bookid: z.number({
    required_error:'bookid is required',
    invalid_type_error:'bookid must be a number'
  }).int({
    message:'bookid must be a number'
  }).positive(),
  userid: z.number({
    required_error:'userid is required',
    invalid_type_error:'userid must be a number'
  }).int({
    message:'userid must be a number'
  }).positive(),
  employeeid: z.number({
    required_error:'employeeid is required',
    invalid_type_error:'employeeid must be a number'
  }).int({
    message:'employeeid must be a number'
  }).positive(),
  loandate: z.string().date(),
  returndate: z.string().date().optional(),
  returned: z.boolean().default(false),
});
export type Loan = z.infer<typeof LoanSchema>;
