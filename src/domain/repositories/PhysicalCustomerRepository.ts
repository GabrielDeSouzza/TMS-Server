import { type GetPhysicalCustomerDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerDto';
import {
  type UpdateManyPhysicalCustomersDTO,
  type CountAllPhysicalCustomersWhereRequestDTO,
  type FindAllPhysicalCustomerWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/PhysicalCustomerRepositoryDto';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type PhysicalCustomer } from 'domain/entities/PhysicalClientEntities/physicalCustomer/PhysicalCustomer';

export abstract class PhysicalCustomerRepository {
  abstract count(
    parameters: CountAllPhysicalCustomersWhereRequestDTO,
  ): Promise<number>;
  abstract delete(id: string): Promise<PhysicalCustomer>;
  abstract updateMany(
    physicalCustomer: UpdateManyPhysicalCustomersDTO[],
  ): Promise<PhysicalCustomer[]>;
  abstract deleteMany(ids: string[]): Promise<PhysicalCustomer[]>;
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
