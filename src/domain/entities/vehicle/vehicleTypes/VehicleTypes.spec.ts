import { VehicleType } from './VehicleTypes';

describe('VehicleType', () => {
  it('should create vehicle type', () => {
    const vehicleType = new VehicleType({
      name: 'Caminhão',
      bodyWork: null,
    });

    expect(vehicleType).toBeTruthy();
  });
});
