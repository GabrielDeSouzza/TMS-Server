import {
  type IOwnDriver,
  type OwnDriver,
} from 'domain/entities/driverEntities/ownDriver/OwnDriver';
import { type INaturalPerson } from 'domain/entities/personEntities/naturalPerson/NaturalPerson';

export abstract class OwnDriverRepository {
  abstract findOwnDriverById(id: string): Promise<OwnDriver>;
  abstract createOwnDriver(
    OwnDriver: Omit<
      IOwnDriver,
      | 'id'
      | 'created_at'
      | 'updated_at'
      | 'created_by'
      | 'updated_by'
      | 'natural_person_id'
    >,
    naturalPerson: INaturalPerson,
  ): Promise<OwnDriver>;
  abstract updateOwnDriver(
    id: string,
    OwnDriver: Partial<IOwnDriver>,
    naturalPerson: Partial<INaturalPerson>,
  ): Promise<OwnDriver>;
  abstract findAllOwnDrivers(): Promise<OwnDriver[]>;
}
