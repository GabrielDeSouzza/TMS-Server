import { LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';

import { PhysicalCustomerCte } from '../PhysicalCustomerCte/PhysicalCustomerCte';
import { CtePdf } from './CtePdf';

describe('CarrierCompany', () => {
  it('should create carrier company', () => {
    const cte = new CtePdf({
      cteData: new PhysicalCustomerCte({
        acessKey: '26.5.65.645.465464654.45.645646546',
        cteNumber: '123456789',
        orderId: '6465465461654',
        id: '56546',
        observations: '464654',
        cteType: '546496',
      }),
      expenses: [{ expenseName: 'sdasd', value: 45_646 }],
      recipient: new NaturalPerson({
        name: 'Jão',
        date_birth: new Date(),
        gender: 'Masculino',
        cpf: '147475874747',
        rg: '1234567',
        cep: '12345678',
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
      sender: new LegalPerson({
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
      carrierCompany: new LegalPerson({
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
      rntrc: '65465465',
    });

    expect(cte).toBeTruthy();
  });
});
