import { Injectable } from '@nestjs/common';

import { CtePdf } from 'domain/entities/Cte Entities/CtePdfEntity/CtePdf';
import { LegalClientCte } from 'domain/entities/Cte Entities/LegalClientCte/LegalClientCte';
import { PhysicalCustomerCte } from 'domain/entities/Cte Entities/PhysicalCustomerCte/PhysicalCustomerCte';
import { LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type CtePdfRepository } from 'domain/repositories/CtePdfRepository';

import { PrismaService } from '../prisma.service';

@Injectable()
export class CtePdfPrismaService implements CtePdfRepository {
  constructor(private prisma: PrismaService) {}
  async getDataForGenerateCtePdfLegalClient(orderId: string): Promise<CtePdf> {
    const cteDataPrisma = await this.prisma.legalClientOrder.findFirst({
      where: { id: orderId },
      select: {
        FreightExpenses: { select: { value: true, expense_name: true } },
        QuoteTable: {
          include: {
            Recipient: {
              select: { NaturalPerson: true, LegalPerson: true },
            },
            Sender: {
              select: { NaturalPerson: true, LegalPerson: true },
            },
          },
        },
        LegalClientCte: true,
      },
    });

    const recipientLegalClient =
      cteDataPrisma?.QuoteTable?.Recipient.LegalPerson;
    const recipientPhysicalCustomer =
      cteDataPrisma?.QuoteTable?.Recipient.NaturalPerson;
    const recipient = recipientLegalClient
      ? new LegalPerson({ ...recipientLegalClient })
      : new NaturalPerson({ ...recipientPhysicalCustomer });

    const senderLegalClient = cteDataPrisma?.QuoteTable?.Sender.LegalPerson;
    const senderPhysicalCustomer =
      cteDataPrisma?.QuoteTable?.Sender.NaturalPerson;
    const sender = recipientLegalClient
      ? new LegalPerson({ ...senderLegalClient })
      : new NaturalPerson({ ...senderPhysicalCustomer });

    const expenses = cteDataPrisma?.FreightExpenses.map(expense => ({
      expenseName: expense.expense_name,
      value: expense.value,
    }));
    const cteData = new LegalClientCte({
      acessKey: cteDataPrisma?.LegalClientCte?.access_key,
      cteNumber: cteDataPrisma?.LegalClientCte?.cte_number,
      cteType: cteDataPrisma?.LegalClientCte?.type_cte,
      orderId: cteDataPrisma?.LegalClientCte?.order_id,
      observations: cteDataPrisma?.LegalClientCte?.observations,
      id: cteDataPrisma?.LegalClientCte?.id,
    });
    const ctePdf = new CtePdf({
      expenses,
      cteData,
      recipient,
      sender,
    });

    return ctePdf;
  }
  async getDataForGenerateCtePdfPhysicalCustomer(
    orderId: string,
  ): Promise<CtePdf> {
    const cteDataPrisma = await this.prisma.physicalCustomerOrder.findFirst({
      where: { id: orderId },
      select: {
        FreightExpenses: { select: { value: true, expense_name: true } },
        PhysicalCustomerQuoteTable: {
          include: {
            Recipient: {
              select: { NaturalPerson: true, LegalPerson: true },
            },
            Sender: {
              select: { NaturalPerson: true, LegalPerson: true },
            },
          },
        },
        PhysicalCustomerCte: true,
      },
    });
    console.log(cteDataPrisma);
    const recipientLegalClient =
      cteDataPrisma?.PhysicalCustomerQuoteTable?.Recipient.LegalPerson;
    const recipientPhysicalCustomer =
      cteDataPrisma?.PhysicalCustomerQuoteTable?.Recipient.NaturalPerson;
    const recipient = recipientLegalClient
      ? new LegalPerson({ ...recipientLegalClient })
      : new NaturalPerson({ ...recipientPhysicalCustomer });

    const senderLegalClient =
      cteDataPrisma?.PhysicalCustomerQuoteTable?.Sender.LegalPerson;
    const senderPhysicalCustomer =
      cteDataPrisma?.PhysicalCustomerQuoteTable?.Sender.NaturalPerson;
    const sender = recipientLegalClient
      ? new LegalPerson({ ...senderLegalClient })
      : new NaturalPerson({ ...senderPhysicalCustomer });

    const expenses = cteDataPrisma?.FreightExpenses.map(expense => ({
      expenseName: expense.expense_name,
      value: expense.value,
    }));

    const cteData = new PhysicalCustomerCte({
      acessKey: cteDataPrisma?.PhysicalCustomerCte?.access_key,
      cteNumber: cteDataPrisma?.PhysicalCustomerCte?.cte_number,
      cteType: cteDataPrisma?.PhysicalCustomerCte?.type_cte,
      orderId: cteDataPrisma?.PhysicalCustomerCte?.order_id,
      observations: cteDataPrisma?.PhysicalCustomerCte?.observations,
      id: cteDataPrisma?.PhysicalCustomerCte?.id,
    });

    const data = new CtePdf({
      expenses,
      cteData,
      recipient,
      sender,
    });

    return data;
  }
}
