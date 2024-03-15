import { InvoiceForLegalClient } from './InvoiceForLegalPerson';

describe('InvoiceForLegalPerson', () => {
  it('should create invoice for legal person', () => {
    const typeOfMaintenance = new InvoiceForLegalClient({
      additional_data: '64654',
      invoice_number: '4467467',
      digital_signature: '56465496746545798749649',
      emission_date: new Date(),
      form_payment: '646546',
      invoice_taxes: 56_546_546,
      invoice_total: 56_465_496,
      nature_invoice: '6676',
      created_by: 'test',
      updated_by: 'test',
      created_at: new Date(),
      updated_at: new Date(),
    });

    expect(typeOfMaintenance).toBeTruthy();
  });
});
