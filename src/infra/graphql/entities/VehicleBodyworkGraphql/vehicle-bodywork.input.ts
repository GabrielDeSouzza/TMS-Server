import {
  Field,
  Float,
  HideField,
  InputType,
  Int,
  PartialType,
} from '@nestjs/graphql';

import { Allow, IsDecimal, IsInt, IsNotEmpty, IsString } from 'class-validator';

import { type IVehicleBodywork } from 'domain/entities/VehicleEntities/vehicleBodywork/VehicleBodywork';

@InputType()
export class VehicleBodyworkInput
  implements Omit<IVehicleBodywork, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  axles: number;
  @Field(() => Float)
  @IsDecimal()
  @IsNotEmpty()
  mass: number;
  @Field(() => Float)
  @IsDecimal()
  @IsNotEmpty()
  volume: number;
  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
}
@InputType()
export class VehicleBodyworkUpdateInput extends PartialType(
  VehicleBodyworkInput,
) {}
