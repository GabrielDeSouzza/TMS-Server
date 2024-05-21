import { LegalPerson } from './LegalPerson';

describe('LegalPerson', () => {
  it('should create legal person', () => {
    const legalPerson = new LegalPerson({
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
      cep: '464646464',
      first_phone: '11111111111',
      second_phone: '22222222211',
      third_phone: null,
      email: 'empresa@example.com',
    });

    expect(legalPerson).toBeTruthy();
  });
});
