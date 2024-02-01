import {
  type SortByLegalClientTypeDTO,
  type WhereLegalClientTypeDTO,
} from 'domain/dto/repositories/LegalClientRepositoryDto';

export abstract class GetAllLegalClientDTO {
  limit: number;
  offset: number;
  sort?: SortByLegalClientTypeDTO;
  where?: WhereLegalClientTypeDTO;
}
