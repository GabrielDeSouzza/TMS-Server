import {
  CNH as CNHPrisma,
  type Prisma,
  type OutsourcedDriver as OutsourcedDriverPrisma,
} from '@prisma/client';

import { type ContractOutsourcedDriver } from 'domain/entities/driverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';
import { type IOutsourcedDriver } from 'domain/entities/driverEntities/outsourcedDriver/OutsourcedDriver';
import { OutsourcedDriver } from 'domain/entities/driverEntities/outsourcedDriver/OutsourcedDriver';
import { CNH } from 'domain/entities/driverEntities/ownDriver/OwnDriver';
import { type NaturalPerson } from 'domain/entities/personEntities/naturalPerson/NaturalPerson';
import { type OutsourcedVehicle } from 'domain/entities/vehicle/outsourcedVehicle/OutsourcedVehicle';
import { type Vehicle } from 'domain/entities/vehicle/vehicle/Vehicle';

import { NaturalPersonPrismaDTO } from './NaturalPersonPrismaDto';
import { OutsourcedVehiclePrismaDTO } from './OwnsourcedVehiclePrisma.Dto';

export class OutsourcedDriverPrismaDTO {
  public static PrismaToEntity(outsourcedDriverPrisma: OutsourcedDriverPrisma) {
    return new OutsourcedDriver({
      id: outsourcedDriverPrisma.id,
      cnh: outsourcedDriverPrisma.cnh,
      cnh_category: CNH[outsourcedDriverPrisma.cnh_category],
      cnh_expiration: outsourcedDriverPrisma.cnh_expiration,
      company_vehicle: outsourcedDriverPrisma.company_vehicle,
      course_mopp: outsourcedDriverPrisma.course_mopp,
      created_by: outsourcedDriverPrisma.created_by,
      natural_person_id: outsourcedDriverPrisma.natural_person_id,
      updated_by: outsourcedDriverPrisma.updated_by,
      created_at: outsourcedDriverPrisma.created_at,
      updated_at: outsourcedDriverPrisma.updated_at,
      outsourced_vehicle_id: outsourcedDriverPrisma.outsourced_vehicle_id,
    });
  }
  public static EntityToCreatePrisma(
    outsourcedDriver: OutsourcedDriver,
    naturalPerson: NaturalPerson,
    contractOutsourced: ContractOutsourcedDriver,
    outsourcedVehicle: OutsourcedVehicle,
    vehicle?: Vehicle,
  ) {
    const outsourcedDriverPrisma: Prisma.OutsourcedDriverCreateInput = {
      cnh: outsourcedDriver.cnh,
      cnh_category: CNHPrisma[outsourcedDriver.cnh_category],
      cnh_expiration: outsourcedDriver.cnh_expiration,
      NaturalPerson: {
        create: {
          address_number: naturalPerson.address_number,
          cep: naturalPerson.cep,
          city: naturalPerson.city,
          complement: naturalPerson.complement ?? '',
          cpf: naturalPerson.cpf,
          date_birth: naturalPerson.date_birth,
          email: naturalPerson.email,
          first_phone: naturalPerson.first_phone,
          gender: naturalPerson.gender,
          name: naturalPerson.name,
          nationality: naturalPerson.nationality,
          neighborhood: naturalPerson.neighborhood,
          public_place: naturalPerson.public_place,
          rg: naturalPerson.rg,
          uf: naturalPerson.uf,
          second_phone: naturalPerson.second_phone,
          third_phone: naturalPerson.third_phone,
        },
      },
      CreatedBy: { connect: { id: outsourcedDriver.created_by } },
      created_at: outsourcedDriver.created_at,
      course_mopp: outsourcedDriver.course_mopp,
      UpdatedBy: { connect: { id: outsourcedDriver.updated_by } },
      updated_at: outsourcedDriver.updated_at,
      company_vehicle: outsourcedDriver.company_vehicle,
      OutsourcedVehicle: {
        connectOrCreate: {
          where: {
            id: outsourcedDriver.outsourced_vehicle_id ?? '',
          },
          create: OutsourcedVehiclePrismaDTO.EntityToCreatePrisma(
            outsourcedVehicle,
            vehicle,
          ),
        },
      },
      ContractOutsourcedDriver: {
        create: {
          situation: contractOutsourced.situation,
          created_at: contractOutsourced.created_at,
          end_at: contractOutsourced.end_at,
          created_by: outsourcedDriver.created_by,
          updated_by: outsourcedDriver.updated_by,
          type: contractOutsourced.type,
          start_at: contractOutsourced.start_at,
          cpf: contractOutsourced.cpf,
        },
      },
    };

    return outsourcedDriverPrisma;
  }

