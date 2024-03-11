import { RouteLegalClient } from './RouteLegalClient';

describe('Route', () => {
  it('should create route', () => {
    const route = new RouteLegalClient({
      cep: '12345678',
      public_place: 'Rua Principal',
      address_number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      uf: 'SP',
      complement: null,
      order_processing_id: 'ssdsd',
    });
    expect(route).toBeTruthy();
  });
});
