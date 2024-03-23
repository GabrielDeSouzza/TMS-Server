import { type GetSenderDTO } from 'domain/dto/repositories/getDataDtos/GetSendertDto';
import { type FindAllSenderWhereRequestDTO } from 'domain/dto/repositories/whereDtos/SenderRepositoryDto';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type Sender } from 'domain/entities/Sender/Sender';

export abstract class SenderRepository {
  abstract findSender(request: GetSenderDTO): Promise<Sender>;
  abstract findAllSender(
    parameters: FindAllSenderWhereRequestDTO,
  ): Promise<Sender[]>;
  abstract createSender(
    contract: Sender,
    legalPerson?: LegalPerson,
    naturalPerson?: NaturalPerson,
  ): Promise<Sender>;
  abstract updateSender(
    id: string,
    sender: Sender,
    legalPerson?: LegalPerson,
    naturalPerson?: NaturalPerson,
  ): Promise<Sender>;
}
