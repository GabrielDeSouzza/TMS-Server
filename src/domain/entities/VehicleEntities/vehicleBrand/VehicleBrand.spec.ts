import { VehicleBrand } from './VehicleBrand';

describe('VehicleBrand', () => {
  it('should create Vehicle Brand', () => {
    const vehicleBrand = new VehicleBrand({
      name: 'Ford',
      created_by: 'test',
      updated_by: 'test',
    });

    expect(vehicleBrand).toBeTruthy();
  });
});
