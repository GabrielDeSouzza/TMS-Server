import { type GetMaintenanceCompanyDTO } from 'domain/dto/repositories/getDataDtos/GetMaintenanceCompanyDto';
import {
  type CountMaintenanceCompanyRequestDTO,
  type FindAllMaintenanceCompanyWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/MaintenanceCompanyRepositoryDto';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type MaintenanceCompany } from 'domain/entities/MaintenceEntities/MaintenanceCompany/MaintenanceCompany';

export abstract class MaintenanceCompanyRepository {
  abstract countMaintenanceCompany(
    request: CountMaintenanceCompanyRequestDTO,
  ): Promise<number>;
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
  abstract updateManyMaintenanceCompany(
    data: MaintenanceCompanyUpdateDTO[],
  ): Promise<MaintenanceCompany[]>;
  abstract deleteMaintenanceCompany(id: string): Promise<MaintenanceCompany>;
  abstract deleteManyMaintenanceCompany(
    ids: string[],
  ): Promise<MaintenanceCompany[]>;
}

export abstract class MaintenanceCompanyUpdateDTO {
  maintenanceCompany: MaintenanceCompany;
  legalPerson: LegalPerson;
}
