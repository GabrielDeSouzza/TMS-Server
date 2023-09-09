import { VehicleBrand } from '../vehicleBrand/VehicleBrand';
import { VehicleModel } from '../vehicleModel/VehicleModel';
import { VehicleType } from '../vehicleTypes/VehicleTypes';
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
        capacity_per_axle: 0,
        name: 'Unão',
        weight: 4000,
        VehicleBrand: new VehicleBrand({
          name: 'Ford',
          created_by: 'test',
          updated_by: 'test',
        }),
        VehicleType: new VehicleType({
          bodyWork: true,
          name: 'Bau',
          created_at: new Date(),
          updated_at: new Date(),
        }),
      }),
    });

    expect(vehicle).toBeTruthy();
  });
});
