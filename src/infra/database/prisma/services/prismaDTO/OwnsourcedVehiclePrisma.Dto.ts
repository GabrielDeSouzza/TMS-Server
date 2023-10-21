import {
  type Prisma,
  type OutsourcedVehicle as OutsourcedVehiclePrisma,
} from '@prisma/client';

import { type IOutsourcedVehicle } from 'domain/entities/vehicle/outsourcedVehicle/OutsourcedVehicle';
import { OutsourcedVehicle } from 'domain/entities/vehicle/outsourcedVehicle/OutsourcedVehicle';
import { type IVehicle } from 'domain/entities/vehicle/vehicle/Vehicle';

export class OutsourcedVehiclePrismaDTO {
  public static PrismaToEntity(
    outsourcedVehiclePrisma: OutsourcedVehiclePrisma,
  ) {
    return new OutsourcedVehicle({
      id: outsourcedVehiclePrisma.id,
      created_by: outsourcedVehiclePrisma.created_by,
      updated_by: outsourcedVehiclePrisma.updated_by,
      vehicle_id: outsourcedVehiclePrisma.vehicle_id,
      created_at: outsourcedVehiclePrisma.created_at,
      updated_at: outsourcedVehiclePrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(
    outsourcedVehicle: IOutsourcedVehicle,
    vehicle: IVehicle,
  ) {
    const outsourcedVehiclePrisma: Prisma.OutsourcedVehicleCreateInput = {
      created_at: outsourcedVehicle.created_at,
      id: outsourcedVehicle.id,
      UpdatedBy: { connect: { id: outsourcedVehicle.updated_by } },
      CreatedBy: { connect: { id: outsourcedVehicle.created_by } },
      updated_at: outsourcedVehicle.updated_at,
      Vehicle: {
        create: {
          color: vehicle.color,
          plate: vehicle.plate,
          renavam: vehicle.renavam,
          rntrc_expiration: vehicle.rntrc_expiration,
          year: vehicle.year,
          Model: { connect: { id: vehicle.model_id } },
        },
      },
    };
    console.log(outsourcedVehiclePrisma);

    return outsourcedVehiclePrisma;
  }

  public static EntityToPrismaUpdate(
    outsourcedVehicle: Partial<IOutsourcedVehicle>,
    vehicle: Partial<IVehicle>,
  ) {
    const outsourcedVehicleUptade: Prisma.OutsourcedVehicleUpdateInput = {
      created_at: outsourcedVehicle.created_at,
      id: outsourcedVehicle.id,
      updated_at: outsourcedVehicle.updated_at,
      UpdatedBy: { connect: { id: outsourcedVehicle.updated_by } },
      Vehicle: {
        update: {
          color: vehicle.color,
          plate: vehicle.plate,
          renavam: vehicle.renavam,
          rntrc_expiration: vehicle.rntrc_expiration,
          year: vehicle.year,
          model_id: vehicle.model_id,
        },
      },
    };

    return outsourcedVehicleUptade;
  }
}
