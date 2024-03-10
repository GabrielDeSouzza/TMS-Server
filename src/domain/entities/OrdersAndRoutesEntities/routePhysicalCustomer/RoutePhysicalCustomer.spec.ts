import { RoutePhysicalCustomer } from './RoutePhysicalCustomer';

describe('Route', () => {
  it('should create route', () => {
    const route = new RoutePhysicalCustomer({
      cep: '12345678',
      public_place: 'Rua Principal',
      address_number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      uf: 'SP',
      complement: null,
      physicalCustomerOrderId: '1565465',
    });
    expect(route).toBeTruthy();
  });
});
