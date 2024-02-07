import { type GetOutsourcedTransportVehicleDTO } from 'domain/dto/repositories/getDataDtos/GetOutsourcedTransportVehicleDto';
import { type FindAllOutsourcedTransportVehicleWhereRequestDTO } from 'domain/dto/repositories/whereDtos/OutsourcedTransportVehicleRepositoryDto';
import { type OutsourcedTransportVehicle } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportVehicle/OutsourcedTransportVehicle';
import { type Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';

export abstract class OutsourcedTransportVehicleRepository {
  abstract findOutsourcedTransportVehicle(
    request: GetOutsourcedTransportVehicleDTO,
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
  abstract getAllOutsourcedTransportVehicle(
    parameters: FindAllOutsourcedTransportVehicleWhereRequestDTO,
  ): Promise<OutsourcedTransportVehicle[]>;
}
