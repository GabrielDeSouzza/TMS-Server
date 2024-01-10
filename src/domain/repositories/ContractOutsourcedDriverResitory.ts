import { type FindAllContractOutsourcedDriverWhereRequestDTO } from 'domain/dto/repositories/ContractOutsourcedDriverRepositoryDto';
import { type ContractOutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';

export abstract class ContractOutsourcedDriverRepository {
  abstract findAllContracOutsourcedDriver(
    parameters: FindAllContractOutsourcedDriverWhereRequestDTO,
  ): Promise<ContractOutsourcedDriver[]>;
}
