import {
  type IVehicleType,
  type VehicleType,
} from 'domain/entities/vehicle/vehicleTypes/VehicleTypes';

export abstract class VehicleTypeRepository {
  abstract findVehicleTypeById(id: string): Promise<VehicleType>;
  abstract createVehicleType(vehicleBrand: IVehicleType): Promise<VehicleType>;
  abstract updateVehicleType(vehicleBrand: IVehicleType): Promise<VehicleType>;
  abstract getAllVehicleType(): Promise<VehicleType[]>;
}
