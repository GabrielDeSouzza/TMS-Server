import { CNH } from 'domain/entities/CompanyEntities/ownDriver/OwnDriver';

import { OutsourcedDriver } from './OutsourcedDriver';

describe('Outsourced Driver', () => {
  it('should create outsourced driver', () => {
    const outsourcedDriver = new OutsourcedDriver({
      cnh: '48848878781',
      cnh_category: CNH.AD,
      cnh_expiration: new Date(),
      company_vehicle: false,
      course_mopp: true,
      created_by: 'test',
      natural_person_id: 'test',
      outsourced_vehicle_id: 'test',
      updated_by: 'test',
    });
    expect(outsourcedDriver).toBeTruthy();
  });
});
