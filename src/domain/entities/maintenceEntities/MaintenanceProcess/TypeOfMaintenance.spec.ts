import { TypeOfMaintenance } from './TypeOfMaintenance';

describe('CustomerOrder', () => {
  it('should create customer order', () => {
    const customerOrder = new TypeOfMaintenance({
      description: 'Troca de óleo',
      corrective: null,
      preventive: true,
    });

    expect(customerOrder).toBeTruthy();
  });
});
