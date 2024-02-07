import { type GetLegalClientDTO } from 'domain/dto/repositories/getDataDtos/GetLegalClientDto';
import {
  type ValidateLegalPersonDTO,
  type FindAllLegalPersonWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/LegalPersonRepository';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';

export abstract class LegalPersonRepository {
  abstract findlegalperson(request: GetLegalClientDTO): Promise<LegalPerson>;

  abstract getAllLegalPerson(
    parameters: FindAllLegalPersonWhereRequestDTO,
  ): Promise<LegalPerson[]>;
  abstract ValideLegalPerson(
    data: ValidateLegalPersonDTO,
  ): Promise<LegalPerson | null>;
}
