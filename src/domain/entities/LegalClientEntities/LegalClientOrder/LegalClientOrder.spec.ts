import { LegalClientOrder } from './LegaClientOrder';

describe('CustomerOrder', () => {
  it('should create customer order', () => {
    const customerOrder = new LegalClientOrder({
      legal_contract_id: '1231',
      order: '313',
      updated_by: '646',
    });

    expect(customerOrder).toBeTruthy();
  });
});
