import { type VehicleType } from 'domain/entities/vehicle/vehicleTypes/VehicleTypes';

export abstract class VehicleTypeRepository {
  abstract findVehicleTypeById(id: string): Promise<VehicleType>;
  abstract createVehicleType(vehicleBrand: VehicleType): Promise<VehicleType>;
  abstract updateVehicleType(
    id: string,
    vehicleBrand: VehicleType,
  ): Promise<VehicleType>;
  abstract getAllVehicleType(): Promise<VehicleType[]>;
}
