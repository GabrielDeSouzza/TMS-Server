import { Vehicle } from '../vehicle/Vehicle';
import { VehicleBrand } from '../vehicleBrand/VehicleBrand';
import { VehicleModel } from '../vehicleModel/VehicleModel';
import { OutsourcedVehicle } from './OutsourcedVehicle';

describe('OutsourcedVehicle', () => {
  it('should create outsourced Vehicle', () => {
    const outsourcedVehicle = new OutsourcedVehicle({
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
            created_by: 'test',
            updated_by: 'test',
          }),
        }),
      }),
    });

    expect(outsourcedVehicle).toBeTruthy();
  });
});
