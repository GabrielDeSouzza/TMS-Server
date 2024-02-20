import {
  type SortByPhysicalCustomerTypeDTO,
  type WherePhysicalCustomerTypeDTO,
} from 'domain/dto/repositories/whereDtos/PhysicalCustomerRepositoryDto';

export abstract class GetAllPhysicalCustomerDTO {
  limit: number;
  offset: number;
  sort?: SortByPhysicalCustomerTypeDTO;
  where?: WherePhysicalCustomerTypeDTO;
}
