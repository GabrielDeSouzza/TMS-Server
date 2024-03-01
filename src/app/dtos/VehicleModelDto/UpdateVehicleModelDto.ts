export abstract class UpdateVehicleModelDTO {
  name?: string;

  weight?: number;

  capacity_max?: number;

  axles?: number;

  capacity_per_axle?: number;

  brand_id?: string;

  type_id?: string;

  updated_by: string;
}
