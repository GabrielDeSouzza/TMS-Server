import { type UpdateVehicleDto } from '../VehicleDto/UpdateVehicleDto';

export abstract class UpdateCompanyVehicleDTO {
  carrier_company_id: string;

  vehicle_id?: string;

  created_by: string;

  Vehicle: UpdateVehicleDto;
  updated_by: string;
}
