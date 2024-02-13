import { type UpdateVehicleDto } from '../VehicleDto/UpdateVehicleDto';

export abstract class UpdateOutsourcedVehicleDTO {
  vehicle_id?: string;

  Vehicle?: UpdateVehicleDto;

  updated_by?: string;
}
