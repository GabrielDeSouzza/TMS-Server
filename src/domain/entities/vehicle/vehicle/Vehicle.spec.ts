import { VehicleBrand } from '../vehicleBrand/VehicleBrand';
import { VehicleModel } from '../vehicleModel/VehicleModel';
import { Vehicle } from './Vehicle';

describe('Vehicle', () => {
  it('should create Vehicle', () => {
    const vehicle = new Vehicle({
      plate: '455445',
      color: 'sdf',
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
    });

    expect(vehicle).toBeTruthy();
  });
});