  public static EntityToPrismaUpdate(
    outsourcedDriver: IOutsourcedDriver,
    naturalPerson?: NaturalPerson,
    contractOutsourced?: ContractOutsourcedDriver,
    outsourcedVehicle?: OutsourcedVehicle,
    vehicle?: Vehicle,
  ) {
    console.log(outsourcedDriver.id);
    const outsourcedDriverUptade: Prisma.OutsourcedDriverUpdateInput = {
      cnh: outsourcedDriver.cnh,
      cnh_category: CNHPrisma[outsourcedDriver.cnh_category],
      cnh_expiration: outsourcedDriver.cnh_expiration,
      NaturalPerson: {
        update: naturalPerson
          ? NaturalPersonPrismaDTO.EntityToPrismaUpdate(naturalPerson)
          : undefined,
      },
      course_mopp: outsourcedDriver.course_mopp,
      UpdatedBy: { connect: { id: outsourcedDriver.updated_by } },
      updated_at: outsourcedDriver.updated_at,
      company_vehicle: outsourcedDriver.company_vehicle,
      OutsourcedVehicle: outsourcedVehicle
        ? {
            update: OutsourcedVehiclePrismaDTO.EntityToPrismaUpdate(
              outsourcedVehicle,
              vehicle,
            ),
          }
        : undefined,
      ContractOutsourcedDriver: contractOutsourced
        ? OutsourcedDriverPrismaDTO.createOrUpdateContract(contractOutsourced)
        : undefined,
    };

    return outsourcedDriverUptade;
  }

  public static createOrUpdateContract(contract: ContractOutsourcedDriver) {
    if (contract.id) {
      console.log(contract);
      const updateContract: Prisma.Enumerable<Prisma.ContractOutsourcedDriverUpdateWithWhereUniqueWithoutOutsourcedDriverInput> =
        {
          data: {
            cpf: contract.cpf,
            situation: contract.situation,
            start_at: contract.start_at,
            type: contract.type,
            created_at: contract.created_at,
            created_by: contract.created_by,
            end_at: contract.end_at,
            updated_by: contract.updated_by,
            updated_at: contract.updated_at,
          },
          where: { id: contract.id },
        };
      const queryPrisma: Prisma.ContractOutsourcedDriverUpdateManyWithoutOutsourcedDriverNestedInput =
        {
          update: updateContract,
        };

      return queryPrisma;
    } else {
      const createContract: Prisma.XOR<
        Prisma.Enumerable<Prisma.ContractOutsourcedDriverCreateWithoutOutsourcedDriverInput>,
        Prisma.Enumerable<Prisma.ContractOutsourcedDriverUncheckedCreateWithoutOutsourcedDriverInput>
      > = {
        cpf: contract.cpf,
        situation: contract.situation,
        start_at: contract.start_at,
        type: contract.type,
        created_at: contract.created_at,
        created_by: contract.created_by,
        end_at: contract.end_at,
        updated_by: contract.updated_by,
        updated_at: contract.updated_at,
      };
      const queryPrisma: Prisma.ContractOutsourcedDriverUpdateManyWithoutOutsourcedDriverNestedInput =
        {
          create: createContract,
        };

      return queryPrisma;
    }
  }
}
