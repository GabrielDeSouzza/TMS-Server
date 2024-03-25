import { type GetPhysicalCustomerCteDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerCteDto';
import { type FindAllPhysicalCustomerCteWhereRequestDTO } from 'domain/dto/repositories/whereDtos/PhysicalCustomerCteRepository';
import { type PhysicalCustomerCte } from 'domain/entities/Cte Entities/PhysicalCustomerCte';

export abstract class PhysicalCustomerCteRepository {
  abstract findPhysicalCustomerCte(
    request: GetPhysicalCustomerCteDTO,
  ): Promise<PhysicalCustomerCte>;
  abstract createPhysicalCustomerCte(
    physicalCustomerCte: PhysicalCustomerCte,
  ): Promise<PhysicalCustomerCte>;
  abstract updatePhysicalCustomerCte(
    id: string,
    physicalCustomerCte: PhysicalCustomerCte,
  ): Promise<PhysicalCustomerCte>;
  abstract findAllPhysicalCustomerCtes(
    parameters: FindAllPhysicalCustomerCteWhereRequestDTO,
  ): Promise<PhysicalCustomerCte[]>;
}
