export abstract class UpdateVehicleTypeDTO {
  name?: string;

  bodyWork?: boolean;

  updated_by: string;

  body_work_id?: string[];

  del_body_id?: string[];
}
