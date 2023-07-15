import { NaturalPerson } from './NaturalPerson';

describe('Natural Person', () => {
  it('should create Natural Person', () => {
    const pessoa = new NaturalPerson({
      name: 'Jão',
      date_birth: new Date(),
      gender: 'Masculino',
      cpf: '147475874747',
      rg: 1_234_567,
      cep: 12_345_678,
      public_place: 'Rua Principal',
      address_number: '123',
      neighborhood: 'Centro',
      complement: 'Apartamento 456',
      city: 'São Paulo',
      uf: 'SP',
      first_phone: '111111111',
      second_phone: '222222222',
      third_phone: '333333333',
      email: 'joao@example.com',
      nationality: 'Brasileiro',
    });
    expect(pessoa).toBeTruthy();
  });
});