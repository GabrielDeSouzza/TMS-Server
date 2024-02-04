import {
  type SortByNaturalPersonTypeDTO,
  type WhereNaturalPersonTypeDTO,
} from 'domain/dto/repositories/whereDtos/NaturalPersonRepositoryDto';

export abstract class GetAllNaturalPersonDTO {
  limit: number;
  offset: number;
  sort?: SortByNaturalPersonTypeDTO;
  where?: WhereNaturalPersonTypeDTO;
}
