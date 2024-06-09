import { type GetCompanyVehcicleDTO } from 'domain/dto/repositories/getDataDtos/GetCompanyVehicleDto';
import {
  type CountAllCompanyVehiclesWhereRequestDTO,
  type UpdateManyCompanyVehiclesDTO,
  type FindAllCompanyVehicleWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/CompanyVehicleRepositoryDto';
import { type CompanyVehicle } from 'domain/entities/CompanyEntities/companyVehicle/CompanyVehicle';
import { type Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';

export abstract class CompanyVehicleRepository {
  abstract count(
    parameters: CountAllCompanyVehiclesWhereRequestDTO,
  ): Promise<number>;
  abstract delete(id: string): Promise<CompanyVehicle>;
  abstract updateMany(
    CompanyVehicle: UpdateManyCompanyVehiclesDTO[],
  ): Promise<CompanyVehicle[]>;
  abstract deleteMany(ids: string[]): Promise<CompanyVehicle[]>;
  abstract findCompanyVehicle(
    request: GetCompanyVehcicleDTO,
  ): Promise<CompanyVehicle>;
  abstract createCompanyVehicle(
    CompanyVehicle: CompanyVehicle,
    vehicle: Vehicle,
  ): Promise<CompanyVehicle>;
  abstract updateCompanyVehicle(
    id: string,
    CompanyVehicle: CompanyVehicle,
    vehicle: Vehicle,
  ): Promise<CompanyVehicle>;
  abstract findAllCompanyVehicle(
    parameters: FindAllCompanyVehicleWhereRequestDTO,
  ): Promise<CompanyVehicle[]>;
}
