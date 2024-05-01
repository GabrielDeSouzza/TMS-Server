import { type GetOutsoucedDriverDTO } from 'domain/dto/repositories/getDataDtos/GetOutsourcedDriverDto';
import {
  type CountOutsourcedDriverRequestDTO,
  type FindAllOutsourcedDriverWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/OutsourcedDriverRepositoryDto';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type OutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/outsourcedDriver/OutsourcedDriver';

export abstract class OutsourcedDriverRepository {
  abstract countOutsourcedDriver(
    request: CountOutsourcedDriverRequestDTO,
  ): Promise<number>;
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
  abstract updateManyOutsourcedDriver(
    data: OutsourcedDriverCompanyUpdateDTO[],
  ): Promise<OutsourcedDriver[]>;
  abstract deleteOutsourcedDriver(id: string): Promise<OutsourcedDriver>;
  abstract deleteManyOutsourcedDriver(
    ids: string[],
  ): Promise<OutsourcedDriver[]>;
}
export abstract class OutsourcedDriverCompanyUpdateDTO {
  outsourcedDriver: OutsourcedDriver;
  naturalPerson: NaturalPerson;
}
