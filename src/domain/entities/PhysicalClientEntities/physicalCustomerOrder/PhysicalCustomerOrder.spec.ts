import { PhysicalCustomerOrder } from './PhysicalCustomerOrder';

describe('CustomerOrder', () => {
  it('should create customer order', () => {
    const customerOrder = new PhysicalCustomerOrder({
      order: '65465d4as687d984asd987d9as7d9',
      created_by: 'test',
      updated_by: 'test',
      physicalCustomerId: '54564654',
      quote_table_id: '454654',
      carrier_id: '467899',
      expenses: [{ expenseName: 'sdsd', value: 5454 }],
    });

    expect(customerOrder).toBeTruthy();
  });
});
