import { Injectable } from '@nestjs/common';

import { type InvoiceForLegalClient } from 'domain/entities/LegalClientEntities/InvoiceForLegalPerson/InvoiceForLegalPerson';
import { type InvoiceForLegalClientRepository } from 'domain/repositories/InvoiceForLegalClient.repository';

import { PrismaService } from '../prisma.service';
import { InvoiceForLegalClientPrismaDTO } from './prismaDTO/InvoiceForLegalClientPrismaDto';

@Injectable()
export class InvoiceForLegalClientPrismaService
  implements InvoiceForLegalClientRepository
{
  constructor(private prisma: PrismaService) {}

  async findInvoiceForLegalClientById(
    id: string,
  ): Promise<InvoiceForLegalClient> {
    const invoiceForLegalClient =
      await this.prisma.invoiceForLegalClient.findFirstOrThrow({
        where: { id },
      });

    return InvoiceForLegalClientPrismaDTO.PrismaToEntity(invoiceForLegalClient);
  }
  async createInvoiceForLegalClient(
    invoiceForLegalClient: InvoiceForLegalClient,
  ): Promise<InvoiceForLegalClient> {
    const invoiceForLegalClientPrisma =
      await this.prisma.invoiceForLegalClient.create({
        data: InvoiceForLegalClientPrismaDTO.EntityToCreatePrisma(
          invoiceForLegalClient,
        ),
      });

    return InvoiceForLegalClientPrismaDTO.PrismaToEntity(
      invoiceForLegalClientPrisma,
    );
  }
  async updateInvoiceForLegalClient(
    id: string,
    invoiceForLegalClient?: InvoiceForLegalClient,
  ): Promise<InvoiceForLegalClient> {
    const invoiceForLegalClientPrisma =
      await this.prisma.invoiceForLegalClient.update({
        data: InvoiceForLegalClientPrismaDTO.EntityToPrismaUpdate(
          invoiceForLegalClient,
        ),
        where: { id },
      });

    return InvoiceForLegalClientPrismaDTO.PrismaToEntity(
      invoiceForLegalClientPrisma,
    );
  }

  async getAllInvoiceForLegalClient(): Promise<InvoiceForLegalClient[]> {
    const invoiceForLegalClients =
      await this.prisma.invoiceForLegalClient.findMany();

    return invoiceForLegalClients.map(invoiceForLegalClient =>
      InvoiceForLegalClientPrismaDTO.PrismaToEntity(invoiceForLegalClient),
    );
  }
  async findInvoicesByOrder(
    legalCLientID: string,
  ): Promise<InvoiceForLegalClient[]> {
    const invoices = await this.prisma.invoiceForLegalClient.findMany({
      where: { legalClientrOrderId: legalCLientID },
    });

    return invoices.map(invoice =>
      InvoiceForLegalClientPrismaDTO.PrismaToEntity(invoice),
    );
  }
}
