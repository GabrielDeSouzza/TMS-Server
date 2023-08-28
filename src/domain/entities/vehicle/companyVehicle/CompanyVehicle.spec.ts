import { Vehicle } from '../vehicle/Vehicle';
import { VehicleBrand } from '../vehicleBrand/VehicleBrand';
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
        VehicleModel: new VehicleModel({
          axles: 4,
          capacity_max: 40_000,
          name: 'Unão',
          weight: 4000,
          VehicleBrand: new VehicleBrand({
            name: 'Ford',
          }),
        }),
      }),
    });

    expect(companyVehicle).toBeTruthy();
  });
});
