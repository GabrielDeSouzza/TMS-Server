import { CiotForCorporateClient } from './CiotForLegalPerson';

describe('User', () => {
  it('should create ciot for legal person', () => {
    const ciot = new CiotForCorporateClient({
      carrier_company_id: '123',
      ciot: '123',
      emission_date: new Date(),
      legal_contract_id: '123',
      updated_by: '123',
    });
    expect(ciot).toBeTruthy();
  });
});
