import { type FindAllContractOutsourcedDriverWhereRequestDTO } from 'domain/dto/repositories/whereDtos/ContractOutsourcedDriverRepositoryDto';
import { type ContractOutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';

export abstract class ContractOutsourcedDriverRepository {
  abstract getContractOutsourcedDriver(
    id?: string,
    contractNumber?: string,
  ): Promise<ContractOutsourcedDriver>;
  abstract findAllContracOutsourcedDriver(
    parameters: FindAllContractOutsourcedDriverWhereRequestDTO,
  ): Promise<ContractOutsourcedDriver[]>;
  abstract createContractOutsourcedDriver(
    contract: ContractOutsourcedDriver,
  ): Promise<ContractOutsourcedDriver>;
  abstract updateContractOutsourcedDriver(
    id: string,
    contract: ContractOutsourcedDriver,
  ): Promise<ContractOutsourcedDriver>;
}
