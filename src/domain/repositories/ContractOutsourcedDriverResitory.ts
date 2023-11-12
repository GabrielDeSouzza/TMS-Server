import { type ContractOutsourcedDriver } from 'domain/entities/driverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';

export abstract class ContractOutsourcedDriverRepository {
  abstract findContractOutsourcedDriverById(
    id: string,
  ): Promise<ContractOutsourcedDriver>;
  abstract findAllContracOutsourcedDriverByCpf(
    cpf: string,
  ): Promise<ContractOutsourcedDriver[]>;
  abstract findAllContracOutsourcedDriver(): Promise<
    ContractOutsourcedDriver[]
  >;
  abstract findAllContracOutsourcedDriverByOutsourcedDriverId(
    outsoucedDriverId: string,
  ): Promise<ContractOutsourcedDriver[]>;
}
