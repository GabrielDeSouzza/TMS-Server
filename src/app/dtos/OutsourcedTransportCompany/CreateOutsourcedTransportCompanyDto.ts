import { type CreateLegalPersonDTO } from '../LegalPerson/CreateLegalPersonDto';

export abstract class CreateOutsourcedTransportCompanyDTO {
  LegalPerson?: CreateLegalPersonDTO;

  legalPersonId?: string;

  updated_by: string;

  created_by: string;
}
