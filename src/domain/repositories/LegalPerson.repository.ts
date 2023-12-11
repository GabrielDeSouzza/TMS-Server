import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';

export abstract class LegalPersonRepository {
  abstract findlegalpersonById(id: string): Promise<LegalPerson>;

  abstract getAllLegalPerson(): Promise<LegalPerson[]>;
}
