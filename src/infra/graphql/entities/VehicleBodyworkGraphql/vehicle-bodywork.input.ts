import {
  Field,
  Float,
  HideField,
  InputType,
  Int,
  PartialType,
} from '@nestjs/graphql';

import { Allow, IsInt, IsNotEmpty, IsString, IsNumber } from 'class-validator';

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
  @IsNumber()
  @IsNotEmpty()
  mass: number;
  @Field(() => Float)
  @IsNumber()
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
