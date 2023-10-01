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
        capacity_per_axle: 0,
        name: 'Unão',
        created_by: 'test',
        updated_by: 'test',
        weight: 4000,
      }),
      created_by: 'test',
      updated_by: 'test',
    });

    expect(vehicle).toBeTruthy();
  });
});
