import { Vehicle } from './Vehicle';

describe('Vehicle', () => {
  it('should create Vehicle', () => {
    const vehicle = new Vehicle({
      plate: '455445',
      color: 'sdf',
      renavam: '449984944',
      antt: 'dsa',
      year: '455',
      model_id: 'test',
    });

    expect(vehicle).toBeTruthy();
  });
});
