import { type GetMaintenanceDTO } from 'domain/dto/repositories/getDataDtos/GetMaintenancetDto';
import { type FindAllMaintenanceWhereRequestDTO } from 'domain/dto/repositories/whereDtos/MaintenanceRepositoryDto';
import { type Maintenance } from 'domain/entities/MaintenceEntities/Maintenance/Maintenance';

export abstract class MaintenanceRepository {
  abstract findMaintenance(request: GetMaintenanceDTO): Promise<Maintenance>;
  abstract findAllMaintenance(
    parameters: FindAllMaintenanceWhereRequestDTO,
  ): Promise<Maintenance[]>;
  abstract createMaintenance(maintenance: Maintenance): Promise<Maintenance>;
  abstract updateMaintenance(
    id: string,
    maintenance: Maintenance,
  ): Promise<Maintenance>;
}
