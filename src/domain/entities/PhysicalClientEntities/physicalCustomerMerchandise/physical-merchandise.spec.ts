import { PhysicalCustomerMerchandise } from './physical-merchandise';

describe('Merchandise', () => {
  it('should create merchandise', () => {
    const merchandise = new PhysicalCustomerMerchandise({
      amount: 45,
      codMerchandise: '564657',
      description: 'Arroz',
      mass: 458_787,
      physicalCustomerOrderId: '154564',
      value: 646_787,
      volume: 564_654,
      created_at: new Date(),
      id: '123',
      updated_at: new Date(),
    });

    expect(merchandise).toBeTruthy();
  });
});
