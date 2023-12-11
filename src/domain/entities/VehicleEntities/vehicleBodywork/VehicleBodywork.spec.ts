import { VehicleBodywork } from './VehicleBodywork';

describe('VehicleBodywork', () => {
  it('should create vehicle bodywork', () => {
    const vehicleBodywork = new VehicleBodywork({
      axles: 5,
      mass: 454,
      name: 'Unão',
      volume: 4,
      created_by: 'test',
      updated_by: 'test',
    });

    expect(vehicleBodywork).toBeTruthy();
  });
});
