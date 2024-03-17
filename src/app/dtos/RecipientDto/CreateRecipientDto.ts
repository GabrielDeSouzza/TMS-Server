import { type IRecipient } from 'domain/entities/Recipient/Recipient';

import { type CreateLegalPersonDTO } from '../LegalPerson/CreateLegalPersonDto';
import { type CreateNaturalPersonDTO } from '../NaturalPersonDto/CreateNaturalPersonDto';

export abstract class CreateRecipientDTO implements IRecipient {
  legal_person_id?: string;
  natural_person_id?: string;
  NaturalPerson?: CreateNaturalPersonDTO;
  LegalPerson?: CreateLegalPersonDTO;
  created_at?: Date;
  updated_at?: Date;
  created_by: string;
  updated_by: string;
}
