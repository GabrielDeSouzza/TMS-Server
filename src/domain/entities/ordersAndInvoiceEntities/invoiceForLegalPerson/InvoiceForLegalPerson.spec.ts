import { CarrierCompany } from '../../legalPersonEntities/carrierCompany/CarrierCompany';
import { CorporateClient } from '../../legalPersonEntities/CorporateClient/CorporateClient';
import { LegalPerson } from '../../legalPersonEntities/legalPerson/LegalPerson';
import { CustomerOrder } from '../order/CustomerOrder';
import { InvoiceForLegalPerson } from './InvoiceForLegalPerson';

describe('InvoiceForLegalPerson', () => {
  it('should create invoice for legal person', () => {
    const typeOfMaintenance = new InvoiceForLegalPerson({
      additional_data: 'Test',
      CarrierCompany: new CarrierCompany({
        cnpj: null,
        LegalPerson: new LegalPerson({
          fantasy_name: 'Empresa ABC',
          cnpj: '12345678000124',
          state_registration: '123456789',
          corporate_name: 'Empresa ABC LTDA',
          public_place: 'Rua Principal',
          address_number: '123',
          neighborhood: 'Centro',
          complement: 'Sala 456',
          city: 'São Paulo',
          uf: 'SP',
          first_phone: '11111111111',
          second_phone: '22222222211',
          third_phone: null,
          email: 'empresa@example.com',
        }),
      }),
      CorporateClient: new CorporateClient({
        branch: 'Padaria',
        cnpj: null,
        LegalPerson: new LegalPerson({
          fantasy_name: 'Empresa ABC',
          cnpj: '12345678000123',
          state_registration: '123456789',
          corporate_name: 'Empresa ABC LTDA',
          public_place: 'Rua Principal',
          address_number: '123',
          neighborhood: 'Centro',
          complement: 'Sala 456',
          city: 'São Paulo',
          uf: 'SP',
          first_phone: '11111111111',
          second_phone: '22222222211',
          third_phone: null,
          email: 'empresa@example.com',
        }),
      }),
      CustomerOrder: new CustomerOrder({
        order: '65465d4as687d984asd987d9as7d9',
      }),
      digital_signature: '545sdas78979sa7d987g9dfd9879dsfds979fs97',
      emission_date: new Date(),
      form_payment: 'Cheque',
      invoice_taxes: '58787',
      invoice_total: 798_799_879,
      nature_invoice: 'Compra',
      carrier_cnpj: null,
      corporate_cnpj: null,
      customerOrderId: null,
    });

    expect(typeOfMaintenance).toBeTruthy();
  });
});
