import { Injectable } from '@nestjs/common';

import { CteLegalClientPdf } from 'domain/entities/Cte Entities/CtePdfLegalClient/CtePdfLegalClient';
import { CtePhyscialCustomerPdf } from 'domain/entities/Cte Entities/CtePdfPhysicalClient/CtePdfPhysicalCustomer';
import { LegalClientCte } from 'domain/entities/Cte Entities/LegalClientCte/LegalClientCte';
import { LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type CtePdfRepository } from 'domain/repositories/CtePdfRepository';

import { PrismaService } from '../prisma.service';
import { LegalClientQuoteTablePrismaDTO } from './prismaDTO/LegalClientQuoteTablePrismaDto';
import { LegalPersonPrismaDTO } from './prismaDTO/LegalPersonPrismaDto';
import { NaturalPersonPrismaDTO } from './prismaDTO/NaturalPersonPrismaDto';
import { PhysicalCustomerQuoteTablePrismaDTO } from './prismaDTO/PhysicalCustomerQuoteTablePrismaDto';

@Injectable()
export class CtePdfPrismaService implements CtePdfRepository {
  constructor(private prisma: PrismaService) {}
  async getDataForGenerateCtePdfLegalClient(
    cteId: string,
  ): Promise<CteLegalClientPdf> {
    console.log(cteId);
    const cteDataPrisma = await this.prisma.legalClientCte.findFirst({
      where: { id: cteId },
      select: {
        LegalClientOrder: {
          select: {
            total_receivable: true,
            total_shipping_cost: true,
            total_tax_payable: true,
            FreightExpenses: { select: { value: true, expense_name: true } },
            LegalContract: {
              select: { LegalClient: { select: { LegalPerson: true } } },
            },
            QuoteTable: {
              include: {
                AdressDestiny: true,
                AdressOrigin: true,
                Recipient: {
                  select: { NaturalPerson: true, LegalPerson: true },
                },
                Sender: {
                  select: { NaturalPerson: true, LegalPerson: true },
                },
              },
            },
            CarrierCompany: { select: { LegalPerson: true, rntrc: true } },
          },
        },
        access_key: true,
        cte_number: true,
        id: true,
        observations: true,
        type_cte: true,
        order_id: true,
      },
    });
    const recipientLegalPerson =
      cteDataPrisma?.LegalClientOrder.QuoteTable?.Recipient.LegalPerson;
    const recipientNaturalPerson =
      cteDataPrisma?.LegalClientOrder.QuoteTable?.Recipient.NaturalPerson;

    const originAdress = cteDataPrisma.LegalClientOrder.QuoteTable.AdressOrigin;

    const destinyAdress =
      cteDataPrisma.LegalClientOrder.QuoteTable.AdressDestiny;

    const senderLegalPerson =
      cteDataPrisma?.LegalClientOrder.QuoteTable?.Sender.LegalPerson;
    const senderNaturalPerson =
      cteDataPrisma?.LegalClientOrder.QuoteTable?.Sender.NaturalPerson;

    const carrierCompany = new LegalPerson({
      ...cteDataPrisma.LegalClientOrder.CarrierCompany.LegalPerson,
    });

    const legalClientPrisma =
      cteDataPrisma.LegalClientOrder.LegalContract.LegalClient.LegalPerson;
    const expenses = cteDataPrisma?.LegalClientOrder.FreightExpenses.map(
      expense => ({
        expenseName: expense.expense_name,
        value: expense.value,
      }),
    );
    const order = LegalClientQuoteTablePrismaDTO.PrismaToEntity(
      cteDataPrisma.LegalClientOrder.QuoteTable,
      originAdress,
      destinyAdress,
    );
    const cteData = new LegalClientCte({
      acessKey: cteDataPrisma?.access_key,
      cteNumber: cteDataPrisma?.cte_number,
      cteType: cteDataPrisma?.type_cte,
      orderId: cteDataPrisma?.order_id,
      observations: cteDataPrisma?.observations,
      id: cteDataPrisma?.id,
    });
    const ctePdf = new CteLegalClientPdf({
      expenses,
      cteData,
      recipientLegalPerson:
        LegalPersonPrismaDTO.PrismaToEntity(recipientLegalPerson),
      recipientNaturalPerson: NaturalPersonPrismaDTO.PrismaToEntity(
        recipientNaturalPerson,
      ),
      senderLegalPerson: LegalPersonPrismaDTO.PrismaToEntity(senderLegalPerson),
      senderNaturalPerson:
        NaturalPersonPrismaDTO.PrismaToEntity(senderNaturalPerson),
      legalClient: LegalPersonPrismaDTO.PrismaToEntity(legalClientPrisma),
      carrierCompany,
      rntrc: cteDataPrisma.LegalClientOrder.CarrierCompany.rntrc,
      orderData: order,
    });

    return ctePdf;
  }
  async getDataForGenerateCtePdfPhysicalCustomer(
    cteId: string,
  ): Promise<CtePhyscialCustomerPdf> {
    const cteDataPrisma = await this.prisma.physicalCustomerCte.findFirst({
      where: { id: cteId },
      select: {
        PhysicalCustomerOrder: {
          select: {
            FreightExpenses: { select: { value: true, expense_name: true } },
            PhysicalCustomer: { select: { NaturalPerson: true } },
            PhysicalCustomerQuoteTable: {
              include: {
                AdressDestiny: true,
                AdressOrigin: true,
                Recipient: {
                  select: { NaturalPerson: true, LegalPerson: true },
                },
                Sender: {
                  select: { NaturalPerson: true, LegalPerson: true },
                },
              },
            },
            CarrierCompany: { select: { LegalPerson: true, rntrc: true } },
          },
        },
        access_key: true,
        cte_number: true,
        id: true,
        observations: true,
        type_cte: true,
        order_id: true,
      },
    });
    const recipientLegalPerson =
      cteDataPrisma?.PhysicalCustomerOrder.PhysicalCustomerQuoteTable?.Recipient
        .LegalPerson;
    const recipientNaturalPerson =
      cteDataPrisma?.PhysicalCustomerOrder.PhysicalCustomerQuoteTable?.Recipient
        .NaturalPerson;

    const senderLegalPerson =
      cteDataPrisma?.PhysicalCustomerOrder.PhysicalCustomerQuoteTable?.Sender
        .LegalPerson;
    const senderNaturalPerson =
      cteDataPrisma?.PhysicalCustomerOrder.PhysicalCustomerQuoteTable?.Sender
        .NaturalPerson;

    const carrierCompany = new LegalPerson({
      ...cteDataPrisma?.PhysicalCustomerOrder?.CarrierCompany.LegalPerson,
    });

    const legalClientPrisma =
      cteDataPrisma?.PhysicalCustomerOrder?.PhysicalCustomer.NaturalPerson;
    const expenses = cteDataPrisma?.PhysicalCustomerOrder.FreightExpenses.map(
      expense => ({
        expenseName: expense.expense_name,
        value: expense.value,
      }),
    );
    const originAdress =
      cteDataPrisma.PhysicalCustomerOrder.PhysicalCustomerQuoteTable
        .AdressOrigin;

    const destinyAdress =
      cteDataPrisma.PhysicalCustomerOrder.PhysicalCustomerQuoteTable
        .AdressDestiny;
    const cteData = new LegalClientCte({
      acessKey: cteDataPrisma?.access_key,
      cteNumber: cteDataPrisma?.cte_number,
      cteType: cteDataPrisma?.type_cte,
      orderId: cteDataPrisma?.order_id,
      observations: cteDataPrisma?.observations,
      id: cteDataPrisma?.id,
    });
    const order = PhysicalCustomerQuoteTablePrismaDTO.PrismaToEntity(
      cteDataPrisma.PhysicalCustomerOrder.PhysicalCustomerQuoteTable,
      originAdress,
      destinyAdress,
    );
    const ctePdf = new CtePhyscialCustomerPdf({
      expenses,
      cteData,
      recipientLegalPerson:
        LegalPersonPrismaDTO.PrismaToEntity(recipientLegalPerson),
      recipientNaturalPerson: NaturalPersonPrismaDTO.PrismaToEntity(
        recipientNaturalPerson,
      ),
      senderLegalPerson: LegalPersonPrismaDTO.PrismaToEntity(senderLegalPerson),
      senderNaturalPerson:
        NaturalPersonPrismaDTO.PrismaToEntity(senderNaturalPerson),
      physicalCustomer:
        NaturalPersonPrismaDTO.PrismaToEntity(legalClientPrisma),
      carrierCompany,
      rntrc: cteDataPrisma?.PhysicalCustomerOrder?.CarrierCompany.rntrc,
      orderData: order,
    });

    return ctePdf;
  }
}
