import { type CompanyVehicle } from 'domain/entities/vehicle/companyVehicle/CompanyVehicle';
import { type Vehicle } from 'domain/entities/vehicle/vehicle/Vehicle';

export abstract class CompanyVehicleRepository {
  abstract findCompanyVehicle(id: string): Promise<CompanyVehicle>;
  abstract createCompanyVehicle(
    CompanyVehicle: CompanyVehicle,
    vehicle: Vehicle,
  ): Promise<CompanyVehicle>;
  abstract updateCompanyVehicle(
    id: string,
    CompanyVehicle: CompanyVehicle,
    vehicle: Vehicle,
  ): Promise<CompanyVehicle>;
  abstract findAllCompanyVehicle(): Promise<CompanyVehicle[]>;
}
