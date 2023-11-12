import { type NaturalPerson } from 'domain/entities/personEntities/naturalPerson/NaturalPerson';
import { type PhysicalContract } from 'domain/entities/physicalClientEntities/physicalContract/PhysicalContract';
import { type PhysicalCustomer } from 'domain/entities/physicalClientEntities/physicalCustomer/PhysicalCustomer';

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
  abstract findAllPhysicalCustomer(): Promise<PhysicalCustomer[]>;
}
