import { Vehicle } from './Vehicle';

describe('Vehicle', () => {
  it('should create Vehicle', () => {
    const vehicle = new Vehicle({
      plate: '455445',
      color: 'sdf',
      renavam: '449984944',
      rntrc_expiration: 'dsa',
      year: '455',
      model_id: 'test',
      created_by: 'test',
      updated_by: 'test',
    });

    expect(vehicle).toBeTruthy();
  });
});
