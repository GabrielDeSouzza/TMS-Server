import { VehicleType } from './VehicleTypes';

describe('User', () => {
  it('should create vehicle type', () => {
    const user = new VehicleType({
      name: 'Caminhão',
      bodyWork: null,
    });

    expect(user).toBeTruthy();
  });
});
