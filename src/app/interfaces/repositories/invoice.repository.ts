import {Invoice} from "@prisma/client";
export interface InvoiceRepository {
    findById(id: number): Promise<Invoice | null>;
    create(invoice: Invoice): Promise<Invoice | null>;
    update(invoice: Invoice): Promise<Invoice | null>;
    delete(id: number): Promise<void>;
}
