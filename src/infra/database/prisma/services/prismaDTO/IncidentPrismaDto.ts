import { type Prisma, type Incident as IncidentPrisma } from '@prisma/client';

import { Incident } from 'domain/entities/OrdersEntities/IncidentEntity/Incident';

export class IncidentPrismaDTO {
  public static PrismaToEntity(incidentPrisma: IncidentPrisma) {
    if (!incidentPrisma) return null;

    return new Incident({
      created_by: incidentPrisma.created_by,
      date_incident: incidentPrisma.date_incident,
      date_resolved: incidentPrisma.date_resolved,
      description: incidentPrisma.description,
      order_process_id: incidentPrisma.order_process_id,
      updated_by: incidentPrisma.updated_by,
      created_at: incidentPrisma.created_at,
      updated_at: incidentPrisma.updated_at,
      id: incidentPrisma.id,
    });
  }
  public static EntityToCreatePrisma(incident: Incident) {
    const incidentPrisma: Prisma.IncidentCreateInput = {
      created_at: incident.created_at,
      CreatedBy: { connect: { id: incident.created_by } },
      date_incident: incident.date_incident,
      description: incident.description,
      OrderProcess: { connect: { id: incident.order_process_id } },
      updated_at: incident.updated_at,
      date_resolved: incident.date_resolved,
      id: incident.id,
      UpdatedBy: { connect: { id: incident.updated_by } },
    };

    return incidentPrisma;
  }

  public static EntityToPrismaUpdate(incident: Incident) {
    const incidentUptade: Prisma.IncidentUpdateInput = {
      date_incident: incident.date_incident,
      description: incident.description,
      OrderProcess: incident.order_process_id
        ? { connect: { id: incident.order_process_id } }
        : undefined,
      updated_at: incident.updated_at,
      date_resolved: incident.date_resolved,

      UpdatedBy: { connect: { id: incident.updated_by } },
    };

    return incidentUptade;
  }
}
