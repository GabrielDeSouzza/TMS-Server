import { type OwnDriver } from 'domain/entities/CompanyEntities/ownDriver/OwnDriver';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';

export abstract class OwnDriverRepository {
  abstract findOwnDriverById(id: string): Promise<OwnDriver>;
  abstract createOwnDriver(
    OwnDriver: OwnDriver,
    naturalPerson: NaturalPerson,
  ): Promise<OwnDriver>;
  abstract updateOwnDriver(
    id: string,
    OwnDriver: OwnDriver,
    naturalPerson: NaturalPerson,
  ): Promise<OwnDriver>;
  abstract findAllOwnDrivers(): Promise<OwnDriver[]>;
}
