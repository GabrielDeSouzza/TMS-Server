import { Vehicle } from '../vehicle/Vehicle';
import { VehicleModel } from '../vehicleModel/VehicleModel';
import { CompanyVehicle } from './CompanyVehicle';

describe('CompanyVehicle', () => {
  it('should create outsourced company vehicle', () => {
    const companyVehicle = new CompanyVehicle({
      Vehicle: new Vehicle({
        plate: '455445',
        color: 'Azul',
        renavam: '449984944',
        rntrc_expiration: 'dsa',
        year: '455',
        created_by: 'test',
        updated_by: 'test',
        VehicleModel: new VehicleModel({
          axles: 4,
          capacity_max: 40_000,
          capacity_per_axle: 0,
          name: 'Unão',
          created_by: 'test',
          updated_by: 'test',
          weight: 4000,
        }),
      }),
    });

    expect(companyVehicle).toBeTruthy();
  });
});
