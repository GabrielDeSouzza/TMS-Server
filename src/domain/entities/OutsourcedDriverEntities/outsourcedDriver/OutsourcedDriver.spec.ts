import { OutsourcedDriver } from './OutsourcedDriver';

describe('Outsourced Driver', () => {
  it('should create outsourced driver', () => {
    const outsourcedDriver = new OutsourcedDriver({
      cnh: '48848878781',
      cnh_category: 'AD',
      cnh_expiration: new Date(),
      company_vehicle_id: '15668',
      course_mopp: true,
      created_by: 'test',
      natural_person_id: 'test',
      outsourced_vehicle_id: 'test',
      updated_by: 'test',
    });
    expect(outsourcedDriver).toBeTruthy();
  });
});
