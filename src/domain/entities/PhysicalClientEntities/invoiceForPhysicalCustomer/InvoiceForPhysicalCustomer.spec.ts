import { InvoiceForPhysicalCustomer } from './InvoiceForPhysicalCustomer';

describe('InvoiceForLegalPerson', () => {
  it('should create Invoice For Physical Customer', () => {
    const invoicePhysicalCustomer = new InvoiceForPhysicalCustomer({
      additional_data: '123',
      carrierCompanyId: '123',
      created_by: '123',
      digital_signature: '1654165',
      emission_date: new Date(),
      form_payment: '215',
      invoice_taxes: '2564',
      invoice_total: 1_545_646,
      nature_invoice: '3213',
      physicalCustomerOrderId: '64654',
      updated_by: '1321',
    });

    expect(invoicePhysicalCustomer).toBeTruthy();
  });
});
