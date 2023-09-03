import { LegalPerson } from '../../legalPerson/legalPerson/LegalPerson';
import { Vehicle } from '../../vehicle/vehicle/Vehicle';
import { VehicleBrand } from '../../vehicle/vehicleBrand/VehicleBrand';
import { VehicleModel } from '../../vehicle/vehicleModel/VehicleModel';
import { MaintenanceCompany } from '../MaintenanceCompany/MaintenanceCompany';
import { TypeOfMaintenance } from '../MaintenanceProcess/TypeOfMaintenance';
import { Maintenance } from './Maintenance';

describe('Maintenance', () => {
  it('should create customer maintenance', () => {
    const maintenance = new Maintenance({
      MaintenanceCompany: new MaintenanceCompany({
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
        specialty_maintenance: 'Pneumatica',
        cnpj: null,
      }),
      TypeOfMaintenance: new TypeOfMaintenance({
        description: 'Troca de óleo',
        corrective: null,
        preventive: true,
      }),
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
            created_by: 'test',
            updated_by: 'test',
          }),
        }),
      }),
      plate: null,
      maintenance_company_cnpj: null,
    });

    expect(maintenance).toBeTruthy();
  });
});
