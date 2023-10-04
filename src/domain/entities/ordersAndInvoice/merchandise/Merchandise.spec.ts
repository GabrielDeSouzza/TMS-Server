import { Merchandise } from './Merchandise';

describe('Merchandise', () => {
  it('should create merchandise', () => {
    const merchandise = new Merchandise({
      natural_person_id: '6546',
      branch: null,
      cpf: null,
    });

    expect(merchandise).toBeTruthy();
  });
});
