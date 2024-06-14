import { z } from "zod";


export const AuthSchema = z.object({
    email: z.string({
      required_error:'email is required',
    }).email({
      message:'the email must be a valid email'
    }).max(100,{
      message:'email must have less than 100 characters'
    }),
    password: z.string({
      required_error:'password is required'
    }).max(255),
});

export type Auth = z.infer<typeof AuthSchema>;
