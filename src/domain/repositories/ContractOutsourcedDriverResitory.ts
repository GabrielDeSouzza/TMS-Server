import { type GetContractOutsourcedDriverDTO } from 'domain/dto/repositories/getDataDtos/GetContractOutsourcedDriverDto';
import {
  type CountAllContractOutsourcedDriverWhereRequestDTO,
  type FindAllContractOutsourcedDriverWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/ContractOutsourcedDriverRepositoryDto';
import { type ContractOutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';

export abstract class ContractOutsourcedDriverRepository {
  abstract countContractOutsourcedDriver(
    request: CountAllContractOutsourcedDriverWhereRequestDTO,
  ): Promise<number>;
  abstract getContractOutsourcedDriver(
    request: GetContractOutsourcedDriverDTO,
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

  abstract updateManyContractOutsourcedDriver(
    data: ContractOutsourcedDriver[],
  ): Promise<ContractOutsourcedDriver[]>;

  abstract deleteContractOutsourcedDriver(
    id: string,
  ): Promise<ContractOutsourcedDriver>;
  abstract deleteManyContractOutsourcedDriver(
    ids: string[],
  ): Promise<ContractOutsourcedDriver[]>;
}
