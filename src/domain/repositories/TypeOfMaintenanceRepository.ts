import { type GetTypeOfMaintenanceDTO } from 'domain/dto/repositories/getDataDtos/GetTypeOfMaintenanceDto';
import { type FindAllTypeOfMaintenanceWhereRequestDTO } from 'domain/dto/repositories/whereDtos/TypeOfMaintenanceRepositoryDto';
import { type TypeOfMaintenance } from 'domain/entities/MaintenceEntities/TypeOfMaintenance/TypeOfMaintenance';

export abstract class TypeOfMaintenanceRepository {
  abstract findTypeOfMaintenance(
    request: GetTypeOfMaintenanceDTO,
  ): Promise<TypeOfMaintenance>;
  abstract findAllTypeOfMaintenance(
    parameters: FindAllTypeOfMaintenanceWhereRequestDTO,
  ): Promise<TypeOfMaintenance[]>;
  abstract createTypeOfMaintenance(
    typeofMaintenance: TypeOfMaintenance,
  ): Promise<TypeOfMaintenance>;
  abstract updateTypeOfMaintenance(
    id: string,
    typeofMaintenance: TypeOfMaintenance,
  ): Promise<TypeOfMaintenance>;
}
