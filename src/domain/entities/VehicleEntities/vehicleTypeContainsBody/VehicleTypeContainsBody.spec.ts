import { VehicleTypeContainsBody } from './VehicleContainsBody';

describe('VehicleTypeContainsBody', () => {
  it('should create vehicle type containsBody', () => {
    const user = new VehicleTypeContainsBody({
      vehicle_bodywork_id: 'test',
      vehicle_type_id: 'test',
      created_by: 'test',
      updated_by: 'test',
    });

    expect(user).toBeTruthy();
  });
});
