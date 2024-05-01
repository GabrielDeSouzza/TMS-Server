import { type UpdateLegalPersonDTO } from '../LegalPerson/UpdateLegalPersonDto';
import { type UpdateNaturalPersonDTO } from '../NaturalPersonDto/UpdateNaturalPersonDto';

export abstract class UpdateManySendersDto {
  id: string;
  NaturalPerson?: UpdateNaturalPersonDTO;
  LegalPerson?: UpdateLegalPersonDTO;
  updated_by?: string;
  legal_person_id?: string;
  natural_person_id?: string;
  created_by?: string;
}
