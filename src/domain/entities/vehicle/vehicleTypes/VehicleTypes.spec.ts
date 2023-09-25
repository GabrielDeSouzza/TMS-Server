import { VehicleType } from './VehicleTypes';

describe('VehicleType', () => {
  it('should create vehicle type', () => {
    const vehicleType = new VehicleType({
      created_by: 'test',
      updated_by: 'test',
      name: 'Caminhão',
      bodyWork: null,
    });

    expect(vehicleType).toBeTruthy();
  });
});
