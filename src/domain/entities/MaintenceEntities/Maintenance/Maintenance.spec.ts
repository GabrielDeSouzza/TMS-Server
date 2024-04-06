import { Maintenance } from './Maintenance';

describe('Maintenance', () => {
  it('should create customer maintenance', () => {
    const maintenance = new Maintenance({
      created_at: new Date(),
      id: '131',
      created_by: '5465',
      maintenance_company_id: '.65.65',
      type_of_maintenance_id: '564.654',
      vehicle_id: '5.65.',
      updated_by: '..4654',
    });

    expect(maintenance).toBeTruthy();
  });
});
