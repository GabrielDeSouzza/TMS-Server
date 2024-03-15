import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetInvoiceForPhysicalCustomerDTO } from 'domain/dto/repositories/getDataDtos/GetInvoiceForPhysicalCustomerDto';
import { type FindAllInvoiceForPhysicalCustomerWhereRequestDTO } from 'domain/dto/repositories/whereDtos/InvoiceForPhysicalCustomer';
import { InvoiceForPhysicalCustomer } from 'domain/entities/PhysicalClientEntities/invoiceForPhysicalCustomer/InvoiceForPhysicalCustomer';
import { InvoiceForPhysicalCustomerRepository } from 'domain/repositories/InvoiceForPhysicalCustomer.repository';

import { type CreateInvoiceForPhysicalCustomerDTO } from 'app/dtos/InvoiceForPhysicalCustomerDto/CreateInvoiceForPhysicalCustomer';
import { type UpdateInvoiceForPhysicalCustomerDTO } from 'app/dtos/InvoiceForPhysicalCustomerDto/UpdateInvoiceForPhysicalCustomer';
import { generateRandomNumber } from 'app/utils/RandomNumber';

@Injectable()
export class InvoiceForPhysicalCustomerUseCases {
  constructor(
    private invoiceForPhysicalCustomerRepository: InvoiceForPhysicalCustomerRepository,
  ) {}

  async getInvoiceForPhysicalCustomer(
    request: GetInvoiceForPhysicalCustomerDTO,
  ) {
    if (!request.id && !request.invoice_number) {
      throw new GraphQLError('IS NECESSARY AN ID OR CONTRACT NUMBER');
    }

    const invoice =
      await this.invoiceForPhysicalCustomerRepository.findInvoiceForPhysicalCustomer(
        request,
      );

    if (!invoice) {
      throw new GraphQLError('Invoice NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    return invoice;
  }

  async getAllInvoiceForPhysicalCustomer(
    request: FindAllInvoiceForPhysicalCustomerWhereRequestDTO,
  ) {
    return this.invoiceForPhysicalCustomerRepository.getAllInvoiceForPhysicalCustomer(
      request,
    );
  }

  async createInvoiceForPhysicalCustomer(
    data: CreateInvoiceForPhysicalCustomerDTO,
  ) {
    const invoice = new InvoiceForPhysicalCustomer({
      additional_data: data.additional_data,
      created_by: data.created_by,
      digital_signature: data.digital_signature,
      emission_date: data.emission_date,
      form_payment: data.form_payment,
      invoice_number: 'NFCF' + generateRandomNumber(),
      invoice_taxes: data.invoice_taxes,
      invoice_total: data.invoice_total,
      physicalCustomerId: data.physicalCustomerId,
      nature_invoice: data.nature_invoice,
      updated_by: data.updated_by,
    });

    return this.invoiceForPhysicalCustomerRepository.createInvoiceForPhysicalCustomer(
      invoice,
    );
  }

  async updateInvoiceForPhysicalCustomer(
    id: string,
    data: UpdateInvoiceForPhysicalCustomerDTO,
  ) {
    const invoice = new InvoiceForPhysicalCustomer({
      additional_data: data.additional_data,
      created_by: null,
      digital_signature: data.digital_signature,
      emission_date: data.emission_date,
      form_payment: data.form_payment,
      invoice_number: data.invoice_number,
      invoice_taxes: data.invoice_taxes,
      invoice_total: data.invoice_total,
      physicalCustomerId: data.physicalCustomerId,
      nature_invoice: data.nature_invoice,
      updated_by: data.updated_by,
    });

    return this.invoiceForPhysicalCustomerRepository.updateInvoiceForPhysicalCustomer(
      id,
      invoice,
    );
  }
}
