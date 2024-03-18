import { type GetLegalPersonDTO } from './GetLegalPersonDto';
import { type GetNaturalPersonDTO } from './GetNaturalPersonDto';

export abstract class GetRecipientDTO {
  id?: string;
  legalPerson?: GetLegalPersonDTO;
  naturalPerson?: GetNaturalPersonDTO;
}
