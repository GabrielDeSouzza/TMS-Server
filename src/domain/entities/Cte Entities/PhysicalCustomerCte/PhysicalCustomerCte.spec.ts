import { PhysicalCustomerCte } from './PhysicalCustomerCte';

describe('CarrierCompany', () => {
  it('should create carrier company', () => {
    const cte = new PhysicalCustomerCte({
      acessKey: '26.5.65.645.465464654.45.645646546',
      cteNumber: '123456789',
      orderId: '6465465461654',
      id: '56546',
      observations: '464654',
      cteType: '546496',
    });

    expect(cte).toBeTruthy();
  });
});
