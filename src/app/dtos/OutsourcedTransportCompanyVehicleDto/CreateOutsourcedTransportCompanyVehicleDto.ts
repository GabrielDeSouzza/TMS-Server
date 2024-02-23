import { type CreateVehicleDto } from '../VehicleDto/CreateVehicleDto';

export abstract class CreateOutsourcedTransportCompanyVehicle {
  outsourced_company_id: string;

  Vehicle: CreateVehicleDto;

  created_by: string;

  updated_by: string;
}
