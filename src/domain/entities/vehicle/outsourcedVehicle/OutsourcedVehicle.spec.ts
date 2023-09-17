import { Vehicle } from '../vehicle/Vehicle';
import { VehicleBrand } from '../vehicleBrand/VehicleBrand';
import { VehicleModel } from '../vehicleModel/VehicleModel';
import { VehicleType } from '../vehicleTypes/VehicleTypes';
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
          created_by: 'test',
          updated_by: 'test',
          capacity_per_axle: 5,
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
      }),
    });

    expect(outsourcedVehicle).toBeTruthy();
  });
});
