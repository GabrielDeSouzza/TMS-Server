import { type FindAllOutsourcedTransportCompanyDriverWhereRequestDTO } from 'domain/dto/repositories/OutsourcedTransportCompanyDriverRepositoryDto';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type OutsourcedTransportCompanyDriver } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyDriver/OutsourcedTransportCompany';

export abstract class OutsourcedTransportCompanyDriverRepository {
  abstract findOutsourcedTransportCompanyDriverById(
    id: string,
  ): Promise<OutsourcedTransportCompanyDriver>;
  abstract createOutsourcedTransportCompanyDriver(
    outsourcedTransportCompanyDriver: OutsourcedTransportCompanyDriver,
    naturalPerson: NaturalPerson,
  ): Promise<OutsourcedTransportCompanyDriver>;
  abstract updateOutsourcedTransportCompanyDriver(
    id: string,
    outsourcedTransportCompanyDriver: OutsourcedTransportCompanyDriver,
    naturalPerson: NaturalPerson,
  ): Promise<OutsourcedTransportCompanyDriver>;
  abstract getAllOutsourcedTransportCompanyDriver(
    parameters: FindAllOutsourcedTransportCompanyDriverWhereRequestDTO,
  ): Promise<OutsourcedTransportCompanyDriver[]>;
}
