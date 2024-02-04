import {
  type WhereCompanyVehicleTypeDto,
  type SortByCompanyVehicleTypeDto,
} from 'domain/dto/repositories/whereDtos/CompanyVehicleRepositoryDto';

export abstract class getAllCompanyVehicleTyDTO {
  limit: number;
  offset: number;
  sort?: SortByCompanyVehicleTypeDto;
  where?: WhereCompanyVehicleTypeDto;
}
