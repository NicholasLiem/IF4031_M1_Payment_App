import {InvoiceRepository} from "../interfaces/repositories/invoice.repository";

export class RepositoryContainer {
    private static instance: RepositoryContainer;
    private invoiceRepository: InvoiceRepository;

    private constructor(invoiceRepository: InvoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    public static getInstance(invoiceRepository: InvoiceRepository): RepositoryContainer {
        if (!RepositoryContainer.instance) {
            RepositoryContainer.instance = new RepositoryContainer(invoiceRepository);
        }
        return RepositoryContainer.instance;
    }

    public getInvoiceRepository(): InvoiceRepository {
        return this.invoiceRepository;
    }
}
