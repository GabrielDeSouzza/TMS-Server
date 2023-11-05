import {
  CNH as CNHPrisma,
  type Prisma,
  type PhysicalCustomer as PhysicalCustomerPrisma,
} from '@prisma/client';

import { type IContractOutsourcedDriver } from 'domain/entities/driverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';
import { type IOutsourcedDriver } from 'domain/entities/driverEntities/outsourcedDriver/OutsourcedDriver';
import { type INaturalPerson } from 'domain/entities/personEntities/naturalPerson/NaturalPerson';
import { PhysicalCustomer } from 'domain/entities/physicalClientEntities/physicalCustomer/PhysicalCustomer';
import { type IOutsourcedVehicle } from 'domain/entities/vehicle/outsourcedVehicle/OutsourcedVehicle';
import { type IVehicle } from 'domain/entities/vehicle/vehicle/Vehicle';

import { NaturalPersonPrismaDTO } from './NaturalPersonPrismaDto';
import { OutsourcedVehiclePrismaDTO } from './OwnsourcedVehiclePrisma.Dto';

export class PhysicalContractorPrismaDTO {
  public static PrismaToEntity(physicalCustomerPrisma: PhysicalCustomerPrisma) {
    return new PhysicalCustomer({
      created_by: physicalCustomerPrisma.created_by,
      natural_person_id: physicalCustomerPrisma.natural_person_id,
      updated_by: physicalCustomerPrisma.updated_by,
      branch: physicalCustomerPrisma.branch,
      created_at: physicalCustomerPrisma.created_at,
      updated_at: physicalCustomerPrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(
    outsourcedDriver: IOutsourcedDriver,
    naturalPerson: INaturalPerson,
    contractOutsourced: IContractOutsourcedDriver,
    outsourcedVehicle: IOutsourcedVehicle,
    vehicle?: IVehicle,
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
    naturalPerson?: INaturalPerson,
    contractOutsourced?: IContractOutsourcedDriver,
    outsourcedVehicle?: IOutsourcedVehicle,
    vehicle?: IVehicle,
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
        ? this.createOrUpdateContract(contractOutsourced)
        : undefined,
    };

    return outsourcedDriverUptade;
  }

  private static createOrUpdateContract(contract: IContractOutsourcedDriver) {
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
