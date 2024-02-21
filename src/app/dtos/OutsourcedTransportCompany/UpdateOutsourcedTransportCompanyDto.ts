import { type UpdateLegalPersonDTO } from '../LegalPerson/UpdateLegalPersonDto';

export abstract class UpdateOutsourcedTransportCompanyDTO {
  LegalPerson?: UpdateLegalPersonDTO;

  legalPersonId?: string;

  updated_by: string;
}
