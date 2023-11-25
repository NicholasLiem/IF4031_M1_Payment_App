import { Request, Response } from 'express';
import { InvoiceService } from '../services/invoice.service';
import { ResponseUtil } from '../../utils/response.utils';
import axios from 'axios';

export class PaymentController {
    private invoiceService: InvoiceService;

    constructor(invoiceService: InvoiceService) {
        this.invoiceService = invoiceService;
    }

    async payment(req: Request, res: Response) {
        try {
            const { invoice_id } = req.query;

            if (typeof invoice_id === "string") {
                const invoice = await this.invoiceService.payInvoice(invoice_id);
                if (!invoice) {
                    return ResponseUtil.sendResponse(res, 200, 'Payment request failed', null);
                }

                const invoiceData = JSON.stringify(invoice);
                const webhookURL = process.env.WEBHOOK_URL
                const PAYMENT_API_KEY = process.env.PAYMENT_API_KEY;
                const headers = {
                    'Authorization': `Bearer ${PAYMENT_API_KEY}`,
                    'Content-Type': 'application/json',
                };
                const axiosConfig = {
                    headers: headers,
                };
                console.log(webhookURL)
                console.log("Ini headers : ",headers)
                console.log("Ini data :",invoiceData)
                try {
                    // @ts-ignore
                    const response = await axios.post(webhookURL, invoiceData, axiosConfig);
                    console.log("Webhook response:", response.data);
                } catch (error) {
                    console.error("Webhook request failed:", error);
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
