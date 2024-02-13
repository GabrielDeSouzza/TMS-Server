import { type CreateVehicleDto } from '../VehicleDto/CreateVehicleDto';

export abstract class CreateOutsourcedVehicleDTO {
  vehicle_id?: string;

  Vehicle?: CreateVehicleDto;

  created_by: string;

  updated_by: string;
}
