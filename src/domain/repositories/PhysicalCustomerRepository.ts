import { type GetPhysicalCustomerDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerDto';
import { type FindAllPhysicalCustomerWhereRequestDTO } from 'domain/dto/repositories/whereDtos/PhysicalCustomerRepositoryDts';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type PhysicalCustomer } from 'domain/entities/PhysicalClientEntities/physicalCustomer/PhysicalCustomer';

export abstract class PhysicalCustomerRepository {
  abstract findPhysicalCustomer(
    request: GetPhysicalCustomerDTO,
  ): Promise<PhysicalCustomer>;
  abstract createPhysicalCustomer(
    PhysicalCustomer: PhysicalCustomer,
    naturalPerson: NaturalPerson,
  ): Promise<PhysicalCustomer>;
  abstract updatePhysicalCustomer(
    id: string,
    PhysicalCustomer: PhysicalCustomer,
    naturalPerson?: NaturalPerson,
  ): Promise<PhysicalCustomer>;
  abstract findAllPhysicalCustomer(
    parameters: FindAllPhysicalCustomerWhereRequestDTO,
  ): Promise<PhysicalCustomer[]>;
}
