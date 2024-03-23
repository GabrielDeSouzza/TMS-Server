import { Sender } from './Sender';

describe('Sender', () => {
  it('should create Sender', () => {
    const typeOfMaintenance = new Sender({
      created_by: '64556.',
      updated_by: 'dsdasd',
      legal_person_id: 'sdasds',
      natural_person_id: 'sdsads',
    });

    expect(typeOfMaintenance).toBeTruthy();
  });
});
