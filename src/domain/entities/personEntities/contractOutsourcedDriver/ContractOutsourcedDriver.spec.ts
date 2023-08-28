/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OutsourcedVehicle } from '../../vehicle/outsourcedVehicle/OutsourcedVehicle';
import { Vehicle } from '../../vehicle/vehicle/Vehicle';
import { VehicleBrand } from '../../vehicle/vehicleBrand/VehicleBrand';
import { VehicleModel } from '../../vehicle/vehicleModel/VehicleModel';
import { NaturalPerson } from '../naturalPerson/NaturalPerson';
import { OutsourcedDriver } from '../outsourcedDriver/OutsourcedDriver';
import { ContractOutsourcedDriver } from './ContractOutsourcedDriver';

describe('ContractOutsourcedDriver', () => {
  it('should create  contract outsourced driver', () => {
    const contractOutsourcedDriver = new ContractOutsourcedDriver({
      cpf: '12345678910',
      situation: 'Em aberto',
      start_at: new Date(),
      end_at: null,
      type: 'Eteasd',
      OutsourcedDriver: new OutsourcedDriver({
        cpf: null,
        NaturalPerson: new NaturalPerson({
          name: 'Jão',
          date_birth: new Date(),
          gender: 'Masculino',
          cpf: '75154789711',
          rg: '1475547854',
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
        cnh: '48848878781',
        cnh_category: 'E',
        cnh_expiration: 1125,
        company_vehicle: false,
        course_mopp: true,
        OutsourcedVehicle: new OutsourcedVehicle({
          Vehicle: new Vehicle({
            plate: '455445',
            color: 'sdf',
            renavam: '449984944',
            rntrc_expiration: 'dsa',
            year: '455',
            VehicleModel: new VehicleModel({
              axles: 4,
              capacity_max: 40_000,
              name: 'Unão',
              weight: 4000,
              VehicleBrand: new VehicleBrand({
                name: 'Ford',
              }),
            }),
          }),
        }),
      }),
    });

    expect(contractOutsourcedDriver).toBeTruthy();
  });
});
