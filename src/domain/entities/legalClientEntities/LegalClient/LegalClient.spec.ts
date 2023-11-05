import { LegalClient } from './LegalClient';

describe('CorporateClient', () => {
  it('should create corporate client', () => {
    const user = new LegalClient({
      branch: '2654',
      legal_person_id: '134',
      updated_by: '4654',
      created_at: new Date(),
      created_by: '123',
      id: '4679',
      updated_at: new Date(),
    });

    expect(user).toBeTruthy();
  });
});
