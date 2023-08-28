import { LegalContractor } from '../../contractors/legalContractor/LegalContractor';
import { CarrierCompany } from '../../legalPerson/carrierCompany/CarrierCompany';
import { CorporateClient } from '../../legalPerson/CorporateClient/CorporateClient';
import { LegalPerson } from '../../legalPerson/legalPerson/LegalPerson';
import { CiotForCorporateClient } from './CiotForLegalPerson';

describe('User', () => {
  it('should create ciot for legal person', () => {
    const ciot = new CiotForCorporateClient({
      carrier_cnpj: null,
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
      ciot: '787998494asasda',
      emission_date: new Date(),
      LegalContractor: new LegalContractor({
        branch: 'Padaria',
        cnpj: null,
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
    });
    expect(ciot).toBeTruthy();
  });
});
