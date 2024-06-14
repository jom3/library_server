import { z } from "zod";

export const EventSchema = z.object({
  eventid: z.number().int().positive().optional(),
  eventname: z.string({
    required_error:'eventname is required'
  }).max(100,{
    message:'eventname has to be less than 100 characters'
  }),
  eventdate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
  }),
  location: z.string({
    required_error:'location is required'
  }).max(100,{
    message:'location has to be less than 100 characters'
  }),
  description: z.string({
    required_error:'description is required'
  }),
});
export type Event = z.infer<typeof EventSchema>;
