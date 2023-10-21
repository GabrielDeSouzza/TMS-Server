import {
  type CompanyVehicle,
  type ICompanyVehicle,
} from 'domain/entities/vehicle/companyVehicle/CompanyVehicle';
import { type IVehicle } from 'domain/entities/vehicle/vehicle/Vehicle';

export abstract class CompanyVehicleRepository {
  abstract findCompanyVehicle(id: string): Promise<CompanyVehicle>;
  abstract createCompanyVehicle(
    CompanyVehicle: Omit<ICompanyVehicle, 'id' | 'created_at' | 'updated_at'>,
    vehicle: IVehicle,
  ): Promise<CompanyVehicle>;
  abstract updateCompanyVehicle(
    id: string,
    CompanyVehicle: Partial<CompanyVehicle>,
    vehicle: Partial<IVehicle>,
  ): Promise<CompanyVehicle>;
  abstract findAllCompanyVehicle(): Promise<CompanyVehicle[]>;
}
