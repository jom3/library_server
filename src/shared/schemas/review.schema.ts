import { z } from "zod";


export const ReviewSchema = z.object({
  reviewid: z.number().int().positive().optional(),
  bookid: z.number({
    required_error:'bookid is required',
    invalid_type_error:'bookid must be a number'
  }).int().positive(),
  userid: z.number({
    required_error:'userid is required',
    invalid_type_error:'userid must be a number'
  }).int().positive(),
  rating: z.number({
    required_error:'rating is required',
    invalid_type_error:'rating must be a number'
  }).int().min(1).max(5),
  comment: z.string({
    required_error:'comment is required',
  }),
  reviewdate: z.date().optional(),
});

export type Review = z.infer<typeof ReviewSchema>;
