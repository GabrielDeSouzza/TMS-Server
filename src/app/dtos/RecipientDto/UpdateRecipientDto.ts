import { type UpdateLegalPersonDTO } from '../LegalPerson/UpdateLegalPersonDto';
import { type UpdateNaturalPersonDTO } from '../NaturalPersonDto/UpdateNaturalPersonDto';

export abstract class UpdateRecipientDTO {
  NaturalPerson?: UpdateNaturalPersonDTO;
  LegalPerson?: UpdateLegalPersonDTO;

  updated_by: string;
}
