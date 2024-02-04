import {
  type SortByLegalClientTypeDTO,
  type WhereLegalClientTypeDTO,
} from 'domain/dto/repositories/whereDtos/LegalClientRepositoryDto';

export abstract class GetAllLegalClientDTO {
  limit: number;
  offset: number;
  sort?: SortByLegalClientTypeDTO;
  where?: WhereLegalClientTypeDTO;
}
