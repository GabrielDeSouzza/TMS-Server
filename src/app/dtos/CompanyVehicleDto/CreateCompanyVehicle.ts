import { type CreateVehicleDto } from '../VehicleDto/CreateVehicleDto';

export abstract class CreateCompanyVehcicleDTO {
  carrier_company_id: string;

  vehicle_id?: string;

  Vehicle?: CreateVehicleDto;

  created_by: string;

  updated_by: string;
}
