import { type UpdateVehicleDto } from '../VehicleDto/UpdateVehicleDto';

export abstract class UpdateCompanyVehcicleDTO {
  carrier_company_id?: string;

  Vehicle?: UpdateVehicleDto;

  updated_by: string;
}
