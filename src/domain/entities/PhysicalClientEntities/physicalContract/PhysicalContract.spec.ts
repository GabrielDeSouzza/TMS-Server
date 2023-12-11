import { PhysicalContract } from './PhysicalContract';

describe('Merchandise', () => {
  it('should create physical contractor', () => {
    const physicalContractor = new PhysicalContract({
      physical_customer_id: 'sdda',
      created_at: new Date(),
      id: '13213',
      updated_at: new Date(),
    });

    expect(physicalContractor).toBeTruthy();
  });
});
