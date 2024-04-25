export abstract class UpdateManyIcmsDTO {
  id: string;

  state_origin?: string;

  recipient_state?: string;

  aliquot?: number;

  effective_date?: Date;
}
