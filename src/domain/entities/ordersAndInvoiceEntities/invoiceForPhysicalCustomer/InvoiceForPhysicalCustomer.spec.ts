import { PhysicalCustomer } from '../../clientsEntities/physicalCustomer/PhysicalCustomer';
import { CarrierCompany } from '../../legalPersonEntities/carrierCompany/CarrierCompany';
import { LegalPerson } from '../../legalPersonEntities/legalPerson/LegalPerson';
import { NaturalPerson } from '../../personEntities/naturalPerson/NaturalPerson';
import { CustomerOrder } from '../order/CustomerOrder';
import { InvoicePhysicalCustomer } from './InvoiceForPhysicalCustomer';

describe('InvoiceForLegalPerson', () => {
  it('should create Invoice For LegalPerson', () => {
    const customerOrder = new InvoicePhysicalCustomer({
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
      PhysicalCustomer: new PhysicalCustomer({
        NaturalPerson: new NaturalPerson({
          name: 'Jão',
          date_birth: new Date(),
          gender: 'Masculino',
          cpf: '147475874747',
          rg: '1234567',
          cep: 12_345_678,
          public_place: 'Rua Principal',
          address_number: '123',
          neighborhood: 'Centro',
          complement: 'Apartamento 456',
          city: 'São Paulo',
          uf: 'SP',
          first_phone: '155455',
          second_phone: null,
          third_phone: '333333333',
          email: 'joao@example.com',
          nationality: 'Brasileiro',
        }),
        branch: null,
        cpf: null,
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
      customerOrderId: null,
      physicalcustomer_cpf: null,
    });

    expect(customerOrder).toBeTruthy();
  });
});
