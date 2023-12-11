import { OutsourcedTransportCompany } from './OutsourcedTransportCompany';

describe('CarrierCompany', () => {
  it('should create carrier company', () => {
    const outsourcedTransportCompany = new OutsourcedTransportCompany({
      created_by: 'test',
      legalPersonId: '236',
      updated_by: '5464',
      created_at: new Date(),
      updated_at: new Date(),
    });

    expect(outsourcedTransportCompany).toBeTruthy();
  });
});
