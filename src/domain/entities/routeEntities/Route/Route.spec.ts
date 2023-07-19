import { Route } from './Route';

describe('Route', () => {
  it('should create Route', () => {
    const route = new Route({
      cep: '12345678',
      public_place: 'Rua Principal',
      address_number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      uf: 'SP',
      complement: null,
    });
    expect(route).toBeTruthy();
  });
});
