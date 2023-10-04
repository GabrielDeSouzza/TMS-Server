import { OutsourcedVehicle } from './OutsourcedVehicle';

describe('OutsourcedVehicle', () => {
  it('should create outsourced Vehicle', () => {
    const outsourcedVehicle = new OutsourcedVehicle({
      vehicle_id: '123',
    });

    expect(outsourcedVehicle).toBeTruthy();
  });
});
