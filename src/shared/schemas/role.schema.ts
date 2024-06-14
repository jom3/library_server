import { z } from "zod";

export const RoleSchema = z.object({
  roleid: z.number().int().positive().optional(),
  rolename: z.string({
    required_error:'role is required'
  }).max(100,{
    message:'rolename has to be less than 50 characters'
  }),
  
});
export type Role = z.infer<typeof RoleSchema>;
