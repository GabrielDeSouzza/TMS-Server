import { CNH } from '../ownDriver/OwnDriver';
import { OutsourcedDriver } from './OutsourcedTransportCompany';

describe('Outsourced Driver', () => {
  it('should create outsourced driver', () => {
    const outsourcedDriver = new OutsourcedDriver({
      cnh: '48848878781',
      cnh_category: CNH.AD,
      cnh_expiration: new Date(),
      outsourced_transport_company_id: '7',
      course_mopp: true,
      created_by: 'test',
      natural_person_id: 'test',

      updated_by: 'test',
    });
    expect(outsourcedDriver).toBeTruthy();
  });
});
