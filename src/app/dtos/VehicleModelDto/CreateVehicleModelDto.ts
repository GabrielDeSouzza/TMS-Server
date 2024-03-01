export abstract class CreateVehicleModelDTO {
  name: string;

  weight: number;

  capacity_max: number;

  axles: number;

  capacity_per_axle?: number;

  brand_id: string;

  type_id: string;

  created_by: string;

  updated_by: string;
}
