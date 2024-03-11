import { OrderProcessingPhysicalCustomer } from './OrderProcessingPhysicalCustomer';

describe('OrderProcessing', () => {
  it('should create order processing', () => {
    const customerOrder = new OrderProcessingPhysicalCustomer({
      start_at: new Date(),
      total_distance: 456.48,
      total_spend_liters: 458.54,
      total_spending_money: 456.54,
      order_id: null,
      end_at: null,
      updated_by: '123',
      vehicle_id: '123',
      created_at: new Date(),
      created_by: '123',
      id: '13',
      updated_at: new Date(),
    });
    expect(customerOrder).toBeTruthy();
  });
});
