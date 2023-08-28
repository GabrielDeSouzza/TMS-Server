import { PhysicalCustomer } from '../../clients/physicalCustomer/PhysicalCustomer';
import { PhysicalContractor } from '../../contractors/physicalContractor/PhysicalContractor';
import { CarrierCompany } from '../../legalPerson/carrierCompany/CarrierCompany';
import { LegalPerson } from '../../legalPerson/legalPerson/LegalPerson';
import { NaturalPerson } from '../../personEntities/naturalPerson/NaturalPerson';
import { CiotForPhysicalCustomer } from './CiotForPhysicalCustomer';

describe('User', () => {
  it('should create ciot for physical person', () => {
    const ciot = new CiotForPhysicalCustomer({
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
      PhysicalContractor: new PhysicalContractor({
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
        branch: null,
        cpf: null,
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
      cpf: null,
    });

    expect(ciot).toBeTruthy();
  });
});
