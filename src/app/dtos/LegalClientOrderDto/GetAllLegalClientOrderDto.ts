import {
  type SortByLegalClientOrderTypeDTO,
  type WhereLegalClientOrderTypeDTO,
} from 'domain/dto/repositories/LegalClientOrderRepositoryDto';

export abstract class GetAllLegalClientOrderDTO {
  limit: number;
  offset: number;
  sort?: SortByLegalClientOrderTypeDTO;
  where?: WhereLegalClientOrderTypeDTO;
}
