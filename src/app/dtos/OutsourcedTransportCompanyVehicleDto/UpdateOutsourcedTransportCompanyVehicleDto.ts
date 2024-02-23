import { type UpdateVehicleDto } from '../VehicleDto/UpdateVehicleDto';

export abstract class UpdateOutsourcedTransportCompanyVehicleDTO {
  outsourced_company_id?: string;

  Vehicle?: UpdateVehicleDto;

  updated_by: string;
}
