import { type GetMaintenanceDTO } from 'domain/dto/repositories/getDataDtos/GetMaintenancetDto';
import {
  type CountMaintenanceRequestDTO,
  type FindAllMaintenanceWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/MaintenanceRepositoryDto';
import { type Maintenance } from 'domain/entities/MaintenceEntities/Maintenance/Maintenance';

export abstract class MaintenanceRepository {
  abstract countMaintenance(
    request: CountMaintenanceRequestDTO,
  ): Promise<number>;
  abstract findMaintenance(request: GetMaintenanceDTO): Promise<Maintenance>;
  abstract findAllMaintenance(
    parameters: FindAllMaintenanceWhereRequestDTO,
  ): Promise<Maintenance[]>;
  abstract createMaintenance(maintenance: Maintenance): Promise<Maintenance>;
  abstract updateMaintenance(
    id: string,
    maintenance: Maintenance,
  ): Promise<Maintenance>;
  abstract updateManyMaintenance(data: Maintenance[]): Promise<Maintenance[]>;
  abstract deleteMaintenance(id: string): Promise<Maintenance>;
  abstract deleteManyMaintenance(ids: string[]): Promise<Maintenance[]>;
}
