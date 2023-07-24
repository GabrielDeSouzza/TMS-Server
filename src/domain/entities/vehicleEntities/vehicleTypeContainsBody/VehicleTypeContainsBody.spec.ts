import { VehicleBodywork } from '../vehicleBodywork/VehicleBodywork';
import { VehicleType } from '../vehicleTypes/VehicleTypes';
import { VehicleTypeContainsBody } from './VehicleContainsBody';

describe('VehicleTypeContainsBody', () => {
  it('should create vehicle type containsBody', () => {
    const user = new VehicleTypeContainsBody({
      VehicleBodywork: new VehicleBodywork({
        axles: 5,
        mass: 454,
        name: 'Unão',
        volume: 4,
      }),
      VehicleType: new VehicleType({
        name: 'Caminhão',
        bodyWork: false,
      }),
    });

    expect(user).toBeTruthy();
  });
});
