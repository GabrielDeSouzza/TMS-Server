import { Injectable } from '@nestjs/common';

import { type GetInvoiceForPhysicalCustomerDTO } from 'domain/dto/repositories/getDataDtos/GetInvoiceForPhysicalCustomerDto';
import { type FindAllInvoiceForPhysicalCustomerWhereRequestDTO } from 'domain/dto/repositories/whereDtos/InvoiceForPhysicalCustomer';
import { type InvoiceForPhysicalCustomer } from 'domain/entities/PhysicalClientEntities/invoiceForPhysicalCustomer/InvoiceForPhysicalCustomer';
import { type InvoiceForPhysicalCustomerRepository } from 'domain/repositories/InvoiceForPhysicalCustomer.repository';

import { PrismaService } from '../prisma.service';
import { InvoiceForPhysicalCustomerPrismaDTO } from './prismaDTO/InvoiceForPhysicalCustomerPrismaDto';

@Injectable()
export class InvoiceForPhysicalCustomerPrismaService
  implements InvoiceForPhysicalCustomerRepository
{
  constructor(private prisma: PrismaService) {}

  async findInvoiceForPhysicalCustomer(
    request: GetInvoiceForPhysicalCustomerDTO,
  ): Promise<InvoiceForPhysicalCustomer> {
    const invoiceForPhysicalCustomer =
      await this.prisma.invoiceForPhysicalCustomer.findFirst({
        where: {
          OR: [{ id: request.id }, { invoice_number: request.invoice_number }],
        },
      });

    return InvoiceForPhysicalCustomerPrismaDTO.PrismaToEntity(
      invoiceForPhysicalCustomer,
    );
  }
  async createInvoiceForPhysicalCustomer(
    invoiceForPhysicalCustomer: InvoiceForPhysicalCustomer,
  ): Promise<InvoiceForPhysicalCustomer> {
    const invoiceForPhysicalCustomerPrisma =
      await this.prisma.invoiceForPhysicalCustomer.create({
        data: InvoiceForPhysicalCustomerPrismaDTO.EntityToCreatePrisma(
          invoiceForPhysicalCustomer,
        ),
      });

    return InvoiceForPhysicalCustomerPrismaDTO.PrismaToEntity(
      invoiceForPhysicalCustomerPrisma,
    );
  }
  async updateInvoiceForPhysicalCustomer(
    id: string,
    invoiceForPhysicalCustomer: InvoiceForPhysicalCustomer,
  ): Promise<InvoiceForPhysicalCustomer> {
    const invoiceForPhysicalCustomerPrisma =
      await this.prisma.invoiceForPhysicalCustomer.update({
        data: InvoiceForPhysicalCustomerPrismaDTO.EntityToPrismaUpdate(
          invoiceForPhysicalCustomer,
        ),
        where: { id },
      });

    return InvoiceForPhysicalCustomerPrismaDTO.PrismaToEntity(
      invoiceForPhysicalCustomerPrisma,
    );
  }

  async getAllInvoiceForPhysicalCustomer(
    parameters: FindAllInvoiceForPhysicalCustomerWhereRequestDTO,
  ): Promise<InvoiceForPhysicalCustomer[]> {
    const invoiceForPhysicalCustomers =
      await this.prisma.invoiceForPhysicalCustomer.findMany({
        take: parameters.limit,
        skip: parameters.offset,
        where: parameters.where,
        orderBy: parameters.sort,
      });

    return invoiceForPhysicalCustomers.map(invoiceForPhysicalCustomer =>
      InvoiceForPhysicalCustomerPrismaDTO.PrismaToEntity(
        invoiceForPhysicalCustomer,
      ),
    );
  }
}
