import {
  type IOutsourcedVehicle,
  type OutsourcedVehicle,
} from 'domain/entities/vehicle/outsourcedVehicle/OutsourcedVehicle';
import { type IVehicle } from 'domain/entities/vehicle/vehicle/Vehicle';

export abstract class OutsourcedVehicleRepository {
  abstract findOutsourcedVehicle(id: string): Promise<OutsourcedVehicle>;
  abstract createOutsourcedVehicle(
    outsourcedVehicle: Omit<
      IOutsourcedVehicle,
      'id' | 'created_at' | 'updated_at'
    >,
    vehicle: IVehicle,
  ): Promise<OutsourcedVehicle>;
  abstract updateOutsourcedVehicle(
    id: string,
    outsourcedVehicle: Partial<OutsourcedVehicle>,
    vehicle: Partial<IVehicle>,
  ): Promise<OutsourcedVehicle>;
  abstract findAllOutsourcedVehicle(): Promise<OutsourcedVehicle[]>;
}
