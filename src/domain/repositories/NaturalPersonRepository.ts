import { type GetNaturalPersonDTO } from 'domain/dto/repositories/getDataDtos/GetNaturalPersonDto';
import {
  type ValidateNaturalPersonDto,
  type FindAllNaturalPersonWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/NaturalPersonRepositoryDto';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';

export abstract class NaturalPersonRepository {
  abstract findNaturalPerson(
    request: GetNaturalPersonDTO,
  ): Promise<NaturalPerson>;
  abstract createNaturalPerson(
    naturalPerson: NaturalPerson,
  ): Promise<NaturalPerson>;
  abstract updateNaturalPerson(
    id: string,
    naturalPerson: NaturalPerson,
  ): Promise<NaturalPerson>;
  abstract getAllNaturalPerson(
    parameters: FindAllNaturalPersonWhereRequestDTO,
  ): Promise<NaturalPerson[]>;
  abstract validate(data: ValidateNaturalPersonDto): Promise<NaturalPerson>;
}
