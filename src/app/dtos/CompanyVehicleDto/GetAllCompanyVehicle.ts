import {
  type SortByCompanyVehicleTypeDto,
  type WhereCompanyVehicleTypeDto,
} from 'domain/dto/repositories/CompanyVehicleRepositoryDto';

export abstract class GetAllCompanyVehcicleDTO {
  limit: number;
  offset: number;
  sort?: SortByCompanyVehicleTypeDto;
  where?: WhereCompanyVehicleTypeDto;
}
