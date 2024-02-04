import {
  type WhereContractOutsourcedDriverTypeDTO,
  type SortByContractOutsourcedDriverTypeDTO,
} from 'domain/dto/repositories/whereDtos/ContractOutsourcedDriverRepositoryDto';

export abstract class GetAllContractOutsourcedDriverDTO {
  limit: number;
  offset: number;
  sort?: SortByContractOutsourcedDriverTypeDTO;
  where?: WhereContractOutsourcedDriverTypeDTO;
}
