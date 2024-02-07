import { type GetOutsourcedTransportCompanyDriverDTO } from 'domain/dto/repositories/getDataDtos/GetOutsourcedTransportCompanyDriverDto';
import { type FindAllOutsourcedTransportCompanyDriverWhereRequestDTO } from 'domain/dto/repositories/whereDtos/OutsourcedTransportCompanyDriverRepositoryDto';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type OutsourcedTransportCompanyDriver } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyDriver/OutsourcedTransportCompany';

export abstract class OutsourcedTransportCompanyDriverRepository {
  abstract findOutsourcedTransportCompanyDriver(
    request: GetOutsourcedTransportCompanyDriverDTO,
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
