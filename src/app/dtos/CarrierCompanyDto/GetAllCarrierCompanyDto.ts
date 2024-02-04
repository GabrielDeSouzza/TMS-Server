import {
  type SortByCarrierCompanyTypeDTO,
  type WhereCarrierCompanyTypeDto,
} from 'domain/dto/repositories/whereDtos/CarrierRepositoryDto';

export abstract class FindAllCompaniesUseCaseRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByCarrierCompanyTypeDTO;
  where?: WhereCarrierCompanyTypeDto;
}
