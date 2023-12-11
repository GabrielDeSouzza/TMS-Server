import { LegalContract } from './LegalContract';

describe('LegalContractor', () => {
  it('should create Legal Contractor', () => {
    const legalContractor = new LegalContract({
      legal_client_id: '213',
      updated_by: '13',
      created_at: new Date(),
      created_by: '123',
      id: '131',
      updated_at: new Date(),
      carrier_company_id: '4548',
      contract_number: '478',
      delivery_conditions: '54797',
      effective_date: new Date(),
      observations: 'tteee',
    });

    expect(legalContractor).toBeTruthy();
  });
});
