import { type Prisma, type Icms as IcmsPrisma } from '@prisma/client';

import { Icms } from 'domain/entities/ICMSEntity/Icms';

export class IcmsPrismaDTO {
  public static PrismaToEntity(icmsPrisma: IcmsPrisma) {
    if (!icmsPrisma) return null;

    return new Icms({
      aliquot: icmsPrisma.aliquot,
      created_by: icmsPrisma.created_by,
      effective_date: icmsPrisma.effective_date,
      recipient_state: icmsPrisma.recipient_state,
      state_origin: icmsPrisma.state_orgin,
      updated_by: icmsPrisma.updated_by,
      created_at: icmsPrisma.created_at,
      id: icmsPrisma.id,
      updated_at: icmsPrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(icms: Icms) {
    const icmsPrisma: Prisma.IcmsCreateInput = {
      aliquot: icms.aliquot,
      CreatedBy: { connect: { id: icms.created_by } },
      effective_date: icms.effective_date,
      recipient_state: icms.recipient_state,
      state_orgin: icms.state_origin,
      UpdatedBy: { connect: { id: icms.updated_by } },
      created_at: icms.created_at,
      id: icms.id,
      updated_at: icms.updated_at,
    };

    return icmsPrisma;
  }

  public static EntityToPrismaUpdate(icms: Icms) {
    const icmsUptade: Prisma.IcmsUpdateInput = {
      aliquot: icms.aliquot,
      effective_date: icms.effective_date,
      recipient_state: icms.recipient_state,
      state_orgin: icms.state_origin,
      UpdatedBy: { connect: { id: icms.updated_by } },
      updated_at: icms.updated_at,
    };

    return icmsUptade;
  }
}
