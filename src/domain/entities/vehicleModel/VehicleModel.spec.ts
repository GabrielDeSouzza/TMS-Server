import { VehicleModel } from './VehicleModel';

describe('User', () => {
  it('should create vehicle model', () => {
    const user = new VehicleModel({
      axles: 5,
      capacity_max: 800,
      name: 'Unão',
      weight: 150,
    });

    expect(user).toBeTruthy();
  });
});
