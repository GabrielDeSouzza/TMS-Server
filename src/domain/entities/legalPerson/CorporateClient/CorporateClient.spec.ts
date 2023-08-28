import { LegalPerson } from '../legalPerson/LegalPerson';
import { CorporateClient } from './CorporateClient';

describe('CorporateClient', () => {
  it('should create corporate client', () => {
    const user = new CorporateClient({
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
    });

    expect(user).toBeTruthy();
  });
});
