import {
  type Prisma,
  type FreightExpenses as FreightExpensePrisma,
} from '@prisma/client';

import { FreightExpense } from 'domain/entities/OrdersEntities/FreightExpense/FreightExpense';

export class FreightExpensePrismaDTO {
  public static PrismaToEntity(freightexpensePrisma: FreightExpensePrisma) {
    if (!freightexpensePrisma) return null;

    return new FreightExpense({
      expenseName: freightexpensePrisma.expense_name,
      value: freightexpensePrisma.value,
      legalClientOrderId: freightexpensePrisma.legal_client_order_id,
      physicalCustomerOrderId: freightexpensePrisma.physical_customer_id,
      id: freightexpensePrisma.id,
    });
  }
  public static EntityToCreatePrisma(freightexpense: FreightExpense) {
    const freightexpensePrisma: Prisma.FreightExpensesCreateInput = {
      expense_name: freightexpense.expenseName,
      value: freightexpense.value,
      id: freightexpense.id,
      LegalClientOrder: freightexpense.legalClientOrderId
        ? { connect: { id: freightexpense.legalClientOrderId } }
        : undefined,
      PhysicalCustomerOrder: freightexpense.physicalCustomerOrderId
        ? { connect: { id: freightexpense.physicalCustomerOrderId } }
        : undefined,
    };

    return freightexpensePrisma;
  }

  public static EntityToCreateManyPrisma(freightexpense: FreightExpense[]) {
    const freightexpensePrisma: Prisma.FreightExpensesCreateManyInput[] =
      freightexpense.map(freightexpense => ({
        expense_name: freightexpense.expenseName,
        value: freightexpense.value,
        id: freightexpense.id,
        legal_client_order_id: freightexpense.legalClientOrderId,
        physical_customer_id: freightexpense.physicalCustomerOrderId,
      }));

    return freightexpensePrisma;
  }

  public static EntityToPrismaUpdate(freightexpense: FreightExpense) {
    const freightexpenseUptade: Prisma.FreightExpensesUpdateInput = {
      expense_name: freightexpense.expenseName,
      value: freightexpense.value,
    };

    return freightexpenseUptade;
  }
}
