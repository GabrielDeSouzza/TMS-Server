import { InvoiceForPhysicalCustomer } from './InvoiceForPhysicalCustomer';

describe('InvoiceForLegalPerson', () => {
  it('should create Invoice For Physical Customer', () => {
    const invoicePhysicalCustomer = new InvoiceForPhysicalCustomer({
      additional_data: '123',
      created_by: '123',
      digital_signature: '1654165',
      emission_date: new Date(),
      form_payment: '215',
      invoice_taxes: 4545.454,
      invoice_total: 1_545_646,
      nature_invoice: '3213',
      invoice_number: '45887',
      updated_by: '1321',
      physicalCustomerId: '654654',
    });

    expect(invoicePhysicalCustomer).toBeTruthy();
  });
});
