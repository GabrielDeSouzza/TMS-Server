import { VehicleBodywork } from './VehicleBodywork';

describe('User', () => {
  it('should create vehicle model', () => {
    const user = new VehicleBodywork({
      axles: 5,
      mass: 454,
      name: 'Unão',
      volume: 4,
    });

    expect(user).toBeTruthy();
  });
});
