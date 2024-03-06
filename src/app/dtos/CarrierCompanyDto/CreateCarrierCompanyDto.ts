import { type CreateLegalPersonDTO } from '../LegalPerson/CreateLegalPersonDto';

export abstract class CreateCarrierCompanyDTO {
  id?: string;
  rntrc: string;
  updated_by: string;
  created_by: string;
  legalPersonId?: string;
  LegalPerson?: CreateLegalPersonDTO;
}
