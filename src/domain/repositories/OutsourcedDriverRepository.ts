import { type GetOutsoucedDriverDTO } from 'domain/dto/repositories/getDataDtos/GetOutsourcedDriverDto';
import { type FindAllOutsourcedDriverWhereRequestDTO } from 'domain/dto/repositories/whereDtos/OutsourcedDriverRepositoryDto';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type OutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/outsourcedDriver/OutsourcedDriver';

export abstract class OutsourcedDriverRepository {
  abstract findOutsourcedDriver(
    request: GetOutsoucedDriverDTO,
  ): Promise<OutsourcedDriver>;
  abstract createOutsourcedDriver(
    outsourcedDriver: OutsourcedDriver,
    naturalPerson: NaturalPerson,
  ): Promise<OutsourcedDriver>;
  abstract updateOutsourcedDriver(
    id: string,
    outsourcedDriver: OutsourcedDriver,
    naturalPerson?: NaturalPerson,
  ): Promise<OutsourcedDriver>;
  abstract findAllOutsourcedDriver(
    parameters: FindAllOutsourcedDriverWhereRequestDTO,
  ): Promise<OutsourcedDriver[]>;
}
