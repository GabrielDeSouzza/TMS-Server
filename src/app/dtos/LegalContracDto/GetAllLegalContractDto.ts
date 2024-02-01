import {
  type SortByLegalContractTypeDTO,
  type WhereLegalContractTypeDTO,
} from 'domain/dto/repositories/LegalContractRepositoryDto';

export abstract class GetAllLegalContractDTO {
  limit: number;
  offset: number;
  sort?: SortByLegalContractTypeDTO;
  where?: WhereLegalContractTypeDTO;
}
