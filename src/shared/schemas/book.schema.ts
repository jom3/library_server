import { z } from "zod";

export const BookSchema = z.object({
  bookid: z.number().positive().optional(),
  title: z.string({
    required_error:'title is required',
    invalid_type_error:'title must be a string'
  }).max(100,{message:'title must have less than 100 characters'}),
  isbn: z.string({
    required_error:'isbn is required'
  }).max(20,{message:'isbn must have less than 20 characters'}),
  publisher: z.string({
    required_error:'publisher is required'
  }).max(100,{message:'publisher must have less than 100 characters'}),
  datepublished: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
  }),
  totalcopies: z.number({
    invalid_type_error:'totalcopies must be a number'
  }).int().nonnegative(),
  availablecopies: z.number({
    invalid_type_error:'availablecopies must be a number'
  }).int().nonnegative(),
});

export type Book = z.infer<typeof BookSchema>;

export const BookAuthorsSchema = z.object({
  bookid: z.number({
    required_error:'bookid is required',
    invalid_type_error:'bookid must be a number'
  }).positive(),
  authorid: z.number({
    required_error:'authorid is required',
    invalid_type_error:'authorid must be a number'
  }).positive(),
})

export type BookAuthor = z.infer<typeof BookAuthorsSchema>;

export const BookCategoriesSchema = z.object({
  bookid: z.number({
    required_error:'bookid is required',
    invalid_type_error:'bookid must be a number'
  }).positive(),
  categoryid: z.number({
    required_error:'categoryid is required',
    invalid_type_error:'categoryid must be a number'
  }).positive(),
})

export type BookCategory = z.infer<typeof BookCategoriesSchema>;

