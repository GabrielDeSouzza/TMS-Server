import { type ISender } from 'domain/entities/Sender/Sender';

import { type CreateLegalPersonDTO } from '../LegalPerson/CreateLegalPersonDto';
import { type CreateNaturalPersonDTO } from '../NaturalPersonDto/CreateNaturalPersonDto';

export abstract class CreateSenderDTO implements ISender {
  legal_person_id?: string;
  natural_person_id?: string;
  NaturalPerson?: CreateNaturalPersonDTO;
  LegalPerson?: CreateLegalPersonDTO;
  created_at?: Date;
  updated_at?: Date;
  created_by: string;
  updated_by: string;
}
