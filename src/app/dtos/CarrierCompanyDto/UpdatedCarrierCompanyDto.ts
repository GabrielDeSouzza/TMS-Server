import { type UpdateLegalPersonDTO } from '../LegalPerson/UpdateLegalPersonDto';

export abstract class UpdateCarrierCompanyDTO {
  id?: string;
  rntrc?: string;
  updated_by: string;
  legalPersonId?: string;
  LegalPerson?: UpdateLegalPersonDTO;
}
