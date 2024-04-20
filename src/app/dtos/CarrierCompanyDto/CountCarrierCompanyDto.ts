import { type WhereCarrierCompanyTypeDto } from 'domain/dto/repositories/whereDtos/CarrierRepositoryDto';

export abstract class CountAllCarrierCompaniesWhereRequestDTO {
  where?: WhereCarrierCompanyTypeDto;
}
