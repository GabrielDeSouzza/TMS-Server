import { OutsourcedTransportCompanyContract } from './OutsourcedTransportCompanyContract';

describe('CarrierCompany', () => {
  it('should create carrier company', () => {
    const outsourcedTransportCompany = new OutsourcedTransportCompanyContract({
      created_by: 'test',
      updated_by: '5464',
      created_at: new Date(),
      updated_at: new Date(),
      carrierCompanyId: '5454',
      legalClientOrderId: '74857',
      outSourcedTransportCompanyId: '454857',
    });

    expect(outsourcedTransportCompany).toBeTruthy();
  });
});
