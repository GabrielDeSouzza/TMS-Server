import { type INaturalPerson } from 'domain/entities/personEntities/naturalPerson/NaturalPerson';
import { type IPhysicalContract } from 'domain/entities/physicalClientEntities/physicalContract/PhysicalContract';
import {
  type IPhysicalCustomer,
  type PhysicalCustomer,
} from 'domain/entities/physicalClientEntities/physicalCustomer/PhysicalCustomer';

export abstract class PhysicalCustomerRepository {
  abstract findPhysicalCustomer(id: string): Promise<PhysicalCustomer>;
  abstract createPhysicalCustomer(
    PhysicalCustomer: Omit<
      IPhysicalCustomer,
      'id' | 'created_at' | 'updated_at'
    >,
    naturalPerson: INaturalPerson,
    physicalContractor: Omit<
      IPhysicalContract,
      'id' | 'created_at' | 'updated_at' | 'physical_customer_id'
    >,
  ): Promise<PhysicalCustomer>;
  abstract updatePhysicalCustomer(
    id: string,
    PhysicalCustomer: Partial<IPhysicalCustomer>,
    naturalPerson?: Partial<INaturalPerson>,
    physicalContractor?: Partial<IPhysicalContract>,
  ): Promise<PhysicalCustomer>;
  abstract findAllPhysicalCustomer(): Promise<PhysicalCustomer[]>;
}
