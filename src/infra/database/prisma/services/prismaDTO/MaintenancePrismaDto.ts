import {
  type Prisma,
  type Maintenance as MaintenancePrisma,
} from '@prisma/client';

import { Maintenance } from 'domain/entities/MaintenceEntities/Maintenance/Maintenance';

export class MaintenancePrismaDTO {
  public static PrismaToEntity(maintenancePrisma: MaintenancePrisma) {
    if (!maintenancePrisma) return null;

    return new Maintenance({
      created_by: maintenancePrisma.created_by,
      updated_by: maintenancePrisma.updated_by,
      id: maintenancePrisma.id,
      created_at: maintenancePrisma.created_at,
      maintenance_company_id: maintenancePrisma.maintenance_company_id,
      type_of_maintenance_id: maintenancePrisma.type_of_maintenance_id,
      vehicle_id: maintenancePrisma.vehicle_id,
      updated_at: maintenancePrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(maintenance: Maintenance) {
    const maintenancePrisma: Prisma.MaintenanceCreateInput = {
      CreatedBy: { connect: { id: maintenance.created_by } },
      TypeOfMaintenance: {
        connect: { id: maintenance.type_of_maintenance_id },
      },
      MaintenanceCompany: {
        connect: { id: maintenance.maintenance_company_id },
      },
      UpdatedBy: { connect: { id: maintenance.updated_by } },
      created_at: maintenance.created_at,
      id: maintenance.id,
      updated_at: maintenance.updated_at,
      Vehicle: { connect: { id: maintenance.vehicle_id } },
    };

    return maintenancePrisma;
  }

  public static EntityToPrismaUpdate(maintenance: Maintenance) {
    const maintenanceUptade: Prisma.MaintenanceUpdateInput = {
      UpdatedBy: { connect: { id: maintenance.updated_by } },
      updated_at: maintenance.updated_at,
      finished_at: maintenance.finished_at,
      MaintenanceCompany: maintenance.maintenance_company_id
        ? {
            connect: { id: maintenance.maintenance_company_id },
          }
        : undefined,
      TypeOfMaintenance: maintenance.type_of_maintenance_id
        ? {
            connect: { id: maintenance.type_of_maintenance_id },
          }
        : undefined,
    };

    return maintenanceUptade;
  }
}
