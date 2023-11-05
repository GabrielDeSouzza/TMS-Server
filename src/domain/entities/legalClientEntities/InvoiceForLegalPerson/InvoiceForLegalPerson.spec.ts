import { InvoiceForLegalPerson } from './InvoiceForLegalPerson';

describe('InvoiceForLegalPerson', () => {
  it('should create invoice for legal person', () => {
    const typeOfMaintenance = new InvoiceForLegalPerson({
      additional_data: '64654',
      carrier_company_id: '4654',
      digital_signature: '56465496746545798749649',
      emission_date: new Date(),
      form_payment: '646546',
      invoice_taxes: '56_546_546',
      invoice_total: 56_465_496,
      legal_client_order_id: '557',
      nature_invoice: '6676',
    });

    expect(typeOfMaintenance).toBeTruthy();
  });
});
