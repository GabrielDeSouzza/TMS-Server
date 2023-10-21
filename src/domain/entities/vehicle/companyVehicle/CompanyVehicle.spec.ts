import { CompanyVehicle } from './CompanyVehicle';

describe('CompanyVehicle', () => {
  it('should create outsourced company vehicle', () => {
    const companyVehicle = new CompanyVehicle({
      vehicle_id: '132',
      created_by: 'test',
      updated_by: 'test',
    });

    expect(companyVehicle).toBeTruthy();
  });
});
