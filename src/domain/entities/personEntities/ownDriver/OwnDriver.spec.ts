import { CNH, OwnDriver } from './OwnDriver';

describe('Ownsourced Driver', () => {
  it('should create ownsourced driver', () => {
    const ownsourcedDriver = new OwnDriver({
      natural_person_id: 'testId',
      cnh: '48848878781',
      cnh_category: CNH.A,
      cnh_expiration: new Date(),
      company_vehicle: false,
      course_mopp: true,
      created_by: 'test',
      updated_by: 'test',
      created_at: new Date(),
      updated_at: new Date(),
    });
    expect(ownsourcedDriver).toBeTruthy();
  });
});
