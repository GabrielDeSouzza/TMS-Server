import {
  type SortByVehicleBodyworkTypeDTO,
  type WhereVehicleBodyworkTypeDTO,
} from 'domain/dto/repositories/VehicleBodyworkRepositoryDto';

export abstract class getAllVehicleBodyworkDTO {
  limit: number;
  offset: number;
  sort?: SortByVehicleBodyworkTypeDTO;
  where?: WhereVehicleBodyworkTypeDTO;
}
