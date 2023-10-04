import { CompanyVehicle } from './CompanyVehicle';

describe('CompanyVehicle', () => {
  it('should create outsourced company vehicle', () => {
    const companyVehicle = new CompanyVehicle({
      vehicle_id: '132',
    });

    expect(companyVehicle).toBeTruthy();
  });
});
