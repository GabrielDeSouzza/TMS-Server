export abstract class UpdateIcmsDTO {
  updated_by?: string;

  state_origin?: string;

  recipient_state?: string;

  aliquot?: number;

  effective_date?: Date;
}
