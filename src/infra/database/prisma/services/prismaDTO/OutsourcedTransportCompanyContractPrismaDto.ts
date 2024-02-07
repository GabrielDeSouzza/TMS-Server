import {
  type Prisma,
  type OutsourcedTransportCompanyContract as OutsourcedTransportCompanyContractPrisma,
} from '@prisma/client';

import { OutsourcedTransportCompanyContract } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyContract/OutsourcedTransportCompanyContract';

export class OutsourcedTransportCompanyContractPrismaDTO {
  public static PrismaToEntity(
    outsourcedTransportCompanyContractPrisma: OutsourcedTransportCompanyContractPrisma,
  ) {
    return new OutsourcedTransportCompanyContract({
      carrierCompanyId:
        outsourcedTransportCompanyContractPrisma.carrier_company_id,
      legalClientOrderId:
        outsourcedTransportCompanyContractPrisma.legal_client_order_id,
      outSourcedTransportCompanyId:
        outsourcedTransportCompanyContractPrisma.outsourced_transport_company_id,
      created_by: outsourcedTransportCompanyContractPrisma.created_by,
      updated_by: outsourcedTransportCompanyContractPrisma.updated_by,
      created_at: outsourcedTransportCompanyContractPrisma.created_at,
      id: outsourcedTransportCompanyContractPrisma.id,
      updated_at: outsourcedTransportCompanyContractPrisma.updated_at,
      contractNumber: outsourcedTransportCompanyContractPrisma.contract_number,
    });
  }
  public static EntityToCreatePrisma(
    outsourcedTransportCompanyContract: OutsourcedTransportCompanyContract,
  ) {
    const outsourcedTransportCompanyContractPrisma: Prisma.OutsourcedTransportCompanyContractCreateInput =
      {
        contract_number: outsourcedTransportCompanyContract.contractNumber,
        CarrierCompany: {
          connect: { id: outsourcedTransportCompanyContract.carrierCompanyId },
        },
        LegalClientOrder: {
          connect: {
            id: outsourcedTransportCompanyContract.legalClientOrderId,
          },
        },
        OutsourcedTransportCompany: {
          connect: {
            id: outsourcedTransportCompanyContract.outSourcedTransportCompanyId,
          },
        },
        UpdatedBy: {
          connect: { id: outsourcedTransportCompanyContract.updated_by },
        },
        created_at: outsourcedTransportCompanyContract.created_at,
        CreatedBy: {
          connect: { id: outsourcedTransportCompanyContract.created_by },
        },
        updated_at: outsourcedTransportCompanyContract.updated_at,
        id: outsourcedTransportCompanyContract.id,
      };

    return outsourcedTransportCompanyContractPrisma;
  }

  public static EntityToPrismaUpdate(
    outsourcedTransportCompanyContract: OutsourcedTransportCompanyContract,
  ) {
    const outsourcedTransportCompanyContractUptade: Prisma.OutsourcedTransportCompanyContractUpdateInput =
      {
        contract_number: outsourcedTransportCompanyContract.contractNumber,
        CarrierCompany: outsourcedTransportCompanyContract.carrierCompanyId
          ? {
              connect: {
                id: outsourcedTransportCompanyContract.carrierCompanyId,
              },
            }
          : undefined,
        LegalClientOrder: outsourcedTransportCompanyContract.legalClientOrderId
          ? {
              connect: {
                id: outsourcedTransportCompanyContract.legalClientOrderId,
              },
            }
          : undefined,
        OutsourcedTransportCompany:
          outsourcedTransportCompanyContract.outSourcedTransportCompanyId
            ? {
                connect: {
                  id: outsourcedTransportCompanyContract.outSourcedTransportCompanyId,
                },
              }
            : undefined,
        UpdatedBy: {
          connect: { id: outsourcedTransportCompanyContract.updated_by },
        },
        updated_at: outsourcedTransportCompanyContract.updated_at,
      };

    return outsourcedTransportCompanyContractUptade;
  }
}
