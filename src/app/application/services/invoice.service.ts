import {Invoice, PaymentStatus} from '@prisma/client';
import {InvoiceRepository} from '../../interfaces/repositories/invoice.repository';

export class InvoiceService {
    private invoiceRepository: InvoiceRepository;

    constructor(invoiceRepository: InvoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    async createInvoice(bookingID: string, eventID: number, customerID: number, seatID: number, email: string): Promise<Invoice | null> {
        try {
            const basePaymentURL = process.env.BASE_PAYMENT_APP_URL
            // @ts-ignore
            const invoice: Invoice = {
                bookingID,
                eventID,
                customerID,
                seatID,
                email,
                paymentURL: 'default_url',
                paymentStatus: PaymentStatus.PENDING,
            };

            const createdInvoice = await this.invoiceRepository.create(invoice);
            if (!createdInvoice) {
                return null;
            }

            const newInvoiceId = createdInvoice.id;
            createdInvoice.paymentURL = `${basePaymentURL}/payment/pay?invoice_id=${newInvoiceId}`;
            const success = this.updateInvoice(newInvoiceId, createdInvoice);
            if (!success) {
                return null;
            }
            return createdInvoice;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateInvoice(id: string, updatedInvoice: Partial<Invoice>): Promise<Invoice | null> {
        try {
            const invoice = this.findInvoiceById(id);
            if (!invoice) {
                return null
            }
            updatedInvoice.id = id;
            return await this.invoiceRepository.update(updatedInvoice);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async cancelInvoice(id : string) : Promise<Invoice | null>{
        try {
            const invoice = this.findInvoiceById(id)
            if(!invoice){
                return null;
            }
            return await this.invoiceRepository.cancel(id)
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteInvoice(id: string): Promise<void> {
        try {
            await this.invoiceRepository.delete(id);
        } catch (error) {
            console.error(error);
        }
    }

    async findInvoiceById(id: string): Promise<Invoice | null> {
        try {
            return await this.invoiceRepository.findById(id);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async payInvoice(id: string): Promise<Invoice | null> {
        try {
            // Check if the invoice exists
            const invoice = await this.findInvoiceById(id);
            if (!invoice || invoice.paymentStatus == PaymentStatus.SUCCESS) {
                return null
            }

            // Simulate a 10% chance of failure
            const random = Math.random();

            if (random <= 0.1) {
                return null
            }

            // Payment succeeded
            // Update the data in the invoice
            invoice.paymentStatus = PaymentStatus.SUCCESS
            return this.updateInvoice(id, invoice);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

}
