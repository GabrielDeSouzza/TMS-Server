import { type OutsourcedTransportVehicle } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportVehicle/OutsourcedTransportVehicle';
import { type Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';

export abstract class OutsourcedTransportVehicleRepository {
  abstract findOutsourcedTransportVehicleById(
    id: string,
  ): Promise<OutsourcedTransportVehicle>;
  abstract createOutsourcedTransportVehicle(
    outsourcedTransportVehicle: OutsourcedTransportVehicle,
    vehicle: Vehicle,
  ): Promise<OutsourcedTransportVehicle>;
  abstract updateOutsourcedTransportVehicle(
    id: string,
    outsourcedTransportVehicle: OutsourcedTransportVehicle,
    vehicle: Vehicle,
  ): Promise<OutsourcedTransportVehicle>;
  abstract getAllOutsourcedTransportVehicle(): Promise<
    OutsourcedTransportVehicle[]
  >;
}