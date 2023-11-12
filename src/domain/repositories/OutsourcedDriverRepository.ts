import { type ContractOutsourcedDriver } from 'domain/entities/driverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';
import { type OutsourcedDriver } from 'domain/entities/driverEntities/outsourcedDriver/OutsourcedDriver';
import { type NaturalPerson } from 'domain/entities/personEntities/naturalPerson/NaturalPerson';
import { type OutsourcedVehicle } from 'domain/entities/vehicle/outsourcedVehicle/OutsourcedVehicle';
import { type Vehicle } from 'domain/entities/vehicle/vehicle/Vehicle';

export abstract class OutsourcedDriverRepository {
  abstract findOutsourcedDriver(id: string): Promise<OutsourcedDriver>;
  abstract createOutsourcedDriver(
    outsourcedDriver: OutsourcedDriver,
    naturalPerson: NaturalPerson,
    contractOutsourced: ContractOutsourcedDriver,
    outsourcedVehicle: OutsourcedVehicle,
    vehicle?: Vehicle,
  ): Promise<OutsourcedDriver>;
  abstract updateOutsourcedDriver(
    id: string,
    outsourcedDriver: OutsourcedDriver,
    naturalPerson?: NaturalPerson,
    contractOutsourced?: ContractOutsourcedDriver,
    outsourcedVehicle?: OutsourcedVehicle,
    vehicle?: Vehicle,
  ): Promise<OutsourcedDriver>;
  abstract findAllOutsourcedDriver(): Promise<OutsourcedDriver[]>;
}
