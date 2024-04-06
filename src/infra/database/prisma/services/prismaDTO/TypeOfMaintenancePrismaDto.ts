import {
  type Prisma,
  type TypeOfMaintenance as TypeOfMaintenancePrisma,
} from '@prisma/client';

import { type TypeMaintenanceProps } from 'domain/entities/MaintenceEntities/TypeOfMaintenance/TypeOfMaintenance';
import { TypeOfMaintenance } from 'domain/entities/MaintenceEntities/TypeOfMaintenance/TypeOfMaintenance';

export class TypeOfMaintenancePrismaDTO {
  public static PrismaToEntity(
    typeofmaintenancePrisma: TypeOfMaintenancePrisma,
  ) {
    if (!typeofmaintenancePrisma) return null;

    return new TypeOfMaintenance({
      created_by: typeofmaintenancePrisma.created_by,
      description: typeofmaintenancePrisma.description,
      typeMaintenance:
        typeofmaintenancePrisma.typeMaintenance as TypeMaintenanceProps,
      updated_by: typeofmaintenancePrisma.updated_by,
      created_at: typeofmaintenancePrisma.created_at,
      id: typeofmaintenancePrisma.id,
      updated_at: typeofmaintenancePrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(typeofmaintenance: TypeOfMaintenance) {
    const typeofmaintenancePrisma: Prisma.TypeOfMaintenanceCreateInput = {
      CreatedBy: { connect: { id: typeofmaintenance.created_by } },
      description: typeofmaintenance.description,
      typeMaintenance: typeofmaintenance.typeMaintenance,
      UpdatedBy: { connect: { id: typeofmaintenance.updated_by } },
      created_at: typeofmaintenance.created_at,
      id: typeofmaintenance.id,
      updated_at: typeofmaintenance.updated_at,
    };

    return typeofmaintenancePrisma;
  }

  public static EntityToPrismaUpdate(typeofmaintenance: TypeOfMaintenance) {
    const typeofmaintenanceUptade: Prisma.TypeOfMaintenanceUpdateInput = {
      description: typeofmaintenance.description,
      typeMaintenance: typeofmaintenance.typeMaintenance,
      UpdatedBy: { connect: { id: typeofmaintenance.updated_by } },
      updated_at: typeofmaintenance.updated_at,
    };

    return typeofmaintenanceUptade;
  }
}
