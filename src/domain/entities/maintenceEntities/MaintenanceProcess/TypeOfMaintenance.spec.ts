import { TypeOfMaintenance } from './TypeOfMaintenance';

describe('TypeOfMaintenance', () => {
  it('should create type of maintenance', () => {
    const typeOfMaintenance = new TypeOfMaintenance({
      description: 'Troca de óleo',
      corrective: null,
      preventive: true,
    });

    expect(typeOfMaintenance).toBeTruthy();
  });
});
