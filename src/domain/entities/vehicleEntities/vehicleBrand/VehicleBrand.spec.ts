import { VehicleBrand } from './VehicleBrand';

describe('User', () => {
  it('should create Vehicle Brand', () => {
    const user = new VehicleBrand({
      name: 'Ford',
    });

    expect(user).toBeTruthy();
  });
});
