import {
  type SortByOutsourcedTransportCompanyTypeDTO,
  type WhereOutsourcedTransportCompanyTypeDTO,
} from 'domain/dto/repositories/whereDtos/OutsourcedTransportCompanyRepositoryDto';

export abstract class GetAllOutsourcedTransportCompanyDTO {
  limit: number;
  offset: number;
  sort?: SortByOutsourcedTransportCompanyTypeDTO;
  where?: WhereOutsourcedTransportCompanyTypeDTO;
}
