import { z } from "zod";

const userStatusType = z.enum(['Active', 'Inactive', 'Blocked', 'Fired']);

export const UserSchema = z.object({
    userid: z.number().int().positive().optional(),
    firstname: z.string({
      required_error:'firstname is required',
      invalid_type_error:'firstname must be a string'
    }).max(50,{message:'firstname must have less than 50 characters'}),
    lastname: z.string({
      required_error:'lastname is required',
      invalid_type_error:'lastname must be a string'
    }).max(50,{message:'lastname must have less than 50 characters'}),
    status: userStatusType.default('Active'),
    email: z.string({
      required_error:'email is required',
    }).email({
      message:'the email must be a valid email'
    }).max(100,{
      message:'email must have less than 100 characters'
    }),
    phone: z.string({
      required_error:'phone is required'
    }).max(15,{
      message:'phone must have less than 15 characters'
    }).optional(),
    address: z.string({
      required_error:'phone is required',
      invalid_type_error:'phone must be a string'
    }).max(200,{message:'phone must have less than 200 characters'}),
    firedate: z.date().optional(),
    passwordhash: z.string({
      required_error:'password is required'
    }).max(255),
});

export type User = z.infer<typeof UserSchema>;

export const UserRoleSchema = z.object({
  userid: z.number({
    required_error:'userid is required',
    invalid_type_error:'userid must be a number'
  }).positive(),
  roleid: z.number({
    required_error:'roleid is required',
    invalid_type_error:'roleid must be a number'
  }).positive(),
})

export type UserRole = z.infer<typeof UserRoleSchema>;