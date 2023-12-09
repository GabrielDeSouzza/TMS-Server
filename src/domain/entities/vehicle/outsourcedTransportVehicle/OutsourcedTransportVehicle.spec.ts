import { OutsourcedVehicle } from './OutsourcedTransportVehicle';

describe('OutsourcedVehicle', () => {
  it('should create outsourced Vehicle', () => {
    const outsourcedVehicle = new OutsourcedVehicle({
      vehicle_id: '123',
      created_by: 'test',
      updated_by: 'test',
    });

    expect(outsourcedVehicle).toBeTruthy();
  });
});
