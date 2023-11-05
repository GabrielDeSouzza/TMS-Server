import { LegalClientOrderForLegalPerson } from './LegaClientOrder';

describe('CustomerOrder', () => {
  it('should create customer order', () => {
    const customerOrder = new LegalClientOrderForLegalPerson({
      legal_contract_id: '1231',
      order: '313',
      updated_by: '646',
    });

    expect(customerOrder).toBeTruthy();
  });
});
