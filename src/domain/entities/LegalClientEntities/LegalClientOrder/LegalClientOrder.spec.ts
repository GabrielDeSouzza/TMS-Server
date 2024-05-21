import { LegalClientOrder } from './LegaClientOrder';

describe('CustomerOrder', () => {
  it('should create customer order', () => {
    const customerOrder = new LegalClientOrder({
      legal_contract_id: '1231',
      order: '313',
      updated_by: '646',
      quote_table_id: '165414',
      carrier_id: '456',
      expenses: [{ expenseName: 'sadasdsa', value: 46_466 }],
    });

    expect(customerOrder).toBeTruthy();
  });
});
