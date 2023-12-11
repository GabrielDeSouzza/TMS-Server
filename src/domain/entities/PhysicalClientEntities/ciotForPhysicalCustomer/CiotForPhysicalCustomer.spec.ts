import { CiotForPhysicalCustomer } from './CiotForPhysicalCustomer';

describe('User', () => {
  it('should create ciot for physical person', () => {
    const ciot = new CiotForPhysicalCustomer({
      carrier_company_id: '123',
      ciot: '13',
      created_by: '132',
      emission_date: new Date(),
      physical_contract_id: '123',
      updated_by: '131',
    });

    expect(ciot).toBeTruthy();
  });
});
