import { CarrierCompany } from './CarrierCompany';

describe('CarrierCompany', () => {
  it('should create carrier company', () => {
    const carrierCompany = new CarrierCompany({
      created_by: 'test',
      legalPersonId: '236',
      updated_by: '5464',
      created_at: new Date(),
      updated_at: new Date(),
      rntrc: '1234567891024',
    });

    expect(carrierCompany).toBeTruthy();
  });
});
