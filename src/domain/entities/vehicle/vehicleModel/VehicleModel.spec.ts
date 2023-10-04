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
      brand_id: 'test',
      type_id: 'test',
    });

    expect(vehicleModel).toBeTruthy();
  });
});
