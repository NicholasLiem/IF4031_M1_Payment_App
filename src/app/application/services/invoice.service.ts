import {Invoice} from '@prisma/client';
import {InvoiceRepository} from '../../interfaces/repositories/invoice.repository';

export class InvoiceService {
    private invoiceRepository: InvoiceRepository;

    constructor(invoiceRepository: InvoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    async createInvoice(bookingID: number, eventID: number, customerID: number): Promise<Invoice | null> {
        try {
            //@ts-ignore
            const invoice: Invoice = {
                bookingID,
                eventID,
                customerID,
                paymentURL: 'default_url',
                paymentStatus: 'UNPAID',
            };

            return await this.invoiceRepository.create(invoice);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateInvoice(invoice: Invoice): Promise<Invoice | null> {
        try {
            return await this.invoiceRepository.update(invoice);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteInvoice(id: number): Promise<void> {
        try {
            await this.invoiceRepository.delete(id);
        } catch (error) {
            console.error(error);
        }
    }

    async findInvoiceById(id: number): Promise<Invoice | null> {
        try {
            return await this.invoiceRepository.findById(id);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
