import { type CreateLegalPersonDTO } from '../LegalPerson/CreateLegalPersonDto';

export abstract class CreateLegalClientDTO {
  legal_person_id?: string;

  branch: string;

  LegalPerson?: CreateLegalPersonDTO;

  updated_by: string;

  created_by?: string;
}
