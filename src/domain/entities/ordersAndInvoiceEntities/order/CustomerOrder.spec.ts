import { CustomerOrder } from './CustomerOrder';

describe('CustomerOrder', () => {
  it('should create customer order', () => {
    const customerOrder = new CustomerOrder({
      order: '65465d4as687d984asd987d9as7d9',
    });

    expect(customerOrder).toBeTruthy();
  });
});
