import {
  type WhereContractOutsourcedDriverTypeDTO,
  type SortByContractOutsourcedDriverTypeDTO,
} from 'domain/dto/repositories/ContractOutsourcedDriverRepositoryDto';

export abstract class GetAllContractOutsourcedDriverDTO {
  limit: number;
  offset: number;
  sort?: SortByContractOutsourcedDriverTypeDTO;
  where?: WhereContractOutsourcedDriverTypeDTO;
}
