import { type OutsourcedVehicle } from 'domain/entities/vehicle/outsourcedVehicle/OutsourcedVehicle';
import { type Vehicle } from 'domain/entities/vehicle/vehicle/Vehicle';

export abstract class OutsourcedVehicleRepository {
  abstract findOutsourcedVehicle(id: string): Promise<OutsourcedVehicle>;
  abstract createOutsourcedVehicle(
    outsourcedVehicle: OutsourcedVehicle,
    vehicle: Vehicle,
  ): Promise<OutsourcedVehicle>;
  abstract updateOutsourcedVehicle(
    id: string,
    outsourcedVehicle: OutsourcedVehicle,
    vehicle: Vehicle,
  ): Promise<OutsourcedVehicle>;
  abstract findAllOutsourcedVehicle(): Promise<OutsourcedVehicle[]>;
}
