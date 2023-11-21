import { z } from 'zod';

export const CreateInvoiceSchema = z.object({
    booking_id: z.string().uuid(),
    event_id: z.number().int(),
    customer_id: z.number().int(),
    seat_id: z.number().int(),
    email: z.string(),
});
