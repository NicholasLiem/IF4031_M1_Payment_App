import { z } from 'zod';

export const CreateInvoiceSchema = z.object({
    booking_id: z.number().int(),
    event_id: z.number().int(),
    customer_id: z.number().int(),
    // paymentURL: z.string(),
    // paymentStatus: z.enum(['PAID', 'UNPAID']),
});
