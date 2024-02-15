import {
  type SortByOwnDriverTypeDTO,
  type WhereOwnDriverTypeDTO,
} from 'domain/dto/repositories/whereDtos/OwnDriverRepositoryDto';

export abstract class GetAllOwnDriverDTO {
  limit: number;
  offset: number;
  sort?: SortByOwnDriverTypeDTO;
  where?: WhereOwnDriverTypeDTO;
}
