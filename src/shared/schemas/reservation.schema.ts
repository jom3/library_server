import { z } from "zod";

export const reservationStatusType = z.enum(['Pending', 'Fulfilled', 'Cancelled']);

export const ReservationSchema = z.object({
    reservationid: z.number().int().positive().optional(),
    bookid: z.number({
      required_error:'bookid is required',
      invalid_type_error:'bookid must be a number'
    }).int().positive(),
    userid: z.number({
      required_error:'userid is required',
      invalid_type_error:'userid must be a number'
    }).int().positive(),
    reservationdate: z.date({
      required_error:'reservationdate is required',
      invalid_type_error:'the introduced date is invalid'
    }),
    status: reservationStatusType,
});

export type Reservation = z.infer<typeof ReservationSchema>;
