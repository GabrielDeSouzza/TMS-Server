import { TypeMaintenanceProps, TypeOfMaintenance } from './TypeOfMaintenance';

describe('TypeOfMaintenance', () => {
  it('should create type of maintenance', () => {
    const typeOfMaintenance = new TypeOfMaintenance({
      description: 'Troca de óleo',
      created_by: '5.665.6',
      typeMaintenance: TypeMaintenanceProps.CORRECTIVE_MAINTENANCE,
      updated_by: '64654',
    });

    expect(typeOfMaintenance).toBeTruthy();
  });
});
