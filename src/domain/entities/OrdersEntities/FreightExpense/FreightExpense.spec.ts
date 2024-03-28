import { FreightExpense } from './FreightExpense';

describe('FreightExpense', () => {
  it('should create order processing', () => {
    const customerOrder = new FreightExpense({
      expenseName: 'DESPACHO',
      legalClientOrderId: '65697',
      physicalCustomerOrderId: '64697',
      value: 450.5,
    });
    expect(customerOrder).toBeTruthy();
  });
});
