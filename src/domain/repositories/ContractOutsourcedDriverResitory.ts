import { type IContractOutsourcedDriver } from 'domain/entities/driverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';

export abstract class ContractOutsourcedDriverRepository {
  abstract findContractOutsourcedDriverById(
    id: string,
  ): Promise<IContractOutsourcedDriver>;
  abstract findAllContracOutsourcedDriverByCpf(
    cpf: string,
  ): Promise<IContractOutsourcedDriver[]>;
  abstract findAllContracOutsourcedDriver(): Promise<
    IContractOutsourcedDriver[]
  >;
  abstract findAllContracOutsourcedDriverByOutsourcedDriverId(
    outsoucedDriverId: string,
  ): Promise<IContractOutsourcedDriver[]>;
}
