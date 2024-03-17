import { type IIcms } from 'domain/entities/ICMSEntity/Icms';

export abstract class CreateIcmsDTO implements IIcms {
  created_by: string;

  updated_by: string;

  state_origin: string;

  recipient_state: string;

  aliquot: number;

  effective_date: Date;
}
