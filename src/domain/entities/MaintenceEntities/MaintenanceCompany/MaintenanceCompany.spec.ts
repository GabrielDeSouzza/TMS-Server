import { MaintenanceCompany } from './MaintenanceCompany';

describe('MaintenanceCompany', () => {
  it('should create customer maintenance company', () => {
    const maintenanceCompany = new MaintenanceCompany({
      legal_person_id: '156',
      created_at: new Date(),
      updated_at: new Date(),
      id: 'sdsd',
      specialty_maintenance: 'Pneumatica',
    });

    expect(maintenanceCompany).toBeTruthy();
  });
});
