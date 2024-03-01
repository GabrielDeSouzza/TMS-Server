import { Field, HideField, InputType, PartialType } from '@nestjs/graphql';

import { Allow, IsNotEmpty, IsString } from 'class-validator';

import { type IVehicleBrand } from 'domain/entities/VehicleEntities/vehicleBrand/VehicleBrand';

@InputType()
export class VehicleBrandInput
  implements Omit<IVehicleBrand, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
  @HideField()
  @Allow()
  updated_by: string;
  @HideField()
  @Allow()
  created_by: string;
}

@InputType()
export class VehicleBrandUpdateInput extends PartialType(VehicleBrandInput) {
  updated_by: string;
}
