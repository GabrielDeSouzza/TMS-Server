import { type FindAllOutsourcedVehicleWhereRequestDTO } from 'domain/dto/repositories/whereDtos/OutsourcedVehicleRepositoryDto';
import { type OutsourcedVehicle } from 'domain/entities/OutsourcedDriverEntities/outsourcedVehicle/OutsourcedVehicle';
import { type Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';

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
  abstract findAllOutsourcedVehicle(
    parameters: FindAllOutsourcedVehicleWhereRequestDTO,
  ): Promise<OutsourcedVehicle[]>;
}
