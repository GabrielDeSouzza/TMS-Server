import { type IContractOutsourcedDriver } from 'domain/entities/personEntities/contractOutsourcedDriver/ContractOutsourcedDriver';
import { type INaturalPerson } from 'domain/entities/personEntities/naturalPerson/NaturalPerson';
import {
  type IOutsourcedDriver,
  type OutsourcedDriver,
} from 'domain/entities/personEntities/outsourcedDriver/OutsourcedDriver';
import { type IOutsourcedVehicle } from 'domain/entities/vehicle/outsourcedVehicle/OutsourcedVehicle';
import { type IVehicle } from 'domain/entities/vehicle/vehicle/Vehicle';

export abstract class OutsourcedDriverRepository {
  abstract findOutsourcedDriver(id: string): Promise<OutsourcedDriver>;
  abstract createOutsourcedDriver(
    outsourcedDriver: Omit<
      IOutsourcedDriver,
      'id' | 'created_at' | 'updated_at'
    >,
    naturalPerson: INaturalPerson,
    contractOutsourced: Omit<
      IContractOutsourcedDriver,
      'id' | 'created_at' | 'updated_at' | 'outsourced_driver_id'
    >,
    outsourcedVehicle: Omit<
      IOutsourcedVehicle,
      'id' | 'created_at' | 'updated_at'
    >,
    vehicle?: IVehicle,
  ): Promise<OutsourcedDriver>;
  abstract updateOutsourcedDriver(
    id: string,
    outsourcedDriver: Partial<IOutsourcedDriver>,
    naturalPerson?: Partial<INaturalPerson>,
    contractOutsourced?: Partial<IContractOutsourcedDriver>,
    outsourcedVehicle?: Partial<IOutsourcedVehicle>,
    vehicle?: Partial<IVehicle>,
  ): Promise<OutsourcedDriver>;
  abstract findAllOutsourcedDriver(): Promise<OutsourcedDriver[]>;
}
