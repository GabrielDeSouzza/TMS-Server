import { VehicleBrand } from './VehicleBrand';

describe('VehicleBrand', () => {
  it('should create Vehicle Brand', () => {
    const vehicleBrand = new VehicleBrand({
      name: 'Ford',
    });

    expect(vehicleBrand).toBeTruthy();
  });
});
