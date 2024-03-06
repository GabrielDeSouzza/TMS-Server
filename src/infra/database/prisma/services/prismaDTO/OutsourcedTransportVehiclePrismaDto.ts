import {
  type Prisma,
  type OutsourcedTransportVehicle as OutsourcedTransportVehiclePrisma,
} from '@prisma/client';

import { OutsourcedTransportVehicle } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportVehicle/OutsourcedTransportVehicle';
import { type Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';

export class OutsourcedTransportVehiclePrismaDTO {
  public static PrismaToEntity(
    outsourcedTransportVehiclePrisma: OutsourcedTransportVehiclePrisma,
  ) {
    if (!outsourcedTransportVehiclePrisma) return null;

    return new OutsourcedTransportVehicle({
      created_by: outsourcedTransportVehiclePrisma.created_by,
      outsourced_company_id:
        outsourcedTransportVehiclePrisma.outsourced_company_id,
      updated_by: outsourcedTransportVehiclePrisma.updated_by,
      vehicle_id: outsourcedTransportVehiclePrisma.vehicle_id,
      created_at: outsourcedTransportVehiclePrisma.created_at,
      id: outsourcedTransportVehiclePrisma.id,
      updated_at: outsourcedTransportVehiclePrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(
    outsourcedTransportVehicle: OutsourcedTransportVehicle,
    vehicle: Vehicle,
  ) {
    const outsourcedTransportVehiclePrisma: Prisma.OutsourcedTransportVehicleCreateInput =
      {
        OutsourcedTransportCompany: {
          connect: { id: outsourcedTransportVehicle.outsourced_company_id },
        },
        Vehicle: {
          create: {
            color: vehicle.color,
            plate: vehicle.plate,
            renavam: vehicle.renavam,
            antt: vehicle.antt,
            year: vehicle.year,
            id: vehicle.id,
            Model: { connect: { id: vehicle.model_id } },
            is_ipva_paid: vehicle.isIpvaPaid,
            registration: vehicle.registration,
          },
        },
        created_at: outsourcedTransportVehicle.created_at,
        CreatedBy: { connect: { id: outsourcedTransportVehicle.created_by } },
        id: outsourcedTransportVehicle.id,
        updated_at: outsourcedTransportVehicle.updated_at,
        UpdatedBy: { connect: { id: outsourcedTransportVehicle.updated_by } },
      };

    return outsourcedTransportVehiclePrisma;
  }

  public static EntityToPrismaUpdate(
    outsourcedTransportVehicle: OutsourcedTransportVehicle,
    vehicle: Vehicle,
  ) {
    const outsourcedTransportVehicleUptade: Prisma.OutsourcedTransportVehicleUpdateInput =
      {
        OutsourcedTransportCompany:
          outsourcedTransportVehicle.outsourced_company_id
            ? {
                connect: {
                  id: outsourcedTransportVehicle.outsourced_company_id,
                },
              }
            : undefined,
        Vehicle: {
          update: {
            color: vehicle.color,
            plate: vehicle.plate,
            renavam: vehicle.renavam,
            antt: vehicle.antt,
            year: vehicle.year,
            is_ipva_paid: vehicle.isIpvaPaid,
            registration: vehicle.registration,
            Model: vehicle.model_id
              ? { connect: { id: vehicle.model_id } }
              : undefined,
          },
        },
        updated_at: outsourcedTransportVehicle.updated_at,
        UpdatedBy: { connect: { id: outsourcedTransportVehicle.updated_by } },
      };

    return outsourcedTransportVehicleUptade;
  }
}
