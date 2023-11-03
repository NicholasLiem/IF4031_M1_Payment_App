import {Invoice, PrismaClient} from '@prisma/client';
import {InvoiceRepository} from '../../../interfaces/repositories/invoice.repository';

const prisma = new PrismaClient();

export class InvoiceRepositoryPrisma implements InvoiceRepository {
    async create(invoice: Invoice): Promise<Invoice | null> {
        return prisma.invoice.create({data: invoice});
    }

    async delete(id: number): Promise<void> {
        await prisma.invoice.delete({ where: { id } });
    }

    async findById(id: number): Promise<Invoice | null> {
        return prisma.invoice.findUnique({where: {id}});
    }

    async update(invoice: Invoice): Promise<Invoice | null> {
        return prisma.invoice.update({
            where: {id: invoice.id},
            data: invoice,
        });
    }
}
