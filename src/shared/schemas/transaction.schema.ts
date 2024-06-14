import { z } from "zod";


export const transactionType = z.enum(['Loan', 'Return', 'Reservation', 'Fine']);

export const TransactionSchema = z.object({
    transactionid: z.number().int().positive().optional(),
    transactiondate: z.date({
      required_error:'transactiondate is required',
      invalid_type_error:'the introduced date is invalid'
    }),
    userid: z.number({
      required_error:'userid is required',
      invalid_type_error:'userid must be a number'
    }).int().positive(),
    employeeid: z.number({
      required_error:'employeeid is required',
      invalid_type_error:'employeeid must be a number'
    }).int().positive(),
    transactiontype: transactionType,
    details: z.string({
      required_error:'details is required'
    }).max(200,{
      message:'details must have less than 200 characters'
    }),
});

export type Transaction = z.infer<typeof TransactionSchema>;
