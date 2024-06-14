import { z } from "zod";

export const AuthorSchema = z.object({
  authorid: z.number().optional(),
  firstname: z
    .string({
      required_error: "firstname is required",
      invalid_type_error: "firstname must be string",
    })
    .min(3, { message: "firstname must be 3 or more characters long" })
    .toLowerCase(),
  lastname: z
    .string({
      required_error: "lastname is required",
      invalid_type_error: "lastname must be string",
    })
    .min(3, { message: "lastname must be 3 or more characters long" })
    .toLowerCase(),
  birthdate: z.string().date(),
  isactive: z.boolean().optional(),
  deathdate: z
    .date({
      invalid_type_error: "deathdate must be a date",
    })
    .optional(),
  nationality: z
    .string({
      required_error: "nationality is required",
      invalid_type_error: "nationality must be string",
    })
    .min(5, "nationality must be 5 or more characters long"),
  biography: z.string({
    required_error: "biography is required",
    invalid_type_error: "biography must be string",
  }),
  website: z
    .string({
      invalid_type_error: "website must be string",
    })
    .optional(),
  email: z
    .string({
      invalid_type_error: "required must be string",
    })
    .email({ message: "Invalid email address" })
    .optional(),
  phone: z
    .string()
    .max(15, "phone must be 15 or less characters long")
    .optional(),
  photourl: z
    .string({
      required_error: "photourl is required",
      invalid_type_error: "photourl must be string",
    })
    .url(),
  createdat: z.date().optional(),
  updatedat: z.date().optional(),
});

export type Author = z.infer<typeof AuthorSchema>;
