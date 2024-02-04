import {
  type SortByLegalContractTypeDTO,
  type WhereLegalContractTypeDTO,
} from 'domain/dto/repositories/whereDtos/LegalContractRepositoryDto';

export abstract class GetAllLegalContractDTO {
  limit: number;
  offset: number;
  sort?: SortByLegalContractTypeDTO;
  where?: WhereLegalContractTypeDTO;
}
