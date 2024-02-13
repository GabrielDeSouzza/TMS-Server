import {
  type SortByOutsourcedDriverTypeDTO,
  type WhereOutsourcedDriverTypeDTO,
} from 'domain/dto/repositories/whereDtos/OutsourcedDriverRepositoryDto';

export abstract class GetAllOutsourcedDriverDTO {
  limit: number;
  offset: number;
  sort?: SortByOutsourcedDriverTypeDTO;
  where?: WhereOutsourcedDriverTypeDTO;
}
