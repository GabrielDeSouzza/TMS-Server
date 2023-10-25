import { ContractOutsourcedDriver } from './ContractOutsourcedDriver';

describe('ContractOutsourcedDriver', () => {
  it('should create  contract outsourced driver', () => {
    const contractOutsourcedDriver = new ContractOutsourcedDriver({
      cpf: '12345678910',
      situation: 'Em aberto',
      start_at: new Date(),
      end_at: null,
      type: 'Eteasd',
      outsourced_driver_id: 'test',
      created_by: 'test',
      updated_by: 'test',
    });

    expect(contractOutsourcedDriver).toBeTruthy();
  });
});
