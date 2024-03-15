import { Injectable } from '@nestjs/common';

import { type GetInvoiceForLegalClientDTO } from 'domain/dto/repositories/getDataDtos/GetInvoiceForLegalClientDto';
import { type FindAllInvoiceForLegalClientWhereRequestDTO } from 'domain/dto/repositories/whereDtos/InvoiceForLegalPeronRepositoryDto';
import { type InvoiceForLegalClient } from 'domain/entities/LegalClientEntities/InvoiceForLegalPerson/InvoiceForLegalPerson';
import { type LegalClientMerchandise } from 'domain/entities/LegalClientEntities/LegalClientMerchandises/LegalClientClientMerchandise';
import { type InvoiceForLegalClientRepository } from 'domain/repositories/InvoiceForLegalClient.repository';

import { PrismaService } from '../prisma.service';
import { InvoiceForLegalClientPrismaDTO } from './prismaDTO/InvoiceForLegalClientPrismaDto';
import { LegalClientMerchandisePrismaDTO } from './prismaDTO/LegalClientMerchandisePrismaDto';

@Injectable()
export class InvoiceForLegalClientPrismaService
  implements InvoiceForLegalClientRepository
{
  async findInvoiceForLegalClient(
    request: GetInvoiceForLegalClientDTO,
  ): Promise<InvoiceForLegalClient> {
    const invoiceForLegalClient =
      await this.prisma.invoiceForLegalClient.findFirst({
        where: {
          OR: [{ id: request.id }, { invoice_number: request.invoice_number }],
        },
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
    invoiceForLegalClient: InvoiceForLegalClient,
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

  async getAllInvoiceForLegalClient(
    parameters: FindAllInvoiceForLegalClientWhereRequestDTO,
  ): Promise<InvoiceForLegalClient[]> {
    const invoiceForLegalClients =
      await this.prisma.invoiceForLegalClient.findMany({
        take: parameters.limit,
        skip: parameters.offset,
        where: parameters.where,
        orderBy: parameters.sort,
      });

    return invoiceForLegalClients.map(invoiceForLegalClient =>
      InvoiceForLegalClientPrismaDTO.PrismaToEntity(invoiceForLegalClient),
    );
  }

  constructor(private prisma: PrismaService) {}
  async getMerchandiseByInvoiceForLegalClient(
    request: GetInvoiceForLegalClientDTO,
  ): Promise<LegalClientMerchandise> {
    console.log('tete');
    const invoice = await this.prisma.invoiceForLegalClient.findFirst({
      where: {
        OR: [{ id: request.id }, { invoice_number: request.invoice_number }],
      },
      select: { LegalClientMerchandise: true },
    });

    return LegalClientMerchandisePrismaDTO.PrismaToEntity(
      invoice.LegalClientMerchandise,
    );
  }
}
