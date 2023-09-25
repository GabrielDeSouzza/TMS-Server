import { VehicleBrand } from '../vehicleBrand/VehicleBrand';
import { VehicleType } from '../vehicleTypes/VehicleTypes';
import { VehicleModel } from './VehicleModel';

describe('VehicleModel', () => {
  it('should create vehicle model', () => {
    const vehicleModel = new VehicleModel({
      axles: 5,
      capacity_max: 800,
      name: 'Unão',
      weight: 150,
      capacity_per_axle: 5,
      created_by: 'test',
      updated_by: 'test',
      VehicleBrand: new VehicleBrand({
        name: 'Ford',
        created_by: 'test',
        updated_by: 'test',
      }),
      VehicleType: new VehicleType({
        created_by: 'test',
        updated_by: 'test',
        bodyWork: true,
        name: 'Bau',
        created_at: new Date(),
        updated_at: new Date(),
      }),
    });

    expect(vehicleModel).toBeTruthy();
  });
});
