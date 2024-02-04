import { type FindAllPhysicalCustomerWhereRequestDTO } from 'domain/dto/repositories/whereDtos/PhysicalCustomerRepositoryDts';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type PhysicalContract } from 'domain/entities/PhysicalClientEntities/physicalContract/PhysicalContract';
import { type PhysicalCustomer } from 'domain/entities/PhysicalClientEntities/physicalCustomer/PhysicalCustomer';

export abstract class PhysicalCustomerRepository {
  abstract findPhysicalCustomer(id: string): Promise<PhysicalCustomer>;
  abstract createPhysicalCustomer(
    PhysicalCustomer: PhysicalCustomer,
    naturalPerson: NaturalPerson,
    physicalContractor: PhysicalContract,
  ): Promise<PhysicalCustomer>;
  abstract updatePhysicalCustomer(
    id: string,
    PhysicalCustomer: PhysicalCustomer,
    naturalPerson?: NaturalPerson,
    physicalContractor?: PhysicalContract,
  ): Promise<PhysicalCustomer>;
  abstract findAllPhysicalCustomer(
    parameters: FindAllPhysicalCustomerWhereRequestDTO,
  ): Promise<PhysicalCustomer[]>;
}
