import { Recipient } from './Recipient';

describe('Recipient', () => {
  it('should create Recipient', () => {
    const typeOfMaintenance = new Recipient({
      created_by: '64556.',
      updated_by: 'dsdasd',
      legal_person_id: 'sdasds',
      natural_person_id: 'sdsads',
    });

    expect(typeOfMaintenance).toBeTruthy();
  });
});
