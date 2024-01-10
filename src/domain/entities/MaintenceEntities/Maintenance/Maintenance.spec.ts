import { Maintenance } from './Maintenance';

describe('Maintenance', () => {
  it('should create customer maintenance', () => {
    const maintenance = new Maintenance({
      created_at: new Date(),
      id: '131',
      plate: 'adsadasd',
      updated_at: new Date(),
      maintenance_company_cnpj: null,
    });

    expect(maintenance).toBeTruthy();
  });
});
