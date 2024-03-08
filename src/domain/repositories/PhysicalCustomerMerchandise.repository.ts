import { type GetPhysicalCustomerMerchandiseDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerMerchandiseDto';
import { type FindAllPhysicalCustomerMerchandiseWhereRequestDTO } from 'domain/dto/repositories/whereDtos/PhysicalCustomerMerchandiseRepositoryDto';
import { type PhysicalCustomerMerchandise } from 'domain/entities/PhysicalClientEntities/physicalCustomerMerchandise/physical-merchandise';

export abstract class PhysicalCustomerMerchandiseRepository {
  abstract findPhysicalCustomerMerchandise(
    request: GetPhysicalCustomerMerchandiseDTO,
  ): Promise<PhysicalCustomerMerchandise>;
  abstract createPhysicalCustomerMerchandise(
    physicalCustomerMerchandise: PhysicalCustomerMerchandise,
  ): Promise<PhysicalCustomerMerchandise>;
  abstract updatePhysicalCustomerMerchandise(
    id: string,
    physicalCustomerMerchandise: PhysicalCustomerMerchandise,
  ): Promise<PhysicalCustomerMerchandise>;
  abstract getAllLegalClientMerchandise(
    parameters: FindAllPhysicalCustomerMerchandiseWhereRequestDTO,
  ): Promise<PhysicalCustomerMerchandise[]>;
  abstract findLegalClientMerchandisesByOrder(
    physicalCustomerOrderId: string,
  ): Promise<PhysicalCustomerMerchandise[]>;
}
