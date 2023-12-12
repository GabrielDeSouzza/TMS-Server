import { type OutsourcedTransportCompanyContract } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyContract/OutsourcedTransportCompanyContract';

export abstract class OutsourcedTransportCompanyContractRepository {
  abstract findOutsourcedTransportCompanyContractById(
    id: string,
  ): Promise<OutsourcedTransportCompanyContract>;
  abstract createOutsourcedTransportCompanyContract(
    outsourcedTransportCompanyContract: OutsourcedTransportCompanyContract,
  ): Promise<OutsourcedTransportCompanyContract>;
  abstract updateOutsourcedTransportCompanyContract(
    id: string,
    outsourcedTransportCompanyContract: OutsourcedTransportCompanyContract,
  ): Promise<OutsourcedTransportCompanyContract>;
  abstract getAllOutsourcedTransportCompanyContract(): Promise<
    OutsourcedTransportCompanyContract[]
  >;
}
