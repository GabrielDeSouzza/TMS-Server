import {
  type SortByCiotForLegalClientTypeDTO,
  type WhereCiotForLegalClientTypeDTO,
} from 'domain/dto/repositories/whereDtos/CiotForLegalPersonRepositoryDto';

export abstract class getAllCiotForLegalClientDTO {
  limit: number;
  offset: number;
  where?: WhereCiotForLegalClientTypeDTO;
  sort?: SortByCiotForLegalClientTypeDTO;
}
