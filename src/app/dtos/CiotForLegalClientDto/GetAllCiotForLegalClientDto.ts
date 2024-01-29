import {
  type SortByCiotForLegalClientTypeDTO,
  type WhereCiotForLegalClientTypeDTO,
} from 'domain/dto/repositories/CiotForLegalPersonRepositoryDto';

export abstract class getAllCiotForLegalClientDTO {
  limit: number;
  offset: number;
  where?: WhereCiotForLegalClientTypeDTO;
  sort?: SortByCiotForLegalClientTypeDTO;
}
