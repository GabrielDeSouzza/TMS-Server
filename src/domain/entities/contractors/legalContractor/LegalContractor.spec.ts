import { CorporateClient } from 'domain/entities/legalPerson/CorporateClient/CorporateClient';
import { LegalPerson } from 'domain/entities/legalPerson/legalPerson/LegalPerson';

import { LegalContractor } from './LegalContractor';

describe('LegalContractor', () => {
  it('should create Legal Contractor', () => {
    const legalContractor = new LegalContractor({
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
    });

    expect(legalContractor).toBeTruthy();
  });
});
