import {
  Field,
  Float,
  HideField,
  InputType,
  Int,
  PartialType,
} from '@nestjs/graphql';

import {
  Allow,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { type IVehicleModel } from 'domain/entities/VehicleEntities/vehicleModel/VehicleModel';

@InputType()
export class VehicleModelInput
  implements Omit<IVehicleModel, 'id' | 'created_at' | 'updated_at'>
{
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  weight: number;
  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  capacity_max: number;
  @Field()
  @IsInt()
  @IsNotEmpty()
  axles: number;
  @Field(() => Int)
  @IsInt()
  @IsOptional()
  capacity_per_axle?: number;
  @Field()
  @IsString()
  @IsNotEmpty()
  brand_id: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  type_id: string;
  @HideField()
  @Allow()
  created_by: string;
  @HideField()
  @Allow()
  updated_by: string;
}

@InputType()
export class VehicleModelUpdateInput extends PartialType(VehicleModelInput) {
  updated_by: string;
}

@InputType()
export class VehicleModelUpdateManyInput extends PartialType(
  VehicleModelInput,
) {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
