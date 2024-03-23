import { type UpdateLegalPersonDTO } from '../LegalPerson/UpdateLegalPersonDto';
import { type UpdateNaturalPersonDTO } from '../NaturalPersonDto/UpdateNaturalPersonDto';

export abstract class UpdateSenderDTO {
  NaturalPerson?: UpdateNaturalPersonDTO;
  LegalPerson?: UpdateLegalPersonDTO;

  updated_by: string;
}
