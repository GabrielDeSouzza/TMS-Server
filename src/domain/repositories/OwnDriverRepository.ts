import { type GetOwnDriverDTO } from 'domain/dto/repositories/getDataDtos/GetOwnDriverDto';
import {
  type CountAllOwnDriversWhereRequestDTO,
  type UpdateManyOwnDriversDTO,
  type FindAllOwnDriverWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/OwnDriverRepositoryDto';
import { type OwnDriver } from 'domain/entities/CompanyEntities/ownDriver/OwnDriver';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';

export abstract class OwnDriverRepository {
  abstract count(
    parameters: CountAllOwnDriversWhereRequestDTO,
  ): Promise<number>;
  abstract delete(id: string): Promise<OwnDriver>;
  abstract updateMany(
    ownDriver: UpdateManyOwnDriversDTO[],
  ): Promise<OwnDriver[]>;
  abstract deleteMany(ids: string[]): Promise<OwnDriver[]>;
  abstract findOwnDriver(request: GetOwnDriverDTO): Promise<OwnDriver>;
  abstract createOwnDriver(
    OwnDriver: OwnDriver,
    naturalPerson?: NaturalPerson,
    naturalPersonId?: string,
  ): Promise<OwnDriver>;
  abstract updateOwnDriver(
    id: string,
    OwnDriver: OwnDriver,
    naturalPerson: NaturalPerson,
  ): Promise<OwnDriver>;
  abstract findAllOwnDrivers(
    parameters: FindAllOwnDriverWhereRequestDTO,
  ): Promise<OwnDriver[]>;
}
