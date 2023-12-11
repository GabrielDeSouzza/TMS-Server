import { PhysicalCustomerOrder } from './PhysicalCustomerOrder';

describe('CustomerOrder', () => {
  it('should create customer order', () => {
    const customerOrder = new PhysicalCustomerOrder({
      order: '65465d4as687d984asd987d9as7d9',
      physical_contract_id: '6465465465',
      created_by: 'test',
      updated_by: 'test',
    });

    expect(customerOrder).toBeTruthy();
  });
});
