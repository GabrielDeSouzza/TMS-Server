import { OutsourcedTransportVehicle } from './OutsourcedTransportVehicle';

describe('OutsourcedVehicle', () => {
  it('should create outsourced Vehicle', () => {
    const outsourcedVehicle = new OutsourcedTransportVehicle({
      vehicle_id: '123',
      created_by: 'test',
      updated_by: 'test',
      outsourced_company_id: ' 4787',
    });

    expect(outsourcedVehicle).toBeTruthy();
  });
});
