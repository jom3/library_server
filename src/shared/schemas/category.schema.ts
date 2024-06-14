import { z } from "zod";

export const CategorySchema = z.object({
  categoryid: z.number().positive().optional(),
  categoryname: z.string({
    required_error:'category name is required',
    invalid_type_error:'category name must be a string'
  }).max(50,{message:'category name must have less than 50 characters'})
});

export type Category = z.infer<typeof CategorySchema>;
