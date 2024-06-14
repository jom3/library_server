import { z } from "zod";

export const SupplierSchema = z.object({
  supplierid: z.number().int().positive().optional(),
  suppliername: z.string({
    required_error:'suppliername is required'
  }).max(100,{
    message:'suppliername must have less than 100 characters'
  }),
  contactname: z.string({
    required_error:'contactname is required'
  }).max(50,{
    message:'contactname must have less than 50 characters'
  }),
  phone: z.string({
    required_error:'phone is required'
  }).max(15,{
    message:'phone must have less than 15 characters'
  }),
  email: z.string({
    required_error:'email is required'
  }).email({
    message:'this email is not a valid email'
  }).max(100,{
    message:'email must have less than 100 characters'
  }),
  address: z.string({
    required_error:'address is required'
  }).max(200,{
    message:'adress must have less than 200 characters'
  }),
});
export type Supplier = z.infer<typeof SupplierSchema>;
