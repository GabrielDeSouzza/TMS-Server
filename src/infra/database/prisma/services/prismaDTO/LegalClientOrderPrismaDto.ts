import {
  type Prisma,
  type LegalClientOrder as LegalClientOrderPrisma,
  type FreightExpenses as FreightExpensePrisma,
} from '@prisma/client';

import { LegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';

export class LegalClientOrderPrismaDTO {
  public static PrismaToEntity(
    legalClientOrderPrisma: LegalClientOrderPrisma,
    expensesPrisma?: FreightExpensePrisma[],
    icms?: number,
  ) {
    if (!legalClientOrderPrisma) return null;
    console.log(expensesPrisma);

    return new LegalClientOrder({
      legal_contract_id: legalClientOrderPrisma.legal_contract_id,
      order: legalClientOrderPrisma.order,
      updated_by: legalClientOrderPrisma.updated_by,
      quote_table_id: legalClientOrderPrisma.quote_table_id,
      created_at: legalClientOrderPrisma.created_at,
      total_receivable: legalClientOrderPrisma.total_receivable,
      total_shipping_cost: legalClientOrderPrisma.total_shipping_cost,
      total_tax_payable: legalClientOrderPrisma.total_tax_payable,
      created_by: legalClientOrderPrisma.created_by,
      id: legalClientOrderPrisma.id,
      updated_at: legalClientOrderPrisma.updated_at,
      carrier_id: legalClientOrderPrisma.carrier_id,
      expenses: expensesPrisma?.map(expense => ({
        expenseName: expense.expense_name,
        value: expense.value,
        id: expense.id,
      })),
      icms_tax: icms,
    });
  }
  public static EntityToCreatePrisma(legalClientOrder: LegalClientOrder) {
    const legalClientOrderPrisma: Prisma.LegalClientOrderCreateInput = {
      CreatedBy: { connect: { id: legalClientOrder.created_by } },
      LegalContract: { connect: { id: legalClientOrder.legal_contract_id } },
      order: legalClientOrder.order,
      UpdatedBy: { connect: { id: legalClientOrder.updated_by } },
      created_at: legalClientOrder.created_at,
      updated_at: legalClientOrder.updated_at,
      QuoteTable: { connect: { id: legalClientOrder.quote_table_id } },
      CarrierCompany: { connect: { id: legalClientOrder.carrier_id } },
      total_receivable: legalClientOrder.total_receivable,
      total_shipping_cost: legalClientOrder.total_shipping_cost,
      total_tax_payable: legalClientOrder.total_tax_payable,
      FreightExpenses: {
        createMany: {
          data: legalClientOrder.expenses.map(expense => ({
            expense_name: expense.expenseName,
            value: expense.value,
          })),
        },
      },
    };

    return legalClientOrderPrisma;
  }

  public static EntityToPrismaUpdate(legalClientOrder: LegalClientOrder) {
    const legalClientOrderUptade: Prisma.LegalClientOrderUpdateInput = {
      LegalContract: legalClientOrder.legal_contract_id
        ? { connect: { id: legalClientOrder.legal_contract_id } }
        : undefined,
      QuoteTable: legalClientOrder.quote_table_id
        ? { connect: { id: legalClientOrder.quote_table_id } }
        : undefined,
      UpdatedBy: { connect: { id: legalClientOrder.updated_by } },
      updated_at: legalClientOrder.updated_at,
      CarrierCompany: legalClientOrder.carrier_id
        ? { connect: { id: legalClientOrder.carrier_id } }
        : undefined,
      total_receivable: legalClientOrder.total_receivable,
      total_shipping_cost: legalClientOrder.total_shipping_cost,
      total_tax_payable: legalClientOrder.total_tax_payable,
      FreightExpenses: legalClientOrder.expenses
        ? {
            upsert: legalClientOrder.expenses.map(expense => ({
              create: {
                expense_name: expense.expenseName,
                value: expense.value,
              },
              update: {
                expense_name: expense.expenseName,
                value: expense.value,
              },
              where: { id: expense.id ?? '' },
            })),
          }
        : undefined,
    };

    return legalClientOrderUptade;
  }
}
