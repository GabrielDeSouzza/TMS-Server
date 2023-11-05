import { PhysicalCustomer } from './PhysicalCustomer';

describe('User', () => {
  it('should create physycal custumer', () => {
    const physycalCustumer = new PhysicalCustomer({
      created_by: 'test',
      natural_person_id: '123',
      updated_by: 'test',
      created_at: new Date(),
      updated_at: new Date(),
      branch: 'xxx',
      id: '56746',
    });

    expect(physycalCustumer).toBeTruthy();
  });
});
