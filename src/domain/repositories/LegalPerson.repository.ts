import {
  type ValidateLegalPersonDTO,
  type FindAllLegalPersonWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/LegalPersonRepository';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';

export abstract class LegalPersonRepository {
  abstract findlegalpersonById(id: string): Promise<LegalPerson>;

  abstract getAllLegalPerson(
    parameters: FindAllLegalPersonWhereRequestDTO,
  ): Promise<LegalPerson[]>;
  abstract ValideLegalPerson(
    data: ValidateLegalPersonDTO,
  ): Promise<LegalPerson | null>;
}
