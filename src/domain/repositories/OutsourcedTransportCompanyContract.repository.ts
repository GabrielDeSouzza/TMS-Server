import { type GetOutsourcedTransportCompanyContractDTO } from 'domain/dto/repositories/getDataDtos/GetOutsourcedTransportCompanyContractDto';
import { type FindAllOutsourcedTransportCompanyContractWhereRequestDTO } from 'domain/dto/repositories/whereDtos/OutsourcedTransportCompanyContractRepositoryDto';
import { type OutsourcedTransportCompanyContract } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyContract/OutsourcedTransportCompanyContract';

export abstract class OutsourcedTransportCompanyContractRepository {
  abstract findOutsourcedTransportCompanyContract(
    request: GetOutsourcedTransportCompanyContractDTO,
  ): Promise<OutsourcedTransportCompanyContract>;
  abstract createOutsourcedTransportCompanyContract(
    outsourcedTransportCompanyContract: OutsourcedTransportCompanyContract,
  ): Promise<OutsourcedTransportCompanyContract>;
  abstract updateOutsourcedTransportCompanyContract(
    id: string,
    outsourcedTransportCompanyContract: OutsourcedTransportCompanyContract,
  ): Promise<OutsourcedTransportCompanyContract>;
  abstract getAllOutsourcedTransportCompanyContract(
    parameters: FindAllOutsourcedTransportCompanyContractWhereRequestDTO,
  ): Promise<OutsourcedTransportCompanyContract[]>;
}
