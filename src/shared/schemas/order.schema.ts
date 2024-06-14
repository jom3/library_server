import { z } from "zod";

const bookStatusType = z.enum(['Pending', 'Received', 'Cancelled']);

export const OrderSchema = z.object({
    orderid: z.number().int().positive().optional(),
    supplierid: z.number({
      required_error:'supplierid is required',
      invalid_type_error:'supplierid must be a number'
    }).int().positive(),
    orderdate: z.date({
      required_error:'orderdate is required',
      invalid_type_error:'the introduced date is invalid'
    }),
    totalamount: z.number({
      required_error:'totalamount is required',
      invalid_type_error:'totalamount must be a number'
    }).positive(),
    status: bookStatusType.default('Pending'),
});

export type Order = z.infer<typeof OrderSchema>;


export const OrderDetailSchema = z.object({
  orderdetailid: z.number().int().positive().optional(),
  orderid: z.number({
    required_error:'orderid is required',
    invalid_type_error:'orderid must be a number'
  }).int().positive(),
  bookid: z.number({
    required_error:'bookid is required',
    invalid_type_error:'bookid must be a number'
  }).int().positive(),
  quantity: z.number({
    required_error:'quantity is required',
    invalid_type_error:'quantity must be a number'
  }).int().positive(),
  price: z.number({
    required_error:'price is required',
    invalid_type_error:'price must be a number'
  }).positive(),
});

export type OrderDetail = z.infer<typeof OrderDetailSchema>;
