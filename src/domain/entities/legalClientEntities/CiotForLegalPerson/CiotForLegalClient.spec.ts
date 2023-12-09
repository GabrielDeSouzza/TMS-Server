import { CiotForLegalClient } from './CiotForLegalClient';

describe('User', () => {
  it('should create ciot for legal person', () => {
    const ciot = new CiotForLegalClient({
      ciot: '123',
      emission_date: new Date(),
      legal_contract_id: '123',
      updated_by: '123',
    });
    expect(ciot).toBeTruthy();
  });
});
