import { type GetMaintenanceCompanyDTO } from 'domain/dto/repositories/getDataDtos/GetMaintenanceCompanyDto';
import { type FindAllMaintenanceCompanyWhereRequestDTO } from 'domain/dto/repositories/whereDtos/MaintenanceCompanyRepositoryDto';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type MaintenanceCompany } from 'domain/entities/MaintenceEntities/MaintenanceCompany/MaintenanceCompany';

export abstract class MaintenanceCompanyRepository {
  abstract findMaintenanceCompany(
    request: GetMaintenanceCompanyDTO,
  ): Promise<MaintenanceCompany>;
  abstract createMaintenanceCompany(
    maintenanceCompany: MaintenanceCompany,
    legalPerson: LegalPerson,
    idLegalPerson?: string,
  ): Promise<MaintenanceCompany>;
  abstract updateMaintenanceCompany(
    id: string,
    maintenanceCompany?: MaintenanceCompany,
    legalPerson?: LegalPerson,
  ): Promise<MaintenanceCompany>;
  abstract getAllMaintenanceCompany(
    parameters: FindAllMaintenanceCompanyWhereRequestDTO,
  ): Promise<MaintenanceCompany[]>;
}
