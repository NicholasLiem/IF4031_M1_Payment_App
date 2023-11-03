import {InvoiceService} from '../application/services/invoice.service';
import {RepositoryContainer} from './repository.container';

export class ServiceContainer {
    private static instance: ServiceContainer;
    private invoiceService: InvoiceService;

    private constructor(repositoryContainer: RepositoryContainer) {
        this.invoiceService = new InvoiceService(repositoryContainer.getInvoiceRepository());
    }

    public static getInstance(repositoryContainer: RepositoryContainer): ServiceContainer {
        if (!ServiceContainer.instance) {
            ServiceContainer.instance = new ServiceContainer(repositoryContainer);
        }
        return ServiceContainer.instance;
    }

    public getInvoiceService(): InvoiceService {
        return this.invoiceService;
    }
}
