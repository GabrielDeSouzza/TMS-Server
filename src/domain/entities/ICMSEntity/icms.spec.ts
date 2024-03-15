import { Icms } from './Icms';

describe('ICMS', () => {
  it('should create ICMS', () => {
    const typeOfMaintenance = new Icms({
      aliquot: 12.5,
      created_by: 'teteas',
      effective_date: new Date(),
      recipient_state: 'sp',
      state_origin: 'ac',
      updated_by: 'sdad',
    });

    expect(typeOfMaintenance).toBeTruthy();
  });
});
