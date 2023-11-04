import {PrismaClient} from "@prisma/client";
import {RepositoryContainer} from './containers/repository.container';
import {ServiceContainer} from "./containers/service.container";
import {InvoiceRepositoryPrisma} from "./adapters/prisma/database/invoice.repository.prisma";
export function initContainer() : ServiceContainer {
    /**
     * Initialize Prisma Client
     */
    const prismaClient = new PrismaClient();
    prismaClient.$connect();

    /**
     * Initialize Repositories
     */
    const invoiceRepository = new InvoiceRepositoryPrisma();
    const repositoryContainer = RepositoryContainer.getInstance(invoiceRepository);

    /**
     * Initialize Services
     */
    return ServiceContainer.getInstance(repositoryContainer);
}
