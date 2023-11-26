import { Invoice, PaymentStatus, PrismaClient } from "@prisma/client";
import { InvoiceRepository } from "../../../interfaces/repositories/invoice.repository";

const prisma = new PrismaClient();

export class InvoiceRepositoryPrisma implements InvoiceRepository {
  async create(invoice: Invoice): Promise<Invoice | null> {
    return prisma.invoice.create({ data: invoice });
  }

  async delete(id: string): Promise<void> {
    await prisma.invoice.delete({ where: { id } });
  }

  async findById(id: string): Promise<Invoice | null> {
    return prisma.invoice.findUnique({ where: { id } });
  }

  async update(invoice: Partial<Invoice>): Promise<Invoice | null> {
    const invoiceId = invoice.id;
    if (invoiceId === undefined) {
      return null;
    }
    return prisma.invoice.update({
      where: { id: invoice.id },
      data: invoice,
    });
  }

  async cancel(bookingId: string): Promise<Invoice | null> {
    const id = bookingId;
    if (id == undefined) {
      return null;
    }

    try {
      const invoice = await prisma.invoice.findFirst({
        where: {
          bookingID: bookingId,
          paymentStatus: "PENDING",
        },
        select: {
          id: true,
        },
      });
      if (!invoice) {
        return null;
      }
      const { id } = invoice;
      return prisma.invoice.update({
        where: {
          id,
        },
        data: {
          paymentStatus: "FAILED",
        },
      });
    } catch (error) {
      return null;
    }
  }
}
