import { type UpdateLegalPersonDTO } from '../LegalPerson/UpdateLegalPersonDto';

export abstract class UpdateLegalClientDTO {
  branch?: string;

  LegalPerson: UpdateLegalPersonDTO;

  updated_by?: string;
}
