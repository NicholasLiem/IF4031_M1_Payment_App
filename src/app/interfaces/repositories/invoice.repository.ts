import {Invoice} from "@prisma/client";
export interface InvoiceRepository {
    findById(id: string): Promise<Invoice | null>;
    create(invoice: Invoice): Promise<Invoice | null>;
    update(invoice: Partial<Invoice>): Promise<Invoice | null>;
    delete(id: string): Promise<void>;
}
