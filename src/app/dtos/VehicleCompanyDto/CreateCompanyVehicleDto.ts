import { type CreateVehicleDto } from '../VehicleDto/CreateVehicleDto';

export abstract class CreateCompanyVehicleDTO {
  carrier_company_id: string;

  vehicle_id?: string;

  created_by: string;

  Vehicle: CreateVehicleDto;
  updated_by: string;
}
