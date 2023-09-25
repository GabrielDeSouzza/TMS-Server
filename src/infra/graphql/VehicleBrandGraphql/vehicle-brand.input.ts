import { Field, InputType, PartialType } from '@nestjs/graphql';

import { type IVehicleBrand } from 'domain/entities/vehicle/vehicleBrand/VehicleBrand';
import { type VehicleModel } from 'domain/entities/vehicle/vehicleModel/VehicleModel';

@InputType()
export class VehicleBrandInput
  implements Omit<IVehicleBrand, 'id' | 'created_at' | 'updated_at'>
{
  VehicleModels?: VehicleModel[];
  @Field()
  name: string;
  @Field()
  updated_by: string;
  @Field()
  created_by: string;
}

@InputType()
export class VehicleBrandUpdateInput extends PartialType(VehicleBrandInput) {}