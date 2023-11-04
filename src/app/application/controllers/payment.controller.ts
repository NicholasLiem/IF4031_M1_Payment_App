import { Request, Response } from 'express';
import { InvoiceService } from '../services/invoice.service';
import { ResponseUtil } from '../../utils/response.utils';

export class PaymentController {
    private invoiceService: InvoiceService;

    constructor(invoiceService: InvoiceService) {
        this.invoiceService = invoiceService;
    }

    async payment(req: Request, res: Response) {
        try {
            const { invoice_id } = req.query;

            if (typeof invoice_id === "string") {
                const success = await this.invoiceService.payInvoice(invoice_id);
                if (success) {
                    // Call Webhook on Ticket app
                } else {
                    // Call Webhook on Ticket App
                }
                return ResponseUtil.sendResponse(res, 200, 'Payment request successfully consumed', null);
            } else {
                return ResponseUtil.sendError(res, 400, 'Invalid invoice_id', null);
            }
        } catch (error) {
            return ResponseUtil.sendError(res, 500, 'Internal server error', error);
        }
    }

}
