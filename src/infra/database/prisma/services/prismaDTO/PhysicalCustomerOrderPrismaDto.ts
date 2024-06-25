import {
  type Prisma,
  type PhysicalCustomerOrder as PhysicalCustomerOrderPrisma,
  type FreightExpenses as FreightExpensePrisma,
} from '@prisma/client';

import { type IExpense } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';
import { PhysicalCustomerOrder } from 'domain/entities/PhysicalClientEntities/physicalCustomerOrder/PhysicalCustomerOrder';

export class PhysicalCustomerOrderPrismaDTO {
  public static PrismaToEntity(
    physicalCustomerOrderPrisma: PhysicalCustomerOrderPrisma,
    expensesPrisma?: FreightExpensePrisma[],
    icms?: number,
  ) {
    if (!physicalCustomerOrderPrisma) return null;

    return new PhysicalCustomerOrder({
      physicalCustomerId: physicalCustomerOrderPrisma.physical_customer_id,
      order: physicalCustomerOrderPrisma.order,
      updated_by: physicalCustomerOrderPrisma.updated_by,
      created_at: physicalCustomerOrderPrisma.created_at,
      created_by: physicalCustomerOrderPrisma.created_by,
      id: physicalCustomerOrderPrisma.id,
      updated_at: physicalCustomerOrderPrisma.updated_at,
      quote_table_id: physicalCustomerOrderPrisma.quote_table_id,
      carrier_id: physicalCustomerOrderPrisma.carrier_id,
      total_receivable: physicalCustomerOrderPrisma.total_receivable,
      total_shipping_cost: physicalCustomerOrderPrisma.total_shipping_cost,
      total_tax_payable: physicalCustomerOrderPrisma.total_tax_payable,
      expenses: expensesPrisma?.map(expense => ({
        expenseName: expense.expense_name,
        value: expense.value,
        id: expense.id,
      })),
      icms_tax: icms,
    });
  }
  public static EntityToCreatePrisma(
    physicalCustomerOrder: PhysicalCustomerOrder,
  ) {
    const physicalCustomerOrderPrisma: Prisma.PhysicalCustomerOrderCreateInput =
      {
        CreatedBy: { connect: { id: physicalCustomerOrder.created_by } },
        PhysicalCustomer: {
          connect: { id: physicalCustomerOrder.physicalCustomerId },
        },
        order: physicalCustomerOrder.order,
        UpdatedBy: { connect: { id: physicalCustomerOrder.updated_by } },
        created_at: physicalCustomerOrder.created_at,
        updated_at: physicalCustomerOrder.updated_at,
        PhysicalCustomerQuoteTable: {
          connect: { id: physicalCustomerOrder.quote_table_id },
        },
        CarrierCompany: { connect: { id: physicalCustomerOrder.carrier_id } },
        total_receivable: physicalCustomerOrder.total_receivable,
        total_shipping_cost: physicalCustomerOrder.total_shipping_cost,
        total_tax_payable: physicalCustomerOrder.total_tax_payable,
        FreightExpenses: {
          createMany: {
            data: physicalCustomerOrder.expenses.map(expense => ({
              expense_name: expense.expenseName,
              value: expense.value,
            })),
          },
        },
      };

    return physicalCustomerOrderPrisma;
  }
  public static EntityToPrismaUpdate(
    physicalCustomerOrder: PhysicalCustomerOrder,
  ) {
    const x = this.freightExpensesQuery(
      physicalCustomerOrder.expenses,
      physicalCustomerOrder.deleted_expenses,
    );
    console.log(physicalCustomerOrder);
    const physicalCustomerOrderPrisma: Prisma.PhysicalCustomerOrderUpdateInput =
      {
        PhysicalCustomer: physicalCustomerOrder.physicalCustomerId
          ? {
              connect: { id: physicalCustomerOrder.physicalCustomerId },
            }
          : undefined,
        PhysicalCustomerQuoteTable: physicalCustomerOrder.quote_table_id
          ? { connect: { id: physicalCustomerOrder.quote_table_id } }
          : undefined,
        UpdatedBy: { connect: { id: physicalCustomerOrder.updated_by } },
        updated_at: physicalCustomerOrder.updated_at,
        CarrierCompany: physicalCustomerOrder.carrier_id
          ? { connect: { id: physicalCustomerOrder.carrier_id } }
          : undefined,
        total_receivable: physicalCustomerOrder.total_receivable,
        total_shipping_cost: physicalCustomerOrder.total_shipping_cost,
        total_tax_payable: physicalCustomerOrder.total_tax_payable,
        FreightExpenses: x,
      };

    return physicalCustomerOrderPrisma;
  }
  private static freightExpensesQuery(
    expenses?: IExpense[],
    deleted?: string[],
  ): Prisma.FreightExpensesUpdateManyWithoutPhysicalCustomerOrderNestedInput {
    if (expenses && deleted) {
      return {
        disconnect: deleted.map(expenseId => ({
          id: expenseId,
        })),
        upsert: expenses.map(expense => ({
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
      };
    } else if (!expenses && deleted) {
      return {
        disconnect: deleted.map(expenseId => ({
          id: expenseId,
        })),
      };
    } else if (expenses && !deleted) {
      return {
        upsert: expenses.map(expense => ({
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
      };
    } else return undefined;
  }
}
