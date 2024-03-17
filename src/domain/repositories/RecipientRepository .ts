import { type GetRecipientDTO } from 'domain/dto/repositories/getDataDtos/GetRecipientDto';
import { type FindAllRecipientWhereRequestDTO } from 'domain/dto/repositories/whereDtos/RecipientRepositoryDto';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type Recipient } from 'domain/entities/Recipient/Recipient';

export abstract class RecipientRepository {
  abstract findRecipient(request: GetRecipientDTO): Promise<Recipient>;
  abstract findAllRecipient(
    parameters: FindAllRecipientWhereRequestDTO,
  ): Promise<Recipient[]>;
  abstract createRecipient(
    contract: Recipient,
    legalPerson?: LegalPerson,
    naturalPerson?: NaturalPerson,
  ): Promise<Recipient>;
  abstract updateRecipient(
    id: string,
    recipient: Recipient,
    legalPerson?: LegalPerson,
    naturalPerson?: NaturalPerson,
  ): Promise<Recipient>;
}
