import { Field, HideField, InputType, PartialType } from '@nestjs/graphql';

import { type IVehicleBrand } from 'domain/entities/VehicleEntities/vehicleBrand/VehicleBrand';

@InputType()
export class VehicleBrandInput
  implements Omit<IVehicleBrand, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  name: string;
  @HideField()
  updated_by: string;
  @HideField()
  created_by: string;
}

@InputType()
export class VehicleBrandUpdateInput extends PartialType(VehicleBrandInput) {}
