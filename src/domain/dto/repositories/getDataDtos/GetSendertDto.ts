import { type GetLegalPersonDTO } from './GetLegalPersonDto';
import { type GetNaturalPersonDTO } from './GetNaturalPersonDto';

export abstract class GetSenderDTO {
  id?: string;
  legalPerson?: GetLegalPersonDTO;
  naturalPerson?: GetNaturalPersonDTO;
}
