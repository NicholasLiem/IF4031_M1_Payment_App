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
    const userRepository = new InvoiceRepositoryPrisma();
    const repositoryContainer = RepositoryContainer.getInstance(userRepository);

    /**
     * Initialize Services
     */
    return ServiceContainer.getInstance(repositoryContainer);
}
