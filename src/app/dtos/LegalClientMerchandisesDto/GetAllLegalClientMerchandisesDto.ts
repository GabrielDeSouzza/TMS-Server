import {
  type SortByLegalClientMerchandiseTypeDTO,
  type WhereLegalClientMerchandiseTypeDTO,
} from 'domain/dto/repositories/LegalClientMerchandiseRepositoryDto';

export abstract class GetAllLegalClientMerchandisesDTO {
  limit: number;
  offset: number;
  sort?: SortByLegalClientMerchandiseTypeDTO;
  where?: WhereLegalClientMerchandiseTypeDTO;
}
