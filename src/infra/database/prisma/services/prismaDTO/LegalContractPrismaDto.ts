import {
  type Prisma,
  type LegalContract as LegalContractPrisma,
} from '@prisma/client';

import { LegalContract } from 'domain/entities/LegalClientEntities/LegalContract/LegalContract';

export class LegalContractPrismaDTO {
  public static PrismaToEntity(legalContractPrisma: LegalContractPrisma) {
    if (!legalContractPrisma) return null;

    return new LegalContract({
      carrier_company_id: legalContractPrisma.carrier_company_id,
      delivery_conditions: legalContractPrisma.delivery_conditions,
      effective_date: legalContractPrisma.effective_date,
      legal_client_id: legalContractPrisma.legal_client_id,
      updated_by: legalContractPrisma.updated_by,
      created_at: legalContractPrisma.created_at,
      created_by: legalContractPrisma.created_by,
      observations: legalContractPrisma.observations,
      id: legalContractPrisma.id,
      updated_at: legalContractPrisma.updated_at,
      contract_number: legalContractPrisma.contract_number,
    });
  }
  public static EntityToCreatePrisma(legalContract: LegalContract) {
    const legalContractPrisma: Prisma.LegalContractCreateInput = {
      CarrierCompany: { connect: { id: legalContract.carrier_company_id } },
      CreatedBy: { connect: { id: legalContract.created_by } },
      delivery_conditions: legalContract.delivery_conditions,
      effective_date: legalContract.effective_date,
      LegalClient: { connect: { id: legalContract.legal_client_id } },
      UpdatedBy: { connect: { id: legalContract.updated_by } },
      created_at: legalContract.created_at,
      observations: legalContract.observations,
      updated_at: legalContract.updated_at,
      contract_number: legalContract.contract_number,
    };

    return legalContractPrisma;
  }

  public static EntityToPrismaUpdate(legalContract: LegalContract) {
    const legalContractUptade: Prisma.LegalContractUpdateInput = {
      CarrierCompany: legalContract.carrier_company_id
        ? { connect: { id: legalContract.carrier_company_id } }
        : undefined,
      delivery_conditions: legalContract.delivery_conditions,
      effective_date: legalContract.effective_date,
      LegalClient: legalContract.legal_client_id
        ? { connect: { id: legalContract.legal_client_id } }
        : undefined,
      UpdatedBy: { connect: { id: legalContract.updated_by } },
      observations: legalContract.observations,
      updated_at: legalContract.updated_at,
    };

    return legalContractUptade;
  }
}
