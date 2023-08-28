import { VehicleBrand } from '../vehicleBrand/VehicleBrand';
import { VehicleModel } from './VehicleModel';

describe('VehicleModel', () => {
  it('should create vehicle model', () => {
    const vehicleModel = new VehicleModel({
      axles: 5,
      capacity_max: 800,
      name: 'Unão',
      weight: 150,
      VehicleBrand: new VehicleBrand({
        name: 'Ford',
      }),
    });

    expect(vehicleModel).toBeTruthy();
  });
});
